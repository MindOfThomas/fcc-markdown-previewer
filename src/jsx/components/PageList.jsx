const React = require('react');

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
    this._renameInput.size = event.target.value.length;
    this.setState({
      renamingState: event.target.value,
    });
  }

  handleAddClick(event) {
    this.props.onAdd();
    event.preventDefault();
  }
  handleSelectClick(pageId, event) {
    if (this.props.pages.openPage === pageId) {
      // clicked on already-selected page, start renaming
      this.setState({
        renaming: true,
        renamingId: pageId,
        renamingState: this.props.pages[pageId].title,
      }, () => {
        this._renameInput.size = this.state.renamingState.length;
        this._renameInput.focus();
        this._renameInput.setSelectionRange(0, this._renameInput.value.length);
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

      const pageClass = pageId === this.props.pages.openPage ? 'active' : '';

      list.push(
        <li
          key={pageId}
          className={pageClass}
        >
          <a
            className='page-title'
            href='#'
            onClick={this.handleSelectClick.bind(this, pageId)}
          >
            {!this.state.renaming &&
              page.title
            }

            {this.state.renaming && this.state.renamingId === pageId &&
              <input
                type='text'
                onChange={this.handleRenameChange}
                onBlur={this.handleRenameBlur}
                value={this.state.renamingState}
                ref={(input) => { this._renameInput = input; }}
              />
            }
          </a>
        </li>
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
