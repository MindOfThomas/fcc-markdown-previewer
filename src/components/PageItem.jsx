const React = require('react');
const PropTypes = require('prop-types');

const RenameInput = require('./RenameInput');

class PageItem extends React.Component {
  render() {
    let titleEl;
    if (!this.props.renaming) {
      titleEl = this.props.title;
    } else {
      titleEl = (
        <RenameInput
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          value={this.props.renameState}
          fitText
        />
      );
    }

    return (
      <li
        key={this.props.id}
        className={this.props.className}
      >
        <a
          className='page-title'
          href='#'
          onClick={() => this.props.onClick(this.props.id)}
        >
          {titleEl}
        </a>
      </li>
    );
  }
}
PageItem.propTypes = {
  renaming: PropTypes.bool.isRequired, // whether this item is being renamed
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

  renameState: PropTypes.string,
};

module.exports = PageItem;
