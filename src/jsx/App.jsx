const React = require('react');
const ReactDOM = require('react-dom');
const marked = require('marked');
const renderer = require('./renderer');

const defaultText = require('./default-text');

const PageList = require('./components/PageList');
const Editor = require('./components/Editor');
const Preview = require('./components/Preview');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openPage: '', // id of current open page
    };

    this.marked = this.marked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addPage = this.addPage.bind(this);
    this.getId = this.getId.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }
  componentDidMount() {
    this.addPage();
  }

  marked(text) {
    return marked(text, { renderer: renderer });
  }

  handleChange(event) {
    const page = this.state[this.state.openPage];

    const newState = {};
    newState[this.state.openPage] = {
      title: page.title,
      text: event.target.value,
      __html: this.marked(event.target.value),
    };

    this.setState(newState);
  }

  getId() {
    let id = 'page' + (Object.keys(this.state).length - 1);

    if (this.state.hasOwnProperty(id)) {
      // get a different id
      id = this.getId();
    }

    return id;
  }

  addPage(event) {
    const pageName = 'Page ' + Object.keys(this.state).length;
    const pageId = this.getId();

    // change the `openPage` to this new page
    const newState = {
      openPage: pageId,
    };
    newState[pageId] = {
      title: pageName,
      text: defaultText,
      __html: this.marked(defaultText),
    };


    this.setState(newState);
  }
  selectPage(pageId) {
    // early-return if page already open
    if (pageId === this.state.openPage) return;

    this.setState({ openPage: pageId });
  }

  render() {
    const openPage = this.state[this.state.openPage];

    if (!openPage) {
      // there are no pages
      return <div>no pages</div>;
    }

    return (
      <div>
        <PageList
          pages={this.state}
          onAdd={this.addPage}
          onSelect={this.selectPage}
        />
        <Editor
          text={openPage.text}
          onChange={this.handleChange}
        />
        <Preview
          html={openPage}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
