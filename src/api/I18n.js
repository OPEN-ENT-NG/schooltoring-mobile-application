import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import fr from "../locales/fr";

I18n.translations = { fr };

const languageTag =
  RNLocalize.findBestAvailableLanguage(Object.keys(I18n.translations))
    .languageTag || "fr";

I18n.locale = languageTag;

export default I18n;
