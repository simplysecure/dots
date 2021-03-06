// Base navigation configuration to which filters are applied below.
const navitems = {
  main: [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Pattern Library",
      url: "/library/",
    },
    {
      label: "Contribute",
      url: "/contribute/",
    },
    {
      label: "About",
      url: "/about/",
    },
  ],
};

/**
 * True when executed in a Netfliy production build context
 */
const isNetlifyProduction = process.env.CONTEXT === "production";

/**
 * Filter draft items when in production context
 *
 * @param {Object} input navigation configuration
 */
const draftFilter = ({ main, ...rest }) => ({
  main: main.filter((item) => !item.draft || !isNetlifyProduction),
  ...rest,
});

const filteredNavitems = draftFilter(navitems);
module.exports = filteredNavitems;
