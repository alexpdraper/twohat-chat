# Two Hat Chat

I have created a Node server with Express that reads the chat logs, runs them through a “Sentiment Intensity Analyzer”, and then displays the general sentiment of the chat over time on a line graph.

To run:

~~~bash
DEBUG=twohat:* npm start
~~~

## How to extend the project

There’s plenty more to be done. For one, I’m injecting all the data into inline scripts in the view (yuck). It would be neat to also explore some of the ideas I put below. In particular I think it would be interesting to see the sentiment scores organized by user.

## Ideas (from my thinking process)

- Sentiment analysis
  - Discover how positive/negative different users are
  - How does the sentiment change over time?
  - How does one message’s sentiment affect subsequent messages?
  - Does the introduction of a person sharing the opposite of the prevailing sentiment cause it to shift? Or does that person adopt the sentiment of the group?
  - Probably need more data for a lot of these ideas
- Find word sneaks
  - Use regular expressions to find variations on words/phrases
    ~~~javascript
    const expressions = [
      // Find any word that contains the target word
      // e.g. fart -> fhart
      new RegExp('(^|\s+)' + word.split('').join('\\S*') + '($|\s+)', 'i')
    ]
      // Find all words that are just one letter off
      // e.g. fart -> f*rt
      .concat(word.split('').map((_, index, arr) => {
        let result = arr.slice();
        result[index] = '\\S';
        return new RegExp(result.join(''), 'i');
      }));
    ~~~
