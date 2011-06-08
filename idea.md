The idea is to create a library that will use feature/device
detection to change the links.

The way i see this working is by using objects:

1. Main routing table
var router = {
group : routing table
group : routing table
};

2. var group = iphone ={
//rules for group detection
webkit : true
canvas : true
}

3. routingTable
var routingTable = {
link now : link later
}

4. defaultRouting = do nothing

dependency - modernizr


5.  What will cause each to go where:
iphone app:
1. device is iphone
2. app is installed
3. routes go from there

html5 app
1. device supports js
2. device supports local storage

regular theme
1. device has no js support
2. no routing spec in any other groups