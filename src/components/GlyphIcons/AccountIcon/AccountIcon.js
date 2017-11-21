import React from 'react';
import { Glyphicon, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

import style from './AccountIcon.scss';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Dropdown.css';
import firebase from './../../../firebase.js';
import ACCOUNT_AUTH from './../../../public/account';

/**
 * UI Component
 * @type {Class}
 */
class AccountIcon extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isUserSignedIn: false
    }

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.userSignedIn = this.userSignedIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  handleLinkClick () {
    this.refs.dropdown.hide();
  }

  signOut () {
    this.refs.dropdown.hide();
    firebase.auth().signOut();
  }

  userSignedIn () {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({isUserSignedIn: true});
        ACCOUNT_AUTH.status = "SIGNED_IN";
      } else {
       this.setState({isUserSignedIn: false});
       ACCOUNT_AUTH.status = "SIGNED_OUT";
     }
    });
  }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (

      <div className={style.container} onClick={this.userSignedIn}>
        {this.state.isUserSignedIn
          ?  (<Dropdown className="account-dropdown" ref="dropdown">
          <DropdownTrigger>
            <Glyphicon glyph="user" style={{color:'#393a3d'}} />
                <div className="arrow"><Glyphicon glyph="chevron-down" style={{color:'#393a3d'}} /></div>
          </DropdownTrigger>
          <DropdownContent>
            <ul className="account-dropdown__quick-links account-dropdown__segment">
              <li className="account-dropdown__link">
                <Glyphicon glyph="plus" style={{fontSize:'14px', display:'inline', paddingRight: '5px', color: '#393a3d'}}/>
                <Link to ="/some/where/AccountManagement">
                    <div className="text" onClick={this.handleLinkClick}> My Account </div>
                  </Link>
              </li>
              <li className="account-dropdown__link">
                <Glyphicon glyph="log-in" style={{fontSize:'14px', display:'inline', paddingRight: '5px', marginLeft: '-37px',
                  paddingRight: '27px'}}/>
                  <Link to = "/accounts/sign-in/">
                    <div className="text" onClick={this.signOut}>Sign Out </div>
                  </Link>
              </li>
            </ul>
          </DropdownContent>
        </Dropdown>)
          : (<Dropdown className="account-dropdown" ref="dropdown">
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
        </Dropdown>)}
      </div>
    );
  }
}

export default AccountIcon;
