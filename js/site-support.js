$(() => {
  trackEvent("page.support");

  $(".getintouch").click(() => {
    var p1 = "bWFpbHRvOmZlZWRiYWNrQA==";
    window.location = atob(p1) + "getupnext.com";
  });
});
