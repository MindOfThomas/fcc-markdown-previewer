const React = require('react');
const ReactDOM = require('react-dom');
const marked = require('marked');

const renderer = require('./renderer');
const storage = require('./storage');

const defaultText = require('./default-text');

const PageList = require('./components/PageList');
const Editor = require('./components/Editor');
const Preview = require('./components/Preview');

class App extends React.Component {
  constructor(props) {
    super(props);

    let state = storage.load();
    if (!state) {
      state = {
        openPage: '', // id of currently open page
        pages: {},
      };
      storage.save(null, state);
    }

    this.state = state;

    this.marked = this.marked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addPage = this.addPage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.getId = this.getId.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.renamePage = this.renamePage.bind(this);
  }
  componentDidMount() {
    if (Object.keys(this.state.pages).length === 0) {
      this.addPage();
    }
  }

  marked(text) {
    return marked(text, { renderer: renderer });
  }

  handleChange(event) {
    const pageId = this.state.openPage;

    const newState = { pages: this.state.pages };
    const page = {
      title: this.state.pages[pageId].title,
      text: event.target.value,
      __html: this.marked(event.target.value),
    };
    newState.pages[pageId] = page;

    storage.save('pages', newState.pages);

    this.setState(newState);
  }

  getId() {
    let id = 'page' + Object.keys(this.state.pages).length;

    if (this.state.pages.hasOwnProperty(id)) {
      // get a different id
      id = this.getId();
    }

    return id;
  }

  addPage() {
    const pageName = 'Page ' + Object.keys(this.state.pages).length;
    const pageId = this.getId();

    // change the `openPage` to this new page
    const newState = {
      openPage: pageId,
      pages: this.state.pages,
    };
    newState.pages[pageId] = {
      title: pageName,
      text: defaultText,
      __html: this.marked(defaultText),
    };

    storage.save('openPage', pageId);
    storage.save('pages', newState.pages);

    this.setState(newState);
  }
  deletePage(pageId) {
    const pages = this.state.pages;
    delete pages[pageId];

    const newState = { pages };

    if (this.state.openPage === pageId) {
      // set the new openPage to first page
      newState.openPage = Object.keys(this.state.pages)[0];

      storage.save('openPage', newState.openPage);
    }

    storage.save('pages', newState.pages);

    this.setState(newState);
  }
  selectPage(pageId) {
    // early-return if page already open
    if (pageId === this.state.openPage) return;

    storage.save('openPage', pageId);

    this.setState({ openPage: pageId });
  }
  renamePage(pageId, newName) {
    const page = this.state.pages[this.state.openPage];

    // early-return if newName is same as old name or is blank
    if (newName.length === 0 || newName === page.title) return;

    const newState = { pages: this.state.pages };
    newState.pages[pageId] = Object.assign(page, {
      title: newName,
    });

    storage.save('pages', newState.pages);

    this.setState(newState);
  }

  render() {
    const openPage = this.state.pages[this.state.openPage];

    return (
      <div>
        <PageList
          openPage={this.state.openPage}
          pages={this.state.pages}
          onAdd={this.addPage}
          onDelete={this.deletePage}
          onSelect={this.selectPage}
          onRename={this.renamePage}
        />
        {!openPage &&
          <div>There aren't any pages.</div>
        }
        {openPage &&
          <div>
            <Editor
              text={openPage.text}
              onChange={this.handleChange}
            />
            <Preview
              html={openPage}
            />
          </div>
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
