$(() => {
  // name: localStorage.getItem("utm_campaign"),
  //   source: localStorage.getItem("utm_source"),
  //   medium: localStorage.getItem("utm_medium"),
  //   term: localStorage.getItem("utm_term"),
  //   content: localStorage.getItem("utm_content"),

  // write superproperties to localStorage (once)
  ["coupon", "trial"].forEach((superProperty) => {
    if (
      !localStorage.getItem(superProperty) &&
      getParameterByName(superProperty)
    ) {
      localStorage.setItem(superProperty, getParameterByName(superProperty));
    }
  });

  if (!localStorage.getItem("attributionSetForUser")) {
    // detect if attribution params are present
    let attributionDetected = false;
    let attributionValues = {};

    [
      "utm_campaign",
      "utm_source",
      "utm_medium",
      "utm_term",
      "utm_content",
    ].forEach((attributionProperty) => {
      attributionValues[attributionProperty] =
        getParameterByName(attributionProperty);
      if (
        !attributionDetected &&
        attributionValues[attributionProperty] !== ""
      ) {
        attributionDetected = true;
      }
    });

    let traits;
    if (attributionDetected) {
      traits = {
        attr_medium: attributionValues["utm_medium"],
        attr_campaign: attributionValues["utm_campaign"],
        attr_source: attributionValues["utm_source"],
        attr_keywords: attributionValues["utm_term"],
        attr_creative: attributionValues["utm_content"],
      };
    } else {
      traits = {
        attr_medium: "organic",
      };
    }
    analytics.ready(()=>{
      analytics.identify(analytics?.user()?.anonymousId(), traits);
      localStorage.setItem("attributionSetForUser","true");
    });
  }

  $("#new-navbar").css("opacity", "1");
});
