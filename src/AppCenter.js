import Crashes from "appcenter-crashes";
import Analytics from "appcenter-analytics";

export default class AppCenter {
  constructor() {
    this.setCrashes();
    this.setAnalytics();
  }

  setCrashes() {
    Crashes.setListener({
      shouldProcess: function(report) {
        return true;
      }
    });
  }

  setAnalytics() {
    if (!__DEV__) {
      Analytics.setEnabled(true);
    }
  }
}
