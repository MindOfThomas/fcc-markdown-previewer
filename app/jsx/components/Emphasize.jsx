const React = require('react');

const Emphasize = React.createClass({
  propTypes: {
    text: React.PropTypes.string
  },
  render: function() {
    return <em>{this.props.text}</em>;
  }
});

module.exports = Emphasize;
