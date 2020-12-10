
//Run in https://npm.runkit.com/wink-naive-bayes-text-classifier

const natural = require('natural');
const BrainJs = require('brain.js')

const TrainingSet = [
  {"phrase": "Error flow", "result": {"flow_error": 1}},
  {"phrase": "Flow failed", "result": {"flow_error": 1}},
  {"phrase": "Flow execution", "result": {"flow_error": 1}},
  {"phrase": "Flow not complete", "result": {"flow_error": 1}},
  {"phrase": "unable to extend", "result": {"flow_error": 1}},
  {"phrase": "users cant login", "result": {"flow_error": 1}},
  {"phrase": "users disabled", "result": {"flow_error": 1}},
  {"phrase": "add action", "result": {"ptp": 1}},
  {"phrase": "add ptp", "result": {"ptp": 1}},
  {"phrase": "add settlement", "result": {"ptp": 1}},
  {"phrase": "promise to pay", "result": {"ptp": 1}},
  {"phrase": "10501", "result": {"ptp": 1}}
];

const dictionary = buildWordDictionary(TrainingSet);

const encodedTrainingSet = TrainingSet.map(dataSet => {
  const encodedValue = encode(dataSet.phrase)
  return {input: encodedValue, output: dataSet.result}
})

const network = new BrainJs.NeuralNetwork({ hiddenLayers: [3] });
network.train(encodedTrainingSet);

const encoded = encode("Flow failed");

console.log(network.run(encoded));

// { bad: flow error, good: ptp }

function encode (phrase) {
  const phraseTokens = phrase.split(' ');
  const encodedPhrase = dictionary.map(word => phraseTokens.includes(word) ? 1 : 0);
  return encodedPhrase
}
	
function buildWordDictionary (trainingData) {
  const tokenisedArray = trainingData.map(item => {
    const tokens = item.phrase.split(' ')
    return tokens.map(token => natural.PorterStemmer.stem(token))
  })
  
  const flattenedArray = [].concat.apply([], tokenisedArray)
  return flattenedArray.filter((item, pos, self) => self.indexOf(item) == pos)
}