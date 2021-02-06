const axios = require('axios');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '„“‚‘',
});

const http = axios.create({
  baseURL: 'https://cms.deinespur.at',
});

function renderMarkdown(markdown) {
  return md.render(markdown)
    .replace(/\/uploads\//g, 'https://cms.deinespur.at/uploads/');
}
module.exports = async function() {
  const response = await http.get('/posts?_publicationState=preview');

  const posts = response.data.filter((post) => post.slug?.length)
  posts.forEach((post) => { post.text = renderMarkdown(post.text) });

  return posts;
};
