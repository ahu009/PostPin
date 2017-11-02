import React from 'react';
import { Link } from 'react-router-dom';

import style from './StartPage.scss';
import Dropdown from './Dropdown';
import { Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-theme.css';

/**
 * UI Component
 * @type {Class}
 */5
class StartPage extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
        <div>
          <img className={style.logo} src={require('./../../../logo.png')} />
        </div>
        <div className={style.text}> What School Do You Attend?
          <Dropdown />
        </div>
      </div>

    );
  }
}

export default StartPage;
