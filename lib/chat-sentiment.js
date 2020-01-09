const { SentimentIntensityAnalyzer } = require('vader-sentiment');
const data = require('./chat.json')
  .map(({ text }) => SentimentIntensityAnalyzer.polarity_scores(text))
  // TODO: Some of the data comes back zeros on everything.
  // We could maybe be more successful if we fixed some spelling
  // before feeding the text into the Sentiment Intensity Analyzer.
  // For now we just filter those out.
  .filter(({ pos, neg, neu, compound }) =>
    pos !== 0 || neg !== 0 || neu !== 0 || compound !== 0);

module.exports = (() => {
  const scoreKeys = ['neg', 'neu', 'pos', 'compound'];
  const result = scoreKeys.reduce((obj, key) => {
    obj[key] = [];
    return obj;
  }, {});

  // For the sake of avoiding something unwieldy we’re going to
  // bring our data down to ~100 points (putting 6,000 points on a line chart
  // doesn’t work out well).
  const chunkSize = Math.max(1, Math.floor(data.length / 100));
  while (data.length) {
    const chunk = data.splice(0, chunkSize);
    const scores = chunk.reduce((totals, score) => {
      scoreKeys.forEach(key => totals[key] += score[key]);
      return totals;
    }, { neg: 0, neu: 0, pos: 0, compound: 0 });
    scoreKeys.forEach(key => result[key].push(scores[key] / chunk.length));
  }
  return result;
})();
