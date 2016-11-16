const React = require('react');

const Text = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },
  render: function() {
    return <span>{this.props.text}</span>
  }
});

module.exports = Text;
