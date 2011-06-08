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