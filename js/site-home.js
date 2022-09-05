  $(()=>{
  	trackEvent('page.home');
    $('#hero-play-button').click(()=>{
	    trackEvent('action.playDemoVideo');
    });
    
	  $('#hero-container-main').css('display','flex');
    $('#rethinking-ril').css('opacity','1');
    $('#newhero-section').css('opacity','1');
  });