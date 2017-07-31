const React = require('react');
const PropTypes = require('prop-types');

const RenameInput = require('./RenameInput');

class PageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
  }

  handleHover() {
    this.setState({ hovering: true });
  }
  handleHoverOut() {
    this.setState({ hovering: false });
  }

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
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHoverOut}
      >
        {this.state.hovering &&
          <div
            className='delete'
            onClick={() => this.props.onDeleteClick(this.props.id)}
          >
            X
          </div>
        }
        <a
          className='page-title'
          href='#'
          onClick={(event) => this.props.onTitleClick(this.props.id, event)}
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

  onDeleteClick: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

  renameState: PropTypes.string,
};

module.exports = PageItem;
