const React = require('react');
const markdown = require('markdown').markdown;

const Components = require('../components');

function parse(text) {
  //TODO needs to be recursive: go through an array and make an element with necessary nested elements
  let mdElements = markdown.parse(text);
  let elements = [];
  console.log(mdElements);

  for(let i = 1, key = 0; i < mdElements.length; i++, key++) {
    switch(mdElements[i][0]) {
      case 'para': {
        elements.push(<Components.Text key={key} text={mdElements[i][1]} />);
      }
    }
  }

  return elements;
}

module.exports = parse;
