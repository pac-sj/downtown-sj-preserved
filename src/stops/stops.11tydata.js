// ============================================================
// Settings shared by every tour stop page.
//
// This is not content -- nothing here needs to change when photos or
// captions are edited. It only tells the site how stop pages are built.
// ============================================================

module.exports = {
  layout: "stop.njk",

  // The web address of each stop, built from its number: /stop-1/, /stop-2/...
  permalink: "/stop-{{ number }}/index.html",

  eleventyComputed: {
    // The browser tab title and the headline search engines show.
    //
    // This has to be computed here rather than written as a plain line of
    // text with {{ number }} in it: Eleventy only fills in placeholders for a
    // few special settings such as permalink above, so a plain line would be
    // published with the braces still showing.
    pageTitle: (data) =>
      `Stop ${data.number}: ${data.title} — Downtown San Jose: Preserved`,
  },
};
