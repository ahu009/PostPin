import React from 'react';
import { Glyphicon, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

import style from './AccountIcon.scss';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Dropdown.css';

/**
 * UI Component
 * @type {Class}
 */
class AccountIcon extends React.Component {
  constructor (props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick () {
    this.refs.dropdown.hide();
  }
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
      <Dropdown className="account-dropdown" ref="dropdown">
        <DropdownTrigger>
          <Glyphicon glyph="user" style={{color:'#393a3d'}} />
              <div className="arrow"><Glyphicon glyph="chevron-down" style={{color:'#393a3d'}} /></div>
        </DropdownTrigger>
        <DropdownContent>
          <ul className="account-dropdown__quick-links account-dropdown__segment">
            <li className="account-dropdown__link">
              <Glyphicon glyph="plus" style={{fontSize:'14px', display:'inline', paddingRight: '5px', color: '#393a3d'}}/>
              <Link to ="/accounts/create-account">
                  <div className="text" onClick={this.handleLinkClick}> Create Account </div>
                </Link>
            </li>
            <li className="account-dropdown__link">
              <Glyphicon glyph="log-in" style={{fontSize:'14px', display:'inline', paddingRight: '5px', marginLeft: '-37px',
                paddingRight: '27px'}}/>
                <Link to = "/accounts/sign-in/">
                  <div className="text" onClick={this.handleLinkClick}> Sign In </div>
                </Link>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
      </div>
    );
  }
}

export default AccountIcon;
