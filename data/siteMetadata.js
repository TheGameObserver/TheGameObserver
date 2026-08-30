/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'The Game Observer',
  author: 'The Game Observer',
  headerTitle: 'The Game Observer',
  description:
    'A professional global football analysis publication focused on tactical, technical and analytical insight.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://thegameobserver.in',
  siteRepo: 'https://github.com/TheGameObserver/TheGameObserver',
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  // Social profiles intentionally omitted until official accounts exist.
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. thegameobserver.in
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  // Newsletter intentionally disabled for V1 — no BUTTONDOWN_API_KEY is configured
  // and submissions would fail. The existing conditional in app/Main.tsx hides the
  // newsletter form while no provider is set. To enable later: add
  // `provider: 'buttondown'` back and provide BUTTONDOWN_API_KEY.
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
  },
  // Comments intentionally disabled for V1 — Giscus environment variables are not
  // configured, so the widget would render with an invalid configuration. The
  // truthiness guards in layouts (PostLayout/PostSimple/PostBanner) and components
  // (Comments/ScrollTopAndComment) skip the comment section while this object is
  // absent. To enable later: restore this object with provider 'giscus' and set
  // NEXT_PUBLIC_GISCUS_REPO, NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
  // NEXT_PUBLIC_GISCUS_CATEGORY and NEXT_PUBLIC_GISCUS_CATEGORY_ID.
  // giscusConfig reference:
  //   repo / repositoryId / category / categoryId from https://giscus.app/
  //   mapping: 'pathname', reactions: '1', metadata: '0', theme: 'light',
  //   darkTheme: 'transparent_dark', themeURL: '', lang: 'en'
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
