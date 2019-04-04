import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

const translationGetters = {
  en: () => require("../locales/en"),
  fr: () => require("../locales/fr")
};

const languageTag =
  RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters))
    .languageTag || "fr";

// set i18n-js config
I18n.translations = { [languageTag]: translationGetters[languageTag]() };
I18n.locale = languageTag;

export default I18n;
