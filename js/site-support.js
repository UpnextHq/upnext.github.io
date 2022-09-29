$(() => {
  trackEvent("page.support");

  var p1 = "aGVsbG9A";
  var p2 = atob(p1) + "getupnext.com";
  $(".getintouch").attr('href','mai'+'lto:'+p2);
  $("#supportEmail").text(p2);
});
