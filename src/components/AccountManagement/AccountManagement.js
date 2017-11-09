import React from 'react';
import style from './AccountManagement.scss';
import Button from './../Button';
import { Link } from 'react-router-dom';
import Category from './Category';
import firebase from './../../firebase.js';



/**
 * UI Component
 * @type {Class}
 */
class AccountManagement extends React.Component {

  constructor() {
    super();

    this.state = {
      accountInformation: {email: 'temp@temp.com', phone: '4086911969', password: 'Password'},
      userPosts: null
    };
  }
  componentWillMount () {
    // Populat accountInformation here
    //emil =
    //phone =
    // var user = firebase.auth().currentUser;
    // this.state.email = user.email;
    // this.state.password = user.password;
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("user exists")
        console.log(user.email)
        console.log(user.password)
        that.setState({accountInformation: {email: user.email, password: user.password}});
      } else {
        console.log("user does not exists")
      }
    });
  }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {

    return (
      <div className={style.container}>
        <div className={style.info}>
          <Category name="Account Information" info={this.state.accountInformation} />
        </div>
        <div className={style.posts}>
          <Category name="Your Posts" info={this.state.accountInformation} />
        </div>
      </div>
    );
  }
}

export default AccountManagement;
