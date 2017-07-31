const React = require('react');
const PropTypes = require('prop-types');

class RenameInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.props.fitText) {
      this._input.size = this.props.value.length;
      this._input.focus();
      this._input.setSelectionRange(0, this.props.value.length);
    }
  }
  handleChange(event) {
    this.props.onChange(event);

    if (this.props.fitText) {
      // if value length is falsy (zero) then make the size 1
      this._input.size = event.target.value.length || 1;
    }
  }
  render() {
    return (
      <input
        type='text'
        onChange={this.handleChange}
        onBlur={this.props.onBlur}
        value={this.props.value}
        ref={(input) => { this._input = input; }}
      />
    )
  }
}
RenameInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  fitText: PropTypes.bool,
}

module.exports = RenameInput;
