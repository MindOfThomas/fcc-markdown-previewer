const React = require('react');
const ReactDOM = require('react-dom');

const TextBox = require('./components/TextBox.jsx');
const PreviewBox = require('./components/PreviewBox.jsx');

const defaultText = require('./lib/default-text.js');
const parse = require('./lib/parse.jsx');

const App = React.createClass({
  getInitialState: function() {
    return {
      text: defaultText,
      elements: parse(defaultText)
    };
  },
  handleChange: function(event) {
    this.setState({
      text: event.target.value,
      elements: parse(event.target.value)
    });
  },
  render: function() {
    return (
      <div>
        <TextBox text={this.state.text} handleChange={this.handleChange} />
        <PreviewBox elements={this.state.elements} />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
