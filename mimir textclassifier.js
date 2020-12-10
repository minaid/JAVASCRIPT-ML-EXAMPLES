var mimir = require('mimir'),
  brain = require('brain.js');

/* few utils for the example */
function vec_result(res, num_classes) {
  var i = 0,
    vec = [];
  for (i; i < num_classes; i += 1) {
    vec.push(0);
  }
  vec[res] = 1;
  return vec;
}

function maxarg(array) {
  return array.indexOf(Math.max.apply(Math, array));
}

// train data
var ANN_Classes = {
    PTP: 0,
    FLOW_ERROR: 1
  },
  classes_array = Object.keys(ANN_Classes), //['PTP', 'FLOW_ERROR'],
  texts = [
    // PTP
    "ADD ACTION PTP SETTLEMENT PROMISE TO PAY 10501",    
    // FLOW_ERROR
    "FLOW FAILED ERROR FLOW FLOW EXECUTION FLOW NOT COMPLETE UNABLE TO EXTEND USERS CAN'T LOGIN USERS DISABLED FAILURE"  
  ],
  dict = mimir.dict(texts),
  traindata = [
    [mimir.bow(texts[0], dict), ANN_Classes.PTP],
    [mimir.bow(texts[1], dict), ANN_Classes.FLOW_ERROR]   
  ],
  test_ptp = "Add a PTP",
  test_flow = "The flow start of day failed",
  test_bow_ptp = mimir.bow(test_ptp, dict),
  test_bow_flow = mimir.bow(test_flow, dict);

var net = new brain.NeuralNetwork(),
  ann_train = traindata.map(function (pair) {
    return {
      input: pair[0],
      output: vec_result(pair[1], 3)
    };
  });

net.train(ann_train);
console.log('------------------- ANN (brain) ----------------------');
var predict = net.run(test_bow_ptp);
console.log(predict);
console.log(classes_array[maxarg(predict)]); // prints HISTORY
console.log(classes_array[maxarg(net.run(test_bow_flow))]); // prints MUSIC
