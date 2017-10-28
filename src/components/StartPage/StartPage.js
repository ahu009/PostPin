import React from 'react';
import { Link } from 'react-router-dom';

import style from './StartPage.scss';
import Dropdown from './Dropdown';

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
        <div className={style.text}> What School Do You Attend?
          <Dropdown />
        </div>
        <div className={style.accounts}>
          <Link to="/create-account">
            <p className={style.create}> Create Account </p>
          </Link>
          <Link to="/sign-in">
            <p className={style.signin}> Sign In </p>
          </Link>
        </div>
      </div>

    );
  }
}

export default StartPage;
