import React from 'react';
import style from './SignInPage.scss';
import { ReactTextField, validator  } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';
import { Redirect } from 'react-router';
import firebase from './../../firebase.js';

const emailValidator = [
    {
      message: 'Not an email',
      validator: value => {
        return value != "" ? validator.isEmail(value) : true
      },
    },
];

/**
 * UI Component
 * @type {Class}
 */
class SignInPage extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
   constructor (props) {
     super(props);
     this.state = {
       emailin: '',
       pwin: '',
       errorMessage: '',
       shouldSignIn: false,
       signInButton: true,
       signOutButton: false
     };
     //this.checkSubmit = this.checkSubmit.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
   }
   
   handleChange(e) {
     this.setState({
       [e.target.name]: e.target.value
     });
   }


    checkSubmit () {
      let canSubmit = document.querySelector('[class="ReactTextField-message ReactTextField--error"]') ? false : true;
      this.setState({ canSubmit: canSubmit });
      return canSubmit;
    }

    handleSubmit = (e) => {
      e.preventDefault();
      let em = document.querySelector('input[type="email"]').value;
      let pass = document.querySelector('input[type="password"]').value;
      firebase.auth().signInWithEmailAndPassword(em, pass).then((response) => {
        console.log(response);
        this.setState({shouldSignIn: true});
      })
      .catch((error) => {
        this.setState({errorMessage: error.message, shouldSignIn: false})
      });

    }


  render () {
    return (
      <div>
        <div className={style.fields}>
          <div>
            Email:
            <ReactTextField
              name="E-mail"
              type="email"
              placeholder="E-mail"
              onChange={this.handleChange}
              validators={emailValidator}
            />
          </div>

          <div>
            Password:
            <ReactTextField
              name="Password"
              type="password"
              onChange={this.handleChange}
              placeholder="Password"
            />
          </div>

          <div className={style.submit}>
            <Link to={"/some/where/AccountManagement"}>
              <div onClick={this.handleSubmit}>
                <Button
                  buttonText="Sign In"
                />
              </div>
            </Link>
          </div>
          {this.state.errorMessage != '' ? (<p className={style.error}> {this.state.errorMessage} </p>) : null}
          {this.state.shouldSignIn ? <Redirect push to="/some/where/AccountManagement" /> : null}
          </div>
          <div className={style.back}>
            <Link to="/some/where">
              <Button buttonText="Cancel" />
            </Link>
          </div>
        </div>

    );
  }
}

export default SignInPage;
