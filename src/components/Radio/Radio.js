import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

export default class Radio extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    list: PropTypes.array
  };

  static defaultProps = {
    label: 'Wind',
    id: 'wind',
    list: [{
      value: 'on',
      label: 'On',
    }, {
      value: 'off',
      label: 'Off'
    }],
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.list[0].value
    };
  }

  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange({
        id: this.props.id,
        value: e.currentTarget.value
      });
    }
    this.setState({
      value: e.currentTarget.value
    });
  };

  render() {
    const {
      list,
      label,
      id,
    } = this.props;
    const { value } = this.state;

    return (
      <div className={styles.radio}>
        <label>{label}</label>
        <div>
          {list.map(item => (
            <div key={item.value}>
              <input type="radio" id={item.value} name={id} value={item.value} checked={value === item.value} onChange={this.handleChange} />
              <label htmlFor={item.value}>{item.label}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
