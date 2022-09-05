function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  // get campaign params and write to session cookie
  if (getParameterByName('s')){
    sessionStorage.setItem("ref-source", getParameterByName('s'));
  }
  
  if (getParameterByName('c')){
    sessionStorage.setItem("ref-campaign", getParameterByName('c'));
  }
  
  
  ['utm_campaign','utm_source', 'utm_medium', 'utm_term', 'utm_content', 'coupon', 'trial'].forEach((superproperty)=>{
    if (!localStorage.getItem(superproperty) && getParameterByName(superproperty)){
    	localStorage.setItem(superproperty, getParameterByName(superproperty));
    }
  });
  
  
  var context = { 
    campaign: {
      name: localStorage.getItem('utm_campaign'),
      source: localStorage.getItem('utm_source'),
      medium: localStorage.getItem('utm_medium'),
      term: localStorage.getItem('utm_term'),
      content: localStorage.getItem('utm_content'),
    }
  };
  
  async function trackEvent(eventName, params = {}, callback = undefined){
	await analytics.track(eventName, { ... params }, { context });
	callback?.(); 
  }
  
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://analytics-cdn.getupnext.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="mfAvGhaAcGw9Xk2B22qt3GHfHvwlXrJC";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("mfAvGhaAcGw9Xk2B22qt3GHfHvwlXrJC", 
      { integrations: {'Segment.io': { apiHost: 'analytics-api.getupnext.com/v1' } }, obfuscate: 'true'}
  );
  analytics.page({},{context});
  }}();

  $(()=>{
	$('#new-navbar').css('opacity','1');
 });