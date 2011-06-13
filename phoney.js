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
  
  function replaceHref(href, router){
    console.log(href);
    var newHref = [];
    if (router[href]){
      return router[href];
    }
    else{
      for (var key in router){
      //regixify url from original link, put it into a variable
        keyReg = key.replace(/(\/|\.)/g, '\\$1');
      //replace the star with a regex pattern
        keyReg = keyReg.replace("*", "(([\\w-_\\.?]+\\/?)+)?");
        exp = RegExp(keyReg); // and make it into a regex
        console.log(exp);
      
        if (href.match(exp)){ //if regex matches
          var routerNew = router[key].split('/'),
              routerOld = key.split('/');
          //routerNew = routerNew.split('/');
          //routerOld = routerOld.split('/');
          href = href.split('/');
          //if (href.length === routerNew.length){
            for (i = 0; i < href.length; i++){
              if(href[i] === routerNew[i]){
                console.log('  ----- >>>> ' + routerNew[i]);
                newHref.push(routerNew[i]);
              }
              else {
                if(routerNew[i] === '*'){
                    for (n = i; n < href.length; n++){
                      if (href[n] === routerOld[i+1]){
                     break;
                      }
                      else{
                         newHref.push(href[n]);
                      }
                    }
                }
                else{
                  if (routerNew[i]){
                    newHref.push(routerNew[i]);
                  }
                  
                }
              }
            }//for
            newHref = newHref.join('/');
            console.log(newHref);
          //}//if
          return newHref;
          
          }//if match
          
          //console.log(href.match(exp));
          
          //console.log(routerNew = )
          
          //return router[key];
        }
        
        
      
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
        //console.log(element);
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
      'somenewfolder/*/index' : 'somenewfolder/*/index5',
      'allplayers.com/*' : 'allplayers.com/mobile/*'
    }
    
  }
}

var Phoney = Phoney(config);

window.onload = function(){
  console.log('ready');
  Phoney.startListening();
}
  
  
  
  