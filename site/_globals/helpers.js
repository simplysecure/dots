const fs = require("fs");

/**
 * Assemble related patterns by loading the page source from disk
 * and scanning for [[wikilinks]].
 */
const getRelatedPatterns = (data) => {
  // this is the same regex pattern as used by the wikilinks markdownit
  // extension (taken from documentation on npm)
  const regex = /\[\[([\w\s/]+)(\|([\w\s/]+))?\]\]/g;
  const content = fs.readFileSync(data.page.inputPath, {
    encoding: "utf8",
    flag: "r",
  });
  try {
    return [...content.matchAll(regex)].map((m) => m[1]);
  } catch (err) {
    console.error(
      `Error extracting related patterns: malformed wikilink (${err})`
    );
    return [];
  }
};

const categoryName = (data) => {
  const category = data.collections.topic.find(
    (t) => t.data.slug === data.topic
  );
  if (category == null) {
    // console.error(
    //   `Category ${data.topic} for pattern ${data.title} not found.`
    // );
    return `Category ${data.topic} not found`;
  }
  return category.data.title;
};

module.exports = {
  // environment helper
  environment: process.env.ELEVENTY_ENV,

  // Netlify sets this in their build environment
  is_netlify_production: process.env.CONTEXT === "production",

  relatedPatterns: getRelatedPatterns,

  categoryName,
};
