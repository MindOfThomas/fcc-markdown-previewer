const React = require('react');
const ReactDOM = require('react-dom');
const marked = require('marked');
const renderer = require('./renderer');

const defaultText = require('./default-text');
const Editor = require('./components/Editor');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: defaultText,
      __html: this.marked(defaultText),
    };

    this.marked = this.marked.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  marked(text) {
    return marked(text, {renderer: renderer});
  }
  handleChange(event) {
    this.setState({
      text: event.target.value,
      __html: this.marked(event.target.value),
    });
  }
  render() {
    return (
      <div>
        <Editor
          text={this.state.text}
          onChange={this.handleChange}
        />
        <div className='col-xs-12 col-md-6 well'
             id='Preview'
             dangerouslySetInnerHTML={this.state}>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
