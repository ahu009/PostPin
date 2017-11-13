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
        console.log(user);
        console.log("user exists")
        console.log(user.email)
        console.log(user.password)
        var pass = firebase.database().ref('users/' + user.uid);
        pass.on('value', function(snapshot){
          var useremail = snapshot.val().Email;
          var newpass = snapshot.val().Password;
          var phones = snapshot.val().Phone;
          console.log("newpass: " + newpass);
          console.log("Phone: " + phones);
          that.setState({accountInformation: {email: useremail, phone: phones, password: newpass}});
        });
        var posts = firebase.database().ref('users/' + user.uid + '/posts');
        posts.on('value', function(snapshot){
          var theposts = snapshot.val().title;
          console.log("posts title: " + theposts);
          that.setState({userPosts: theposts});
        });


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
          <Category name="Your Posts" info={this.state.userPosts} />
        </div>
      </div>
    );
  }
}

export default AccountManagement;
