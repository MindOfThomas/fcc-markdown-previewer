const React = require('react');

const attributes = {
  id: 'PreviewBox'
};

const PreviewBox = React.createClass({
  propTypes: {
    elements: React.PropTypes.array
  },
  render: function() {
    if (this.props.elements) {
      return <div {...attributes}>{this.props.elements}</div>;
    } else {
      return <h1 {...attributes}>PreviewBox</h1>;
    }
  }
});

module.exports = PreviewBox;
