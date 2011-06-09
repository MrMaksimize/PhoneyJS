;(function(window, undefined) {
  /*function isIphone(){
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
  }
    return true; //or false
  }*/
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
    /*here we need to account for a few things:
     what if there's no match?
     what if it's more than one link?
    */
    console.log('oldhref= ' + href);
    console.log(router);
    newHref = router[href];
    return newHref;
  }
  
  this.Phoney = function(config) { //pass in objects here
  if(!(this instanceof Phoney)) return new Phoney(config);
  console.log(this);
  this.activeGroup = determineGroup(config.groups);
  this.activeRouter = config.routers[this.activeGroup];
  
  this.startListening = function(){
    var activeRouter = this.activeRouter;
    var elements;
    console.log('listening now');
    elements = document.getElementsByTagName('a');
    console.log(elements);
    
    for (i = 0; i < elements.length; i++){
      console.log(elements[i]);
        elements[i].addEventListener('click', function(){
          this.setAttribute('href', replaceHref(this.getAttribute('href'), activeRouter));
          console.log(this.getAttribute('href'));
          });
    }//for
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
      'index.html' : 'index-html5.html'
    }
    
  }
}

var Phoney = Phoney(config);

window.onload = function(){
  console.log('ready');
  Phoney.startListening();
}
  
  
  
  