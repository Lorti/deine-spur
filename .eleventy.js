const path = require('path');
const postcss = require('postcss');
const fs = require('fs');

async function generateStyles() {
  const filePath = path.join(__dirname, 'src/styles.css');
  const file = fs.readFileSync(filePath, 'utf-8');

  let result = await postcss([
    require('tailwindcss'),
    require('autoprefixer'),
  ]).process(file, { from: filePath });

  return result.css;
}

const styles = generateStyles();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: '.' });
  eleventyConfig.addWatchTarget('./src/styles.css');

  eleventyConfig.addNunjucksAsyncShortcode('styles', () => styles);

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
