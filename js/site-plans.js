var plan = getParameterByName("plan");
var selectedPlan;
var coupon = getParameterByName("coupon");
var trial = getParameterByName("trial");
var host = getParameterByName("host") ?? "app.getupnext.com";
var source = getParameterByName("source");

trackEvent("page.selectPlan", { plan, coupon });

var trialEnabled = trial || localStorage.getItem("trial") || true;

if (trialEnabled) {
  $("#plans-title").text("Start your 14-day free trial!");
}

const updateSelectedPlan = (newPlan) => {
  $(".plan-option").removeClass("plan-option-selected");
  $(".plan-option").each((index, plan) => {
    if ($(plan).attr("data-plan") === newPlan) {
      $(plan).addClass("plan-option-selected");
      if (selectedPlan) {
        trackEvent("action.selectedPlan", { plan: selectedPlan, coupon });
      }
      selectedPlan = newPlan;
    }
  });
};

const handleContinue = () => {
  trackEvent("action.continueWithPlan", { plan: selectedPlan, coupon }, () => {
    window.location =
      (host.substr(0, 4) === "http" ? "" : "//") +
      host +
      "/subscribe?" +
      "period=" +
      selectedPlan +
      "&coupon=" +
      (coupon || localStorage.getItem("coupon")) +
      "&trial=" +
      trialEnabled +
      (source ? "&source=" + source : "") +
      "&utm_campaign=" +
      localStorage.getItem("utm_campaign") +
      "&utm_source=" +
      localStorage.getItem("utm_source") +
      "&utm_medium=" +
      localStorage.getItem("utm_medium") +
      "&utm_term=" +
      localStorage.getItem("utm_term") +
      "&utm_content=" +
      localStorage.getItem("utm_content") +
      "&mxpid=" +
      (analytics?.user?.().id?.() ??
        analytics?.user?.().anonymousId?.() ??
        undefined);
  });
};

$(function () {
  $(".plan-option").each((index, plan) => {
    $(plan).click(() => {
      updateSelectedPlan($(plan).attr("data-plan"));
    });
  });
  $("#plan-continue").click(() => {
    handleContinue();
  });
  updateSelectedPlan(plan ?? "monthly");
});
