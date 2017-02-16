const React = require('react');
const ReactDOM = require('react-dom');
const marked = require('marked');
let renderer = require('./renderer.js')

const defaultText = require('./default-text.js');

const App = React.createClass({
  marked: function(text) {
    return marked(text, {renderer: renderer});
  },
  getInitialState: function() {
    return {
      text: defaultText,
      __html: this.marked(defaultText)
    };
  },
  handleChange: function(event) {
    this.setState({
      text: event.target.value,
      __html: this.marked(event.target.value)
    });
  },
  render: function() {
    return (
      <div className='container-fluid'>
        <textarea className='col-xs-12 col-md-6 col-lg-5'
                  id='TextBox'
                  value={this.state.text}
                  onChange={this.handleChange}>
        </textarea>
        <div className='col-xs-12 col-md-6 col-lg-5 col-lg-offset-1 well'
             id='PreviewBox'
             dangerouslySetInnerHTML={this.state}>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
