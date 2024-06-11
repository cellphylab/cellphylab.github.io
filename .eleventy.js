const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");
const fs = require("fs");
const metagen = require("eleventy-plugin-metagen");

/**
 * This is the JavaScript code that determines the config for your Eleventy site
 *
 * You can add lost of customization here to define how the site builds your content
 * Try extending it to suit your needs!
 */

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2",
  ]);
  eleventyConfig.addPassthroughCopy("assets");

  // Twwiter card and site medata for SEO
  eleventyConfig.addPlugin(metagen);

  // https://www.npmjs.com/package/calendar-link
  eleventyConfig.addFilter("calander", (e, type) => {
    return calander.hasOwnProperty(type) ? calander[type](e) : "";
  });

  // Filters let you modify the content https://www.11ty.dev/docs/filters/
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    console.log(dateObj);
    return DateTime.fromJSDate(new Date(dateObj), {
      zone: "Australia/Sydney",
    })
      .setLocale("en-AU")
      .toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("htmlTimeString", (dateObj) => {
    console.log(dateObj);
    let r = DateTime.fromJSDate(new Date(dateObj), {
      zone: "Australia/Sydney",
    })
      .setLocale("en-AU")
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
    console.log(r);
    return r;
  });

  eleventyConfig.addFilter("titleCase", (text) => {
    return text.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  });

  eleventyConfig.addShortcode("textsize", (text, limit) => {
    if (text.length === limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  });

  eleventyConfig.addShortcode("labname", (name) => {
    return name.split(" ").slice(-1)[0] + " Lab";
  });

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  /* Build the collection of posts to list in the site
     - Read the Next Steps post to learn how to extend this
  */
  eleventyConfig.addCollection("talks", function (collection) {
    /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
       - https://www.11ty.dev/docs/collections/
    */

    // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
    // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
    const coll = collection.getFilteredByTag("talks");

    // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
    // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "build",
    },
  };
};
