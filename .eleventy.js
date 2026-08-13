module.exports = function (eleventyConfig) {
  // Static assets pass straight through to the built site.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");

  // All tour stops, always in numeric order.
  eleventyConfig.addCollection("stops", (collection) =>
    collection
      .getFilteredByGlob("src/stops/*.md")
      .sort((a, b) => a.data.number - b.data.number)
  );

  // "3" -> "03", for the oversized display numerals.
  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));

  // Look up a stop by its number so "next stop" links maintain themselves.
  eleventyConfig.addFilter("stopByNumber", (stops, n) =>
    stops.find((s) => s.data.number === n)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
