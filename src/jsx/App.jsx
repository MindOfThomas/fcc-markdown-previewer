const React = require('react');
const ReactDOM = require('react-dom');
const marked = require('marked');
const renderer = require('./renderer');

const defaultText = require('./default-text');
const Editor = require('./components/Editor');
const Preview = require('./components/Preview');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: defaultText,
      html: {
        __html: this.marked(defaultText),
      },
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
      html: {
        __html: this.marked(event.target.value),
      },
    });
  }
  render() {
    return (
      <div>
        <Editor
          text={this.state.text}
          onChange={this.handleChange}
        />
        <Preview
          html={this.state.html}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
