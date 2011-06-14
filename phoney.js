;(function(window, undefined) {
  
  //before we do anything, we have to ask if the device is touch capable.  if it is, we're going to
  //user Modernizr to load toucher.js to handle all the weirdness with touching.
  
  /*Modernizr.load({
    test: Modernizr.touch,
    yep : 'toucher.js'
  });*/
  
  
  /*all our testing will be done through Modernizr, because it's already there so why not? */
  //TODO - add tests for webkit and for app installed
  
  Modernizr.addTest('iPad', function () {
    return !!navigator.userAgent.match(/iPad/i);
  });

  Modernizr.addTest('iPhone', function () {
    return !!navigator.userAgent.match(/iPhone/i);
  });

  Modernizr.addTest('iPod', function () {
    return !!navigator.userAgent.match(/iPod/i);
  });
  
  Modernizr.addTest('webkit', function () {
    return !!navigator.userAgent.match(/webkit/i);
  });

  Modernizr.addTest('appleiOS', function () {
    return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
  });
  
  
  function groupValidate(groupName, groupChecks){
    for (var key in groupChecks){
      prop = groupChecks[key].toLowerCase();
      if (Modernizr[prop] !== true){
        console.log('break');
        return false;
      }
    }
    return groupName;
  }
  //break apart the groups and determine which group are we in
  function determineGroup(groups){
    var activeGroup = 'default';
    for (var key in groups){
      if (key !== 'default'){
        activeGroup = groupValidate(key, groups[key].split(' '));
        if(activeGroup !== false){
          return activeGroup;
        }
      }//endif
    }
    return activeGroup;
  }
  
  function replaceHref(oldHref, router){
    console.log('clicked --' + oldHref);
    //lets' define some variables
    var protocol = /((?:[a-z0-9_\-]{1,5})(?::\/\/))/g,
        href = oldHref,
        newHref = [],
        oldProtocol;
    //first things first.  if there's a direct match...
    //handle 1:1 router matches only, no wilds
    if (router[href]){
      console.log(router[href]);
      return router[href];
    }
    //ok the easy part's over.  no matches direct in route
    else{
      oldProtocol = href.match(protocol);
      console.log(oldProtocol);
      href = href.replace(protocol, '');
      //sanitize url, removing beginning and ending slashes
      //href = href.replace(/^\/|\/$/g, '');
      //href = href.split('/');
      console.log(href);
      //run thru looking for matches
      for (var key in router){
        rKey = new RegExp(key);
        console.log(rKey);
        console.log(href.match(rKey));
        if (href.match(rKey)){
          nKey = new RegExp(router[key]);
          href = href.replace(rKey, nKey);
          href = href.replace(/^\/|\/$/g, '');
          if (oldProtocol){
            href = oldProtocol + href;
          }
          console.log(href);
          return href;
        }
      }
      //so if we haven't returned by now that means there's no match.  so return oldie
      return oldHref;
      
    }
  }

  
  
  this.Phoney = function(config) { //pass in objects here
  if(!(this instanceof Phoney)) return new Phoney(config);
  console.log(this);
  this.activeGroup = determineGroup(config.groups);
  this.activeRouter = config.routers[this.activeGroup];
  
  this.startListening = function(){
    var activeRouter = this.activeRouter;
    console.log(activeRouter);

    window.onclick = function(event){
      console.log(event);
      element = event.srcElement;
      if (element.nodeName === "A") {
        element.setAttribute('href', replaceHref(element.getAttribute('href'), activeRouter));
        console.log(element);
      }
  event.preventDefault();
}
    console.log('listening now');
    
  }//startlistening
  console.log(this.activeRouter);
  return this;
  }
})(this);


//this would normally be somewhere else

var config = {
  groups : { //groups will be evaluated as they are defined
    //groups are matched using AND.  if one of the properties does not match, the group falls out.
    'html5': 'localStorage webkit',
    'iphoneApp': 'iPhone iPhoneAppInstalled',
    'default': 'default'
  },
  routers: {
    'html5': { //routes for html5 group match
      //search : replace
      'http://www.google.com': 'http://www.bing.com',
      'groups.html' : 'groups-html5.html',
      'index.html' : 'index-html5.html',
      '(somefolder)\\/([A-z0-9\\.]+)': 'somehtml5folder/$2' //all escape \ must be \\
    }
    
  }
}

var Phoney = Phoney(config);

window.onload = function(){
  console.log('ready');
  Phoney.startListening();
}
  
  
  
  