const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownImplicitFigures = require("markdown-it-implicit-figures");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // configure markdown library to use custom plugins
  const markdownLib = markdownIt({
    html: true,
    linkify: true,
  })
    .use(markdownItFootnote) // add footnote plugin
    .use(markdownImplicitFigures, { figcaption: true }); // add implicit figures
  eleventyConfig.setLibrary("md", markdownLib);

  // copy assets from public/ directory to root of site build
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // add base plugin to allow deployment to GitHub Pages subfolder
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // add filter to normalize links to array of objects with url and text properties
  eleventyConfig.addFilter("normalizeLinks", function (links) {
    if (typeof links === "undefined") return;
    if (!Array.isArray(links)) {
      throw new Error(
        "links must be an array of urls or objects with url and text properties"
      );
    }
    return links.map((link) => {
      if (typeof link === "string") {
        return { url: link, text: link };
      }
      if (typeof link === "object") {
        if (typeof link.url === "undefined") {
          throw new Error("link object must have url property");
        }
        if (typeof link.text === "undefined") {
          throw new Error("link object must have text property");
        }
        return link;
      }
      throw new Error("link must be a string or object");
    });
  });

  // Copy media from their source folders to their respective published folders.
  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.gif");
  
  eleventyConfig.addPassthroughCopy("**/*.mov");
  eleventyConfig.addPassthroughCopy("**/*.mp3");
  eleventyConfig.addPassthroughCopy("**/*.mp4");

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      includes: "_includes",
      layouts: "_layouts"
    }
  }
};