const React = require('react');

class Editor extends React.Component {
  render() {
    return (
      <textarea className='col-xs-12 col-md-6'
                id='Editor'
                value={this.props.text}
                onChange={this.props.onChange}>
      </textarea>
    );
  }
}

module.exports = Editor;
