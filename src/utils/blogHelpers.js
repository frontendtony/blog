import removeMarkdown from 'remove-markdown';

export function orderPosts(posts) {
  function sortByDate(a, b) {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  }
  return posts.slice().sort(sortByDate);
}

export function formatExcerpt(content, limit = 200) {
  const plainTextExcerpt = removeMarkdown(content, {
    stripListLeaders: true,
    listUnicodeChar: '',
    gfm: true,
    useImgAltText: false
  })
    .replace(/(\r\n|\n|\r)/gm, '')
    .substring(0, limit)
    .trimEnd();

  return `${plainTextExcerpt}...`;
}

export function formatDate(fullDate) {
  const date = new Date(fullDate);
  const dateOptions = {
    formatMatcher: 'best fit',
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', dateOptions);
}
