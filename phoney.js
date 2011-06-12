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
      console.log(prop + ' ' + Modernizr[prop]);
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
        console.log(activeGroup);
        if(activeGroup !== false){
          return activeGroup;
        }
      }//endif
    }
    console.log('no groups matched');
    return activeGroup;
  }
  
  function replaceHref(href, router){
    //href = href.replace(/(\/|\.|\*)/g, '\\$1');
    //exp = RegExp(href);
    if (router[href]){
      return router[href];
    }
    else{
      
    for (var key in router){
        //console.log (key + ' ----> ' + router[key]);
        //regixify url from original link, put it into a variable
        keyReg = key.replace(/(\/|\.)/g, '\\$1');
        //replace the star with a regex pattern
         keyReg = keyReg.replace("*", "(([\\w-_\\.?]+\\/?)+)");
        exp = RegExp(keyReg); // and make it into a regex
        //console.log(exp);
        
        if (href.match(exp)){ //if regex matches
          console.log('MATCH')
          //console.log('regex = ' + exp);
          //console.log('href = ' + href);
          var matchedURL; //href, key
          matchedURL = router[key];
          //console.log(matchedURL = matchedURL.split('*')); //splits matched url at *
          /*now that we've been able to match the key,
          and we KNOW what the router says, we have to replace
          the clicked HREF with the router definition*/
          //HERE COMES SOME COMPLICATED ASS REGEX
          console.log('key = ' + key)
          console.log('routermatch = ' + matchedURL);
          console.log('clicked href = ' + href);
          
          //console.log(href.match(exp));
          
          //console.log(matchedURL = )
          
          return router[key];
        }
        
        
        /*console.log(key.match(exp));
        if(key.match(exp)){
          console.log(router[key]);
          return router[key];
        }*/
      }
      }
  }
    
    /*here we need to account for a few things:
     what if there's no match?
     what if it's more than one link depth?
    */
  
  
  this.Phoney = function(config) { //pass in objects here
  if(!(this instanceof Phoney)) return new Phoney(config);
  console.log(this);
  this.activeGroup = determineGroup(config.groups);
  this.activeRouter = config.routers[this.activeGroup];
  
  this.startListening = function(){
    var activeRouter = this.activeRouter;
    //console.log(activeRouter);

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
      'somefolder/*': 'somehtml5folder/*', //this one will do matching for all subdirs
      'somenewfolder/*/index' : 'somenewfolder/*/index5'
    }
    
  }
}

var Phoney = Phoney(config);

window.onload = function(){
  console.log('ready');
  Phoney.startListening();
}
  
  
  
  