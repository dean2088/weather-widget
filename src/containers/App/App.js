import React from 'react';
import styles from './style.less';

export default class App extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div id="container" className={styles.container}>
        {children}
      </div>
    );
  }
}