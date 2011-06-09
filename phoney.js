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
    console.log(groups);
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
  
  this.Phoney = function(config) { //pass in objects here
  
  if(!(this instanceof Phoney)) return new Phoney(config);
  group = determineGroup(config.groups);
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
  }
  }
  var Phoney = Phoney(config);
  