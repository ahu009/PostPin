import React from 'react';

import style from './App.scss';
import UIComponent from './../UIComponent';
import StartPage from './../StartPage';

/**
 * App Component
 * @type {Class}
 */
export default class App extends React.Component {
  /**
   * Render function for App Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
        <StartPage />
      </div>
    );
  }
}
