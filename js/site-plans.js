var plan = getParameterByName("plan");
var selectedPlan;
var coupon = getParameterByName("coupon");
var trial = getParameterByName("trial");
var host = getParameterByName("host") ?? "app.getupnext.com";
var source = getParameterByName("source");
var nocctrial = getParameterByName("nocctrial");
var trialexpired = getParameterByName("trialexpired");



trackEvent("page.selectPlan", { plan, coupon });

var trialEnabled = trial || localStorage.getItem("trial") || true;

var noccEnabled = nocctrial || localStorage.getItem("nocctrial") || false;

if (trialEnabled) {
  $("#plans-title").text("Start your 14-day free trial!");
}

if (noccEnabled) {
  if (trialexpired) {
    $("#plans-title").text("Susbcribe to continue using Upnext!");
  } else{
    $("#plans-title").text("Subscribe to Upnext today!");
  }
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
      "&nocctrial=" +
      noccEnabled +
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
