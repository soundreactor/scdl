chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  startAuthHijack();
});

// fetch and save data when chrome restarted, alarm will continue running when chrome is restarted
chrome.runtime.onStartup.addListener(() => {
  console.log('onStartup....');
  startAuthHijack();
});

chrome.extension.getBackgroundPage().startAuthHijack = function() {
  console.log("AAAAAAAAAAUUUTHTTTHTHTHTHHTHH");
  chrome.extension.getBackgroundPage().scdl_oauth = "none";


  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      var hasAUTH = false;
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        //console.log(details.requestHeaders[i]);
        if (details.requestHeaders[i].name == "Authorization") {
          if (details.requestHeaders[i].value.includes("OAuth")) {
            chrome.extension.getBackgroundPage().scdl_oauth = details.requestHeaders[i].value;
          }
          hasAUTH = true;
        }
        // if (details.requestHeaders[i].name === 'User-Agent') {
        //   details.requestHeaders.splice(i, 1);
        //   break;
        // }
      }
      if (!hasAUTH) {
        details.requestHeaders.push({
          "name": "Authorization",
          "value": chrome.extension.getBackgroundPage().scdl_oauth
        });
      }

      return {
        requestHeaders: details.requestHeaders
      };
    },
    //{urls: ['<all_urls>']},
    {
      urls: ['https://api-v2.soundcloud.com/*']
    },
    ['blocking', 'requestHeaders']
  );


  if (window.navigator.userAgent.includes("hrome")) {
    console.log("is chrome");
    var babedibup_settings = ['extraHeaders', 'blocking', 'responseHeaders'];
  } else {
    console.log("is mozzz");
    var babedibup_settings = ['blocking', 'responseHeaders'];
  }


  chrome.webRequest.onHeadersReceived.addListener(
    function(details) {

      //var hasAUTH = false;

      for (var i = 0; i < details.responseHeaders.length; ++i) {
        if (details.responseHeaders[i].name == "X-Content-Type-Options") {
          details.responseHeaders.splice(i, 1);
        }
        if (details.responseHeaders[i].name == "Access-Control-Allow-Origin") {
          details.responseHeaders.splice(i, 1);
        }
        if (details.responseHeaders[i].name == "access-control-allow-origin") {
          details.responseHeaders.splice(i, 1);
        }

      }

      //if(!hasAUTH){
      details.responseHeaders.push({
        "name": "Access-Control-Allow-Origin",
        "value": "*"
      });
      details.responseHeaders.push({
        "name": "Access-Control-Allow-Headers",
        "value": "Authorization, Content-Type, Device-Locale, X-CSRF-Token"
      });
      details.responseHeaders.push({
        "name": "Access-Control-Allow-Methods",
        "value": "GET, POST, PUT, PATCH, DELETE"
      });
      details.responseHeaders.push({
        "name": "Access-Control-Expose-Headers",
        "value": "Date"
      });
      details.responseHeaders.push({
        "name": "Access-Control-Allow-Credentials",
        "value": "true"
      });
      //}

      for (var i = 0; i < details.responseHeaders.length; ++i) {
        //console.log(details.responseHeaders[i]);
      }

      return {
        responseHeaders: details.responseHeaders
      };
    },
    //{urls: ['<all_urls>']},
    {
      urls: ['https://api-v2.soundcloud.com/*']
    },
    babedibup_settings
  );

}
