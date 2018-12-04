import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';
import { connect } from 'react-redux';
import { bindActions } from 'helpers/bindDispatch';
import Weather from 'components/Weather/Weather';

//redux
import {
  load,
} from 'redux/modules/me';

@connect(state => ({
  weather: state.me.result,
}), bindActions({
  load
}))
export default class Home extends React.Component {
  static propTypes = {
    load: PropTypes.func,
    apiKey: PropTypes.string,
  };

  static defaultProps = {
    apiKey: '211d07203f984c5075bb09b01f92c97d'
  };

  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      units: 'metric'
    };
  }

  componentWillMount() {
    this.handleGetWeather('metric');
  }

  handleGetWeather = (units = 'metric') => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          appid: this.props.apiKey,
          units
        };
        this.props.load(pos);
      }, (err) => {
        console.error('err');
      });
    } else {
      // Browser doesn't support Geolocation
      console.error('Browser doesn\'t support Geolocation');
    }
  };

  handleTempChange = (units) => {
    this.handleGetWeather(units);
    this.setState({ units });
  };

  render() {
    const { weather } = this.props;
    const { units } = this.state;

    return (
      <div className={styles.content}>
        {weather && <Weather
          location={weather.name}
          wind={`${weather.wind.speed}${units === 'metric' ? 'm/s' : 'mi/h'}`}
          temperature={parseInt(weather.main.temp) + '°'}
          onTempChange={this.handleTempChange}
        />}
      </div>
    );
  }
}
