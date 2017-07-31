const React = require('react');

class Preview extends React.Component {
  render() {
    return (
      <div className='col-xs-12 col-md-6 well'
           id='Preview'
           dangerouslySetInnerHTML={this.props.html}>
      </div>
    );
  }
}

module.exports = Preview;
