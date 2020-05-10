---
title: Writing reusable custom hooks for data fetching in React applications
author: Anthony Oyathelemhi
date: '2020-05-11'
publishDate: '2020-05-11'
tags: ['react', 'hooks', 'javascript']
summary: Write performant and highly maintainable React applications by leveraging the power and extensibility of Hooks
---

Introduced in late 2018 (React 16.8), Hooks are a way to "reuse stateful logic between components".
In summary, Hooks provide a way to take advantage of all the benefits of React without having to
write classes.

Generally, they solve 3 common problems when writing class-based React components:

- Reusing stateful logic between components
- Separating unrelated logic in lifecycle methods
- The overhead of learning how classes work in JavaScript

## Data fetching in React

In a typical data-driven client-based React application, all external data is fetched after the
component mounts. The way to do this with the hooks-based API is to use the built-in `useEffect` hook.
We then update state with the response from the network request

```jsx
import { useEffect, useState } from 'react';

function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      const response = await fetch('/path/to/remote/data/source');
      setBlogPosts(response.json());
    }

    fetchBlogPosts();
  }, []);

  return (
    <ul>
      {blogPosts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

And just like that, we have created a component that renders a list of blog posts. But what if we
needed the same list of blog posts in another component? We are going to look at several ways to do this

### Replicate the same logic in the other component

This is the obvious solution. Just do the same thing wherever that data is needed and call it a day.
Clearly this is not an ideal solution because you generally want to avoid repeating yourself when
writing code, especially when it comes to data fetching. We want to avoid doing this because:

- Making 2 network requests for the same data is inefficient and expensive
- The data may change between the 2 network requests and potentially be out of sync
- It reduces maintainability and can easily introduce subtle hard-to-find bugs

There needs to be a better way to do this

### Move data fetching up the tree

The goal here is to have a single source of truth for the resource, so that all subscribers will
always be in sync and we only have to make one network request. So we move the data fetching logic
to a component that is a parent to all components that need the blog list data

```jsx
function ParentComponent() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      const response = await fetch('/path/to/remote/data/source');
      setBlogPosts(response.json());
    }

    fetchBlogPosts();
  }, []);

  return (
    <div>
      <BlogPosts blogPosts={blogPosts} />
      <Tags blogPosts={blogPosts} />
    </div>
  );
}

function BlogPosts({ blogPosts }) {
  return (
    <ul>
      {blogPosts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

function Tags({ blogPosts }) {
  const tags = new Set(blogPosts.map(post => post.tag));

  return (
    <ul>
      {tags.map(tag => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
```

We have solved a number of issues with this simple refactor. The network request is made once, data
is guaranteed to be consistent and it is much easier to maintain. This is fine for many use cases
as long as the subscribers to blogPosts are direct descendants (or close) of `ParentComponent`,
otherwise we find ourselves with a new problems, [prop drilling](https://kentcdodds.com/blog/prop-drilling)
and having to always refactor our code to move blogPosts up the tree where it is available to all
subscribers.

What if we could extract the data fetching to a helper function that we can call from anywhere in
our application and not worry about refactoring, prop drilling and out-of-sync data?

## Custom Hooks

With the introduction of Hooks, the React team also added the ability to
[build your own hooks](https://reactjs.org/docs/hooks-custom.html) by wrapping any of the built-in
hooks in a function that starts with "use", e.g. useSomething. See [rules of hooks](https://reactjs.org/docs/hooks-rules.html)

Let's create our useBlogPosts custom hook

```js
function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  async function fetchBlogPosts() {
    const response = await fetch('/path/to/remote/data/source');
    setBlogPosts(response.json());
    setLoading(false);
  }

  return { blogPosts, loading };
}
```

Now we can use this hook anywhere we need the list of blogs

```jsx
function BlogPosts() {
  const { blogPosts, loading } = useBlogPosts();

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {blogPosts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

<p class="italic">
  It is important to note that components using this hook DO NOT share the same state. The network
  request will be made everytime a component that uses it mounts.
</p>

But we want ALL components to have a synchronized state. We need to somehow make all of them
reference the same blogPosts array.

### [uswSWR](https://github.com/zeit/swr)

useSWR is a custom remote data fetching hook by [Vercel](https://vercel.com/).
This library solves the "out-of-sync" problem we would face if we used our previous custom hook. It
caches the data returned from the network requests, which will instantly be available when another
component requests for the same data

Let's add this to our custom hook

```js
function useBlogPosts() {
  /**
   * You can pass a second argument to uswSWR, which it will use a the fetcher
   * In this case, it uses the default browser fetch api
   */
  const { blogPosts, error } = uswSWR('/path/to/remote/data/source');

  return {
    blogPosts,
    error,
    loading: !blogPosts && !error,
  };
}
```

Now all subscribers to this hook will always have an up-to-date version of the blog posts list

Here is a codesandbox example to demonstrate how this works

<iframe
  src="https://codesandbox.io/embed/custom-data-fetching-hook-example-nmxg7?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="custom-data-fetching-hook-example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

I'm happy to answer any questions you might have about this blog post, or anything else.
Shoot me a DM on [Twitter](https://twitter.com/frontendtony).
