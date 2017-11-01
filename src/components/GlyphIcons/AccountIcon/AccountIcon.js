import React from 'react';
import { Glyphicon, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap-theme.css';
import style from './AccountIcon.scss';


/**
 * UI Component
 * @type {Class}
 */
class AccountIcon extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
      <Glyphicon glyph="user" />
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <MenuItem> Hello </MenuItem>
        </NavDropdown>
      </div>
    );
  }
}

export default AccountIcon;
