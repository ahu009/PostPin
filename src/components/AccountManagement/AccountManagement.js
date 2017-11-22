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
      accountInformation: {email: '', phone: '', password: ''},
      userPosts: []
    };

  }
  componentDidMount () {
    // Populat accountInformation here
    let temparr = new Array()
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        console.log("user exists")
        console.log(user.email)
        var pass = firebase.database().ref('users/' + user.uid);
        pass.on('value', function(snapshot){
          var useremail = snapshot.val().Email;
          var newpass = snapshot.val().Password;
          var phones = snapshot.val().Phone;
          var numpost = snapshot.val().Posts;
          that.setState({accountInformation: {email: useremail, phone: phones, password: newpass}});
          var j = numpost;

          if(numpost != 0)
          {
            for (var i = 1; j = numpost, i <= j; ++i)
            {
              var dir = firebase.database().ref('users/' + user.uid + '/posts/' + i);
              dir.once('value', function(snapshot){
                const posting = {
                  title: snapshot.val().title,
                  des: snapshot.val().description,
                  price: snapshot.val().price,
                  tags: snapshot.val().tag,
                  postID: snapshot.val().PostID,
                  numPics: snapshot.val().numPics,
                  posterID: snapshot.val().posterID,
              }
                console.log("pushing post");
                temparr.push(posting);
                that.setState({userPosts: temparr})
              });
            }
          }
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
