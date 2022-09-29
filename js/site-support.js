$(() => {
  trackEvent("page.support");

  var p1 = "bWFpbHRvOmZlZWRiYWNrQA==";
  var p2 = atob(p1) + "getupnext.com";
  $(".getintouch").attr('href',p2);
  $("#supportEmail").text(p2.replace('mai'+'lto:','');
});
