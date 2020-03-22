---
title: My Preferred React Development Setup
author: Anthony Oyathelemhi
date: '2020-03-21'
publishDate: '2020-03-21'
tags: ['tools', 'opinion']
summary: Over the years, I have used a lot of tools, many of which I've abandoned. In this post, I list the tools that I currently use in all of my projects and why I settled for each of them
---

Over the years, I have used a lot of tools, many of which I've abandoned.
In this post, I list the tools that I currently use in all of my projects and why I settled for each of them

## TL;DR

- [Nextjs](https://nextjs.org) - Easily the best way to write React
- [TypeScript](https://www.typescriptlang.org/) - For static typing
- [Styled Components](https://styled-components.com) - My preferred CSS-in-JS solution
- [TailwindCSS](https://tailwindcss.com) - Robust CSS utility classes for rapid development
- [Now](https://now.sh) - Deployment infrastructure
- [Visual Studio Code](https://code.visualstudio.com) - Code editor
- [Prettier](https://prettier.io) - Automatic code formatting
  ***

## Technologies

### Nextjs

https://nextjs.org

Nextjs is a lightweight framework built on top of React. It provides some amazing functionalities
out of the box, like automatic code-splitting, automatic static optimization, server-side rendering,
dynamic routes, dynamic imports, etc., all with zero configuration and a very low learning curve

Some other things I love about nextjs:

- Everything just works. No need to worry about configuring Babel and Webpack.
  Adding custom configurations is also quite straightforward
- Frequent updates. The library is very well maintained, always updated to work with
  the latest versions of React and EcmaScript syntax
- Hybrid Apps. You can decide to use either Static Site Generation (SSG) or
  Server-side Rendering (SSR) on a page-by-page basis

### TypeScript

https://www.typescriptlang.org

JavaScript is a dynamically-typed language, which means that the interpreter assigns types to variables at runtime.
While you can get by with this default behavior, it is sometimes the source of bugs that would have been caught
during development. Instead, you only discover these bug when the app is deployed and something goes wrong

```js
var person = { name: 'Tony' };
person = 'Tony';
```

Notice how you can assign `person` to a String even though it was initially defined as an Object.
Now every reference to `person.name` will result in an error

TypeScript was developed to solve this problem. Now when you declare a variable, you immediately assign a type and
every reference to that variable MUST conform to its assigned type

```ts
var person: { name: String } = { name: 'Tony' };
person = 'Tony'; // This will be flagged as an error during development and the code will not compile
```

The only downside to TypeScript that I can tell is that it's yet another language you have to learn.
This ultimately pays off because you save development time by catching bugs early.

### Styled Components

https://styled-components.com

A lot of people argue against writing CSS within JavaScript files, but I find it frustrating having
to create CSS files for every component, or even worse, maintain a huge CSS file while trying to avoid className conflicts

I like having everything a component needs to work in a single file, and that includes styles. Using SC helps me do
this in a very clean and performant way. You avoid class conflicts, write SCSS-like nested CSS, conditionally set styles
based on props/state. You can even set a theme that is accessible from everywhere in your application.

### Tailwind CSS

https://tailwindcss.com

TailwindCSS is a utility-first CSS library that is an absolute joy to work with. One of the downsides of using CSS-in-JS
libraries like Styled Components, is repeating the same styles across different components. One way to solve this is to
maintain a global stylesheet with common utility classes you can use in different components' className prop. This is where
TailwindCSS comes in

```html
<div class="text-center p-4 bg-teal-500 text-white">
  <p class="font-bold text-lg">Tailwind is awesome</p>
  <p class="text-sm opacity-75 hover:opacity-100">I mean, REALLY awesome</p>
</div>
```

TailwindCSS provides lots of utility classes that are configurable and extensible. They even include breakpoints and
pseudo selectors like `:hover` and `:focus`. I can't recommend TailwindCSS enough, just look how readable the above snippet is.
Visit their docs to learn more

## Deployment

### Now

https://now.sh

I recently switched from Netlify to Now for mostly two reasons. Netlify is such an amazing service, I remember the feeling of
being able to get my website online in literally less than 10 seconds. However, as far as I know, they don't support SSR. Meaning I
cannot take advantage of Nextjs's superpowers like hybrid pages and dynamic routes. Now and Nextjs go so well together, mainly because
they are built by the same company, [Zeit](https://zeit.co).

Deploying apps to now is also very seamless. You can setup CD with your remote repository or use their cli tool for manual deployments

## Apps

### Visual Studio Code

https://code.visualstudio.com

There's not much to say here. VSCode has become the standard editor for Web Development globally. The sheer amount of extensions and
themes adds to its already great feature-set. I'm writing this blog post in Markdown right in VSCode.

One of the most used extensions in VSCode is Prettier, with over 5.6 million downloads at the time I'm writing this. Just focus on
writing highly performant code and leave the formatting up to Prettier

---

I'm happy to answer any questions you might have about this blog post, or anything else. Shoot me a DM on [Twitter](https://twitter.com/frontendtony).
