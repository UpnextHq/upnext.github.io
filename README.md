# Webflow assets

This Pages repo is deployed to `https://upnexthq.github.io/wf-assets`.

Run the `pages build and deployment` action to deploy changes.

*Dev mode*

If you set `dev_domain` property in localstorage, the webflow site will load the assets from that domain.

Run `localStorage.setItem('dev_domain', 'https://somengrokorotherdomain.com')` 
And `localStorage.removeItem('dev_domain')` to switch back to production.

*Localtunnel > Ngrok*

Ngrok's interstitial page (disclaimer about ngrok's services) blocks assets to be loaded, and their premium plans are expensive.

Localtunnel is good alternative, since our needs are very simple! 

-> https://github.com/localtunnel/localtunnel
