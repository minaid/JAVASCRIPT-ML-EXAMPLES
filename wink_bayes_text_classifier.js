
//Run in https://npm.runkit.com/wink-naive-bayes-text-classifier

// Load Naive Bayes Text Classifier
var Classifier = require( 'wink-naive-bayes-text-classifier' );
// Instantiate
var nbc = Classifier();
// Load NLP utilities
var nlp = require( 'wink-nlp-utils' );
// Configure preparation tasks
nbc.definePrepTasks( [
  // Simple tokenizer
  nlp.string.tokenize0,
  // Common Stop Words Remover
  nlp.tokens.removeWords,
  // Stemmer to obtain base word
  nlp.tokens.stem
] );
// Configure behavior
nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 } );
// Train!
nbc.learn( 'Error flow', 'flow' );
nbc.learn( 'Flow failed', 'flow' );
nbc.learn( 'Flow execution', 'flow' );
nbc.learn( 'Flow not complete', 'flow' );
nbc.learn( 'unable to extend', 'flow' );
nbc.learn( 'users cant login', 'flow' );
nbc.learn( 'Flow failure', 'flow' );
nbc.learn( 'users disabled', 'flow' );

nbc.learn( 'add action', 'ptp' );
nbc.learn( 'add ptp', 'ptp' );
nbc.learn( 'add settlement', 'ptp' );
nbc.learn( 'promise to pay', 'ptp' );
nbc.learn( '10501', 'ptp' );
// Consolidate all the training!!
nbc.consolidate();
// Start predicting...
console.log( nbc.predict( 'I would like to add a PTP' ) );
if(nbc.predict( 'I would like to add a PTP' ) =='ptp'){
console.log('To add a PTP, go to the Account file, press the Add Action button and search for 10501');
}
// -> autoloan
console.log( nbc.predict( 'The flow Start of Day failed' ) );
if(nbc.predict( 'I would like to add a PTP' ) =='ptp'){
console.log('If the flow failed, go to Administration->Flow Execution->Double Click the failed flow->Messages and inform us of the error message. Also please send us the log file which can be found in Application Server e.g. C:/EFS/Websites/Website_Name/Logs');
}
// -> prepay