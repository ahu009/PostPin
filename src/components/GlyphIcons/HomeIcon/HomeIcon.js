import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap-theme.css';
import style from './HomeIcon.scss';


/**
 * UI Component
 * @type {Class}
 */
class HomeIcon extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
        <Link to="/">
          <Glyphicon glyph="home" style={{color:'#393a3d'}}/>
        </Link>
      </div>
    );
  }
}

export default HomeIcon;
