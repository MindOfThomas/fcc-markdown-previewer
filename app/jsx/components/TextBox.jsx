const React = require('react');

const attributes = {
  id: 'TextBox'
};

const TextBox = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func
  },
  render: function() {
    return (
      <textarea value={this.props.text}
                onChange={this.props.handleChange}
                {...attributes}>
      </textarea>
    );
  }
});

module.exports = TextBox;
