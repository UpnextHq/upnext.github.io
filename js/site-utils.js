function loadAsset(filename, type) {
  let assetsDomain = "https://upnexthq.github.io/wf-assets";
  if (localStorage.getItem("dev_domain")) {
    assetsDomain = localStorage.getItem("dev_domain");
    console.log("💥 Loading assets from dev server! 💥");
  }

  let tag;
  if (type === "js") {
    tag = document.createElement("script");
    tag.src = `${assetsDomain}/js/${filename}`;
    tag.async = false; // This is required for synchronous execution
  } else if (type === "css") {
    tag = document.createElement("link");
    tag.rel = "stylesheet";
    tag.type = "text/css";
    tag.href = `${assetsDomain}/css/${filename}`;
  }
  document.head.appendChild(tag);
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return undefined;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function trackEvent(eventName, params = {}, callback = undefined) {
  await analytics.track(eventName, { ...params });
  callback?.();
}

!(function () {
    var analytics = (window.analytics = window.analytics || []);
    if (!analytics.initialize)
      if (analytics.invoked)
        window.console &&
          console.error &&
          console.error("Segment snippet included twice.");
      else {
        analytics.invoked = !0;
        analytics.methods = [
          "trackSubmit",
          "trackClick",
          "trackLink",
          "trackForm",
          "pageview",
          "identify",
          "reset",
          "group",
          "track",
          "ready",
          "alias",
          "debug",
          "page",
          "once",
          "off",
          "on",
          "addSourceMiddleware",
          "addIntegrationMiddleware",
          "setAnonymousId",
          "addDestinationMiddleware",
        ];
        analytics.factory = function (e) {
          return function () {
            var t = Array.prototype.slice.call(arguments);
            t.unshift(e);
            analytics.push(t);
            return analytics;
          };
        };
        for (var e = 0; e < analytics.methods.length; e++) {
          var key = analytics.methods[e];
          analytics[key] = analytics.factory(key);
        }
        analytics.load = function (key, e) {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.async = !0;
          t.src =
            "https://analytics-cdn.getupnext.com/analytics.js/v1/" +
            key +
            "/analytics.min.js";
          var n = document.getElementsByTagName("script")[0];
          n.parentNode.insertBefore(t, n);
          analytics._loadOptions = e;
        };
        analytics._writeKey = "mfAvGhaAcGw9Xk2B22qt3GHfHvwlXrJC";
        analytics.SNIPPET_VERSION = "4.15.3";
        analytics.load("mfAvGhaAcGw9Xk2B22qt3GHfHvwlXrJC", {
          integrations: {
            "Segment.io": { apiHost: "analytics-api.getupnext.com/v1" },
          },
          obfuscate: "true",
        });
      }
  })();
