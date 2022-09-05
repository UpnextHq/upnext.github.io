$(() => {
  trackEvent("page.getStarted");

  var error = getParameterByName("error");
  var source = getParameterByName("source");

  if (error === "already-subscribed") {
    $("#plan-error").show();
  }

  if (source === "desktop") {
    $("#section-open-desktop").show();
    window.location = "upnext://subscriptions-success";
  }

  $("#signin-web").click(() => {
    trackEvent("action.signinWeb");
  });
  $("#install-chrome").click(() => {
    trackEvent("action.installChrome");
  });
  $("#install-firefox").click(() => {
    trackEvent("action.installFirefox");
  });
  $("#install-safari").click(() => {
    trackEvent("action.installSafari");
  });
  $("#install-ios").click(() => {
    trackEvent("action.installIOS");
  });
});
