const React = require('react');

class PageList extends React.Component {
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
            href='#'
            onClick={(event) => { this.props.onSelect(pageId); event.preventDefault(); }}
          >
            {page.title}
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
            onClick={(event) => { this.props.onAdd(); event.preventDefault(); }}
          >
            +
          </a>
        </li>
      </ul>
    );
  }
}

module.exports = PageList;
