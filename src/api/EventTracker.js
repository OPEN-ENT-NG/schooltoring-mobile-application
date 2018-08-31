import Analytics from "appcenter-analytics";

export function trackEvent(event, category) {
  Analytics.trackEvent(event, { Category: category });
}

export const category = {
  AUTHENTICATION: "AUTHENTICATION",
  SEEK_HELP: "SEEK_HELP",
  OFFER_HELP: "OFFER_HELP",
  REQUEST: "REQUEST",
  MESSAGE: "MESSAGE",
  MESSAGE: "MESSAGE",
  FAVORITE: "FAVORITE",
  PROFILE: "PROFILE"
};

export const events = {
  AUTHENTICATION: {
    connected: "L'utilisateur se connecte",
    disconnected: "L'utilisateur se déconnecte"
  },
  SEEK_HELP: {
    click: "L'utilisateur clique sur 'J'ai besoin d'aide'",
    request: "L'utilisateur lance une demande d'aide",
    skip: "L'utilisateur passe un match",
    view: "L'utilisateur consulte le profil d'un camarade"
  },
  OFFER_HELP: {
    click: "L'utilisateur clique sur 'Je peux aider'",
    request: "L'utilisateur lance une proposition d'aide",
    skip: "L'utilisateur passe un match",
    view: "L'utilisateur consulte le profil d'un camarade"
  },
  REQUEST: {
    SEEK_REFUSE: "L'utilisateur refuse une requête d'aide",
    SEEK_ACCEPT: "L'utilisateur accepte une requête d'aide",
    OFFER_REFUSE: "L'utilisateur refuse une proposition d'aide",
    OFFER_ACCEPT: "L'utilisateur accepte une proposition d'aide"
  },
  MESSAGE: {
    FIRST: "L'utilisateur répond à un premier message",
    SEND: "L'utilisateur envoie un message"
  },
  FAVORITE: {
    ADD: "L'utilisateur ajoute quelqu'un à ses favoris",
    DELETE: "L'utilisateur supprime un favoris"
  },
  PROFILE: {
    STRENGTHS: "L'utilisateur change ses points forts",
    WEAKNESSES: "L'utilisateur change ses points faibles",
    AVAILABILITIES: "L'utilisateur change ses jours de disponibilité"
  }
};

export default {
  trackEvent,
  category,
  events
};
