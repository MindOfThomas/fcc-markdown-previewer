const React = require('react');

class PageList extends React.Component {
  render() {
    let list = [];
    for (let pageId in this.props.pages) {
      const page = this.props.pages[pageId];

      if (typeof page !== 'object') continue;

      list.push(
        <button
          key={pageId}
          type='button'
          className='btn btn-default'
          onClick={() => this.props.onSelect(pageId)}
        >
          {page.title}
        </button>
      );
    }

    return (
      <div>
        {list}

        <button
          type='button'
          className='btn btn-default'
          title='Add a page'
          onClick={this.props.onAdd}
        >
          +
        </button>
      </div>
    );
  }
}

module.exports = PageList;
