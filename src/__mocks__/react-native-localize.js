// __mocks__/react-native-localize.js

const getLocales = () => [
  // you can choose / add the locales you want
  { countryCode: "US", languageTag: "en-US", languageCode: "en", isRTL: false },
  { countryCode: "FR", languageTag: "fr-FR", languageCode: "fr", isRTL: false }
];

// use a provided translation, or return undefined to test your fallback
const findBestAvailableLanguage = () => ({
  languageTag: "fr",
  isRTL: false
});

const addEventListener = jest.fn();
const removeEventListener = jest.fn();

export { findBestAvailableLanguage, addEventListener, removeEventListener };
