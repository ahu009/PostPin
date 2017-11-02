import React from 'react';
import style from './Logo.scss';

import { Link } from 'react-router-dom';

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
        <Link to={"/"}>
          <img className={style.logo} src={require('./../../../logo.png')} />
        </Link>
      </div>
    );
  }
}

export default Logo;
