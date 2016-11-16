const React = require('react');

const Components = require('../components');

function parse(text) {
  let regex = {
    strong: /(?:\*\*([\w\d\s]+)\*\*)|(?:__([\w\d\s]+)__)/,
    emphasize: /(?:\*([\w\d\s]+)\*)|(?:_([\w\d\s]+)_)/
  };

  let array = [];

  while (true) {
    let matches = [
      text.match(regex.strong),
      text.match(regex.emphasize)
    ];

    // TODO render text even if there are no more matches
    // remember type of match for later when creating elements
    if (!matches[0] && !matches[1]) {
      if (array.length === 0) {
        array.push(text);
      }
      break;
    }
    if (matches[0]) {
      matches[0].type = 'Strong';
    }
    if (matches[1]) {
      matches[1].type = 'Emphasize';
    }

    matches = matches.filter(function(match) {
      return match !== null;
    });

    if (matches.length > 1) {
      matches.sort(function(a, b) {
        return a.index - b.index;
      });
    }

    matches.forEach(function(match, arr, i) {
      // take plaintext to left of match, push to array
      array.push(text.substring(0, match.index));
      // remove plaintext for next loop
      text = text.substring(match.index);

      // convert match to element, push to array
      let ElementType = Components[match.type];
      let element = <ElementType text={match[1] || match[2]} />;
      array.push(element);
      // remove plaintext element for next loop
      text = text.substring(match[0].length);
    });
  }

  array = array.map(function(element, i) {
    if (typeof element === 'string') {
      // convert plaintext into Text element
      return <Components.Text key={i} text={element} />;
    } else {
      // element.props.key = i;
      // console.log(element);
      // clone element to add key to props
      return React.cloneElement(element, {key: i});
    }
  });

  return array;
}

module.exports = parse;
