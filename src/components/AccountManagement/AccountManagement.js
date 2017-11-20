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

    this.rerender = this.rerender.bind(this);
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
        console.log(user.password)
        var pass = firebase.database().ref('users/' + user.uid);
        pass.on('value', function(snapshot){
          var useremail = snapshot.val().Email;
          var newpass = snapshot.val().Password;
          var phones = snapshot.val().Phone;
          var numpost = snapshot.val().Posts;
          console.log("newpass: " + newpass);
          console.log("Phone: " + phones);
          console.log("Possts: " + numpost)
          that.setState({accountInformation: {email: useremail, phone: phones, password: newpass}});
          var j = numpost;
          console.log("j: " + j)

          if(numpost != 0)
          {
            for (var i = 1; j = numpost, i <= j; ++i)
            {
              console.log("i inside loop: " + i)
              var dir = firebase.database().ref('users/' + user.uid + '/posts/' + i);
              dir.once('value', function(snapshot){
                var _title = snapshot.val().title;
                var _des = snapshot.val().description;
                var _price = snapshot.val().price;
                var _tags = snapshot.val().tags;
                temparr.push(_title);
                that.setState({userPosts: temparr})
                console.log(_title)
              });
            }
          }
        });
      } else {
        console.log("user does not exists")
      }
    });
  }

  rerender () {
    this.forceUpdate();
  }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {

    return (
      <div className={style.container}>
        <div className={style.info}>
          <Category name="Account Information" info={this.state.accountInformation} rerenderParent={this.rerender}/>
        </div>
        <div className={style.posts}>
          <Category name="Your Posts" info={this.state.userPosts} />
        </div>
      </div>
    );
  }
}

export default AccountManagement;
