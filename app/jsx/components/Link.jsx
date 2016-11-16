const React = require('react');

const Link = React.createClass({
  propType: {
    href: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    title: React.PropTypes.string
  },
  render: function() {
    return (
      <a href={this.props.href}
         title={this.props.title}>
        {this.props.text}
      </a>
    );
  }
});
