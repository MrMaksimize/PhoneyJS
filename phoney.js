;(function(window, undefined) {
  
  //before we do anything, we have to ask if the device is touch capable.  if it is, we're going to
  //user Modernizr to load toucher.js to handle all the weirdness with touching.
  //TODO - touch devices.  stuff looks like it works fine with iphone4, but more superphone
  //testing is needed.
  /*all our testing will be done through Modernizr, because it's already there so why not? */
  //TODO - add tests for for app installed
  
  Modernizr.addTest('ipad', function () {
    return !!navigator.userAgent.match(/iPad/i);
  });

  Modernizr.addTest('iphone', function () {
    return !!navigator.userAgent.match(/iPhone/i);
  });

  Modernizr.addTest('ipod', function () {
    return !!navigator.userAgent.match(/iPod/i);
  });
  
  Modernizr.addTest('webkit', function () {
    return !!navigator.userAgent.match(/webkit/i);
  });

  Modernizr.addTest('appleios', function () {
    return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
  });
  
  
  /*function groupValidate(groupName, groupChecks){
    console.log(groupName);
    console.log(groupChecks);
    for (i = 0; i < groupChecks.length; i++){
      prop = groupChecks[i].toLowerCase();
      if (Modernizr[prop] !== true){
        console.log('break');
        return false;
      }
    }
    console.log('r gname');
    return groupName;
  }*/
  //break apart the groups and determine which group are we in
  function determineGroup(groups){
    console.log(groups);
    var activeGroup = 'default';
    for (var key in groups){
      console.log(key);
      if (key !== 'default'){
        groupProps = groups[key].split(' ');
        console.log(groupProps.length);
        console.log(groupProps);
        var thisGroupCount = 0;
        for (i = 0; i < groupProps.length; i++){
          prop = groupProps[i].toLowerCase();
          if (Modernizr[prop] !== true){
            console.log('group ' + key + ' out based on ' + prop );
          }
          else{
            thisGroupCount++;
            console.log(thisGroupCount);
          }
        }
        if (thisGroupCount === groupProps.length){
          console.log(thisGroupCount + '==' + groupProps.length);
          activeGroup = key;
          console.log(activeGroup);
          return activeGroup;
        }
      }//endif key !default
    }
    //if we've gotten here, that means nothing matched, so
    return activeGroup;
  }
  
  function replaceHref(oldHref, router){
    console.log(oldHref);
    // protocol match -  /((?:[a-z0-9_\-]{1,5})(?::\/\/))/g,
    var href = oldHref,
        rKey,
        nKey;
    //handle 1:1 router matches only, no wilds
    if (router[href]){
      console.log(router[href]);
      return router[href];
    }
    //ok the easy part's over.  no matches direct in route
    else{
      //oldProtocol = href.match(protocol);
      //console.log(oldProtocol);
      //href = href.replace(protocol, '');
      //sanitize url, removing beginning and ending slashes
      //href = href.replace(/^\/|\/$/g, '');
      //href = href.split('/');
      //console.log(href);
      //run thru looking for matches
      for (var key in router){
        rKey = new RegExp(key);
        console.log(rKey);
        if (href.match(rKey)){
          nKey = router[key];
          href = href.replace(rKey, nKey);
          href = href.replace(/^\/|\/$/g, '');
          //if (oldProtocol){
           // href = oldProtocol + href;
          //}
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
  console.log(this.activeGroup);
  this.activeRouter = config.routers[this.activeGroup];
  
  this.startListening = function(){
    var activeRouter = this.activeRouter;
    console.log(activeRouter);

    window.onclick = function(event){
      console.log(event);
      element = event.srcElement;
      if (element.nodeName === "A") {
        element.setAttribute('href', replaceHref(element.getAttribute('href'), activeRouter));
        alert(element); //remove when done testing
        
      }
      event.preventDefault(); //remove me when u're done testing
}
    console.log('listening now');
    
  }//startlistening
  console.log(this.activeRouter);
  return this;
  }
})(this);