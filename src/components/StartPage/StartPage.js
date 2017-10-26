import React from 'react';
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
        <div className={style.text}> What Scasdfool Do You Attend?
          <Dropdown />
        </div>
      </div>

    );
  }
}

export default StartPage;
