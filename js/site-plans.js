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

var noccEnabled = nocctrial || localStorage.getItem("nocctrial") || true;
var noccExpired = trialexpired || localStorage.getItem("trialexpired") || false;

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

  if (noccEnabled) {
    if (noccExpired) {
      $("#plans-title").text("Your trial has ended");
      $("#plans-subtitle").text("Your 30-day free trial has ended. Subscribe to continue using Upnext.").show();
    } else{
      $("#plans-title").text("Start your subscription today!");
      $("#plans-subtitle").text("Experience full access with our 30-day free trial, then choose a plan that's right for you.").show();
    }
  } else if (trialEnabled) {
    $("#plans-title").text("Start your 14-day free trial!");
  }

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
