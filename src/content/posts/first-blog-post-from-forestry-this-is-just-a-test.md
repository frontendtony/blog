---

tags: []
date: 2020-02-22T16:47:27Z
publishDate: 2020-02-22T16:47:27Z
title: First blog post from forestry. This is just a test
---Creating a new blog post on forestry is just as easy as setting up a Github account

```go
const fg = require('fast-glob');
const files = await fg(`./content/blog/**/*.md`);
const posts = await Promise.all(
  files.map(async file => {
    const rawData = await readFile(file);

    // create slug from filename
    const slug = file
      .replace(/^.*[\\\/]/, '')
      .split('.')
      .slice(0, -1)
      .join('.');

    // parse yaml & markdown body
    const post = matter(rawData);

    const excerpt = formatExcerpt(post.content);

    return {
      data: { ...post.data, slug },
      content: excerpt
    };
  })
);
```
