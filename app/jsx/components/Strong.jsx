const React = require('react');

const Strong = React.createClass({
  render: function() {
    return <strong>{this.props.text}</strong>;
  }
});

module.exports = Strong;
