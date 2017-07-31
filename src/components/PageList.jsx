const React = require('react');

const PageItem = require('./PageItem');

class PageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renaming: false,
      renamingId: null, // id of page to rename (if this.state.renaming)
      renamingState: '', // current value of rename input (if this.state.renaming)
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);

    this.handleRenameBlur = this.handleRenameBlur.bind(this);
    this.handleRenameChange = this.handleRenameChange.bind(this);
  }
  handleRenameBlur() {
    this.props.onRename(this.state.renamingId, this.state.renamingState);
    this.setState({
      renaming: false,
    });
  }
  handleRenameChange(event) {
    this.setState({
      renamingState: event.target.value,
    });
  }

  handleAddClick(event) {
    this.props.onAdd();
    event.preventDefault();
  }
  handleSelectClick(pageId, event) {
    if (this.props.openPage === pageId) {
      // clicked on already-selected page, start renaming
      this.setState({
        renaming: true,
        renamingId: pageId,
        renamingState: this.props.pages[pageId].title,
      });

      return;
    }

    this.props.onSelect(pageId);
    event.preventDefault();
  }

  render() {
    let list = [];
    for (let pageId in this.props.pages) {
      const page = this.props.pages[pageId];

      if (typeof page !== 'object') continue;

      const isRenaming = this.state.renaming && pageId === this.state.renamingId;
      const isOpen = pageId === this.props.openPage;

      const pageClass = isOpen ? 'active' : '';

      list.push(
        <PageItem
          key={pageId}
          renaming={isRenaming}
          title={page.title}
          id={pageId}
          className={pageClass}
          onClick={this.handleSelectClick}
          onChange={this.handleRenameChange}
          onBlur={this.handleRenameBlur}
          renameState={isRenaming ? this.state.renamingState : null}
        />
      );
    }

    return (
      <ul className='nav nav-tabs'>
        {list}

        <li>
          <a
            title='Add a page'
            href='#'
            onClick={this.handleAddClick}
          >
            +
          </a>
        </li>
      </ul>
    );
  }
}

module.exports = PageList;
