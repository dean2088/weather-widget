import React, { Fragment } from 'react';
import styles from './style.less';
import cloudImage from 'sources/images/day-clear.png';

const WeatherCard = ({
  title = 'Title fo widget',
  temperature = '26°',
  wind = null,
  location = 'Sydney'
}) => {
  return (
    <div className={styles.WeatherCard}>
      <h3>{title === '' ? 'Title fo widget' : title}</h3>
      <div className={styles.content}>
        <div>
          <img src={cloudImage} alt="cloud" />
        </div>
        <div className={styles.info}>
          <div className={styles.location}>{location}</div>
          <div className={styles.temperature}>{temperature}</div>
          <div className={styles.wind}>{wind && <Fragment><b>Wind</b>{wind}</Fragment>}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
