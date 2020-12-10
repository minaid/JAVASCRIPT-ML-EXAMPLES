var whichpet = require("whichx");

var whichpet = new WhichX();

var labels = ["PTP","FLOW"];
// Add your labels to the whichx object.
whichpet.addLabels(labels);

// Add a description and its label to the data set.
whichpet.addData("PTP", "ADD ACTION PTP SETTLEMENT PROMISE TO PAY 10501");
whichpet.addData("FLOW", "FLOW FAILED ERROR FLOW FLOW EXECUTION FLOW NOT COMPLETE UNABLE TO EXTEND USERS CAN'T LOGIN USERS DISABLED FAILURE");

var result = whichpet.classify(document.getElementById('newtranscript').value.toUpperCase());

alert(result);

if(result=="PTP"){
console.log("To add a PTP, go to the Account file, press the Add Action button and search for 10501");
}else if(result=="FLOW"){
console.log("If the flow failed, go to Administration->Flow Execution->Double Click the failed flow->Messages and inform us of the error message. Also please send us the log file which can be found in Application Server e.g. C:/EFS/Websites/Website_Name/Logs");
}