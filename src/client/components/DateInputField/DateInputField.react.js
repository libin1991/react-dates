import React, { Component, PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import moment from '../moment';
import './DateInputField.less';

let propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onRef: PropTypes.func,
  value: PropTypes.object
};

let defaultProps = {
  className: '',
  dateFormat: 'dd/MM/yyyy',
  disabled: false,
  locale: 'en-GB',
  onChange: () => {},
  onError: () => {},
  onRef: () => {},
  value: null
};

export default
class DateInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.value ? moment(props.value.toISOString()).format(props.dateFormat) : ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value || this.props.dateFormat !== nextProps.dateFormat) {
      let inputValue = nextProps.value ? moment(nextProps.value.toISOString()).format(nextProps.dateFormat) : '';
      this.setState({ inputValue });
    }
  }

  clear() {
    this.setState({ inputValue: '' });
  }

  validate(dateString, dateFormat) {
    let momentDate = moment(dateString, dateFormat, true);
    let error = momentDate.isValid() ? null : momentDate.invalidAt();

    if (error !== null && dateString.length) {
      this.props.onError(error);
    } else {
      let value = !dateString.length ? null : momentDate.toDate();
      this.props.onChange(value);
    }
  }

  handleInputChange(event) {
    let inputValue = event.target.value;
    this.validate(inputValue, this.props.dateFormat);
    this.setState({ inputValue });
  }

  handleRef() {
    this.props.onRef(this);
  }

  render() {
    let {
      className,
      dateFormat,
      disabled,
      locale, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onError, // eslint-disable-line no-unused-vars
      onRef, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    let mask = dateFormat.replace(/[a-zA-Z]/g, '1');

    let {
      inputValue
    } = this.state;

    return (
      <MaskedInput
        ref={this.handleRef}
        className={`opuscapita_date-input-field form-control ${className}`}
        mask={mask}
        placeholderChar="‒"
        disabled={disabled}
        onChange={this.handleInputChange}
        placeholder={dateFormat}
        type="text"
        value={inputValue}
        {...restProps}
      />
    );
  }
}

DateInputField.propTypes = propTypes;
DateInputField.defaultProps = defaultProps;
