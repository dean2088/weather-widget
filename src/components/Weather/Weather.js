import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';
import Input from 'components/Input/Input';
import Radio from 'components/Radio/Radio';
import WeatherCard from 'components/WeatherCard/WeatherCard';

export default class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    temperature: PropTypes.string,
    wind: PropTypes.string,
    radios: PropTypes.array,
    onTempChange: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    temperature: '',
    wind: '',
    radios: [{
      label: 'Temperature',
      id: 'temperature',
      list: [{
        value: 'metric',
        label: '°C',
      }, {
        value: 'imperial',
        label: '°F'
      }],
    }, {
      label: 'Wind',
      id: 'wind',
      list: [{
        value: 'on',
        label: 'On',
      }, {
        value: 'off',
        label: 'Off'
      }],
    }]
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isWindVisible: true
    };
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.currentTarget.value
    });
  };

  handleRadioChange = (update) => {
    if (update.id === 'wind') {
      this.setState({
        isWindVisible: !this.state.isWindVisible
      });
    }

    if (update.id === 'temperature' && this.props.onTempChange) {
      this.props.onTempChange(update.value);
    }
  };

  render() {
    const {
      radios,
      location,
      temperature,
      wind
    } = this.props;

    const {
      title,
      isWindVisible
    } = this.state;

    return (
      <div className={styles.weather}>
        <div className={styles.inputs}>
          <Input id="title" placeholder="Title of widget" value={title} onChange={this.handleTitleChange} label="Title" />
          {radios.map(item => (<Radio key={item.id} {...item} onChange={this.handleRadioChange} />))}
        </div>
        <div className={styles.line} />
        <WeatherCard
          title={title}
          location={location}
          wind={isWindVisible && wind}
          temperature={temperature}
        />
      </div>
    );
  }
}
