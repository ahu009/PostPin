import React from 'react';
import style from './Logo.scss';

/**
 * UI Component
 * @type {Class}
 */
class Logo extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
        <img className={style.logo} src={require('./../../../logo.png')} />
      </div>
    );
  }
}

export default Logo;
