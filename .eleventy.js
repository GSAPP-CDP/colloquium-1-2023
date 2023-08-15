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
  
  // Copy all HTML files that aren't index.html.
  // index.html files needing to be rendered should all have frontmatter so they 
  // are indeed rendered, but they're excluded here so the rendered file isn't
  // overwritten by the passthrough copy operation.
  eleventyConfig.addPassthroughCopy("**/!(index).html");

  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.jpeg");
  eleventyConfig.addPassthroughCopy("**/*.gif");
  eleventyConfig.addPassthroughCopy("**/*.cur");
  
  eleventyConfig.addPassthroughCopy("**/*.mov");
  eleventyConfig.addPassthroughCopy("**/*.mp3");
  eleventyConfig.addPassthroughCopy("**/*.mp4");

  eleventyConfig.addPassthroughCopy("**/*.js");
  eleventyConfig.addPassthroughCopy("**/*.css");

  eleventyConfig.addPassthroughCopy("**/*.obj");
  eleventyConfig.addPassthroughCopy("**/*.csv");
  eleventyConfig.addPassthroughCopy("**/*.geojson");

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      includes: "_includes",
      layouts: "_layouts"
    }
  }
};
