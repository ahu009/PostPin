import React from 'react';
import style from './CreateAccountPage.scss';
import { ReactTextField, validator } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';
import { Redirect } from 'react-router';
import firebase from './../../firebase.js';

const alphaNumericValidator = [
    {
      message: 'Not a phone number',
      validator: value => {
        if (value === "")
          return true;
        let numOnly = parseInt(value.replace(/[^0-9\.]/g, ''), 10);
        numOnly = numOnly.toString();
        if(numOnly.length > 6 && numOnly.length < 12)
          return true;

        return false;
      },
    },
    {
      message: '*Required',
      validator: value => {
        return value != '' ? true : false
      },
    },
];

const emailValidator = [
    {
      message: 'Not an email',
      validator: value => {
        return value != "" ? validator.isEmail(value) : true
      },
    },
    {
      message: '*Required',
      validator: value => {
        return value != '' ? true : false
      },
    },
];

const style1 = {
  container: {
    textAlign: 'left',
  },
  input: {

  },
  successMessage: {
    fontSize: '20px',
    color: '#3949AB',
  },
  errorMessage: {
    fontSize: '20px',
    color: '#E91E63',
  },
};


/**
 * UI Component
 * @type {Class}
 */
class CreateAccountPage extends React.Component {
  /**
   * Constructor for UI Component
   * @param  {Object} props  Props passed to this class
   * @return {void}
   */
  constructor (props) {
    super(props);
    this.state = {
      canSubmit: true,
      showConfirm: false,
      emailin: '',
      pwin: '',
      passwordsMatch: true,
      shouldCreateAccount: null,
      showError: null,
      shouldCreateAccountFirebase: null,
      firebaseErrorMessage: ''
    };
    this.checkSubmit = this.checkSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.checkShowError = this.checkShowError.bind(this);
  }

  validatePassword () {
    let password = document.querySelector('[name="Password"]').value;
    let confirm = document.querySelector('[name="Confirm Password"]') ? document.querySelector('[name="Confirm Password"]').value : '';
    if(confirm != password)
      this.setState({passwordsMatch: false})
    else
      this.setState({passwordsMatch: true})
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.checkShowError();
  }

  checkShowError() {
    if (document.querySelector('span[class="ReactTextField-message ReactTextField--error"]')
    || document.querySelector('p[id="Error"]')) {
      this.setState({showError: true});
    } else {
      this.setState({showError: false});
    }
  }


   checkSubmit () {
     if (document.querySelector('span[class="ReactTextField-message ReactTextField--error"]')
     || document.querySelector('p[id="error"]')) {
       this.setState({shouldCreateAccount: false})
       return false;
     } else {
       this.setState({shouldCreateAccount: true})
       return true;
     }
   }

   handleSubmit(e) {
     e.preventDefault();
     let em = document.querySelector('input[type="email"]').value;
     let pass = document.querySelector('input[type="password"]').value;
     let phone = document.querySelector('input[type="tel"]').value;

     console.log(em);
     console.log(pass);
     let firebaseAuth = this.checkSubmit();
     if(firebaseAuth) {
       firebase.auth().createUserWithEmailAndPassword(em, pass).then((response) => {
         this.setState({shouldCreateAccountFirebase: true, firebaseErrorMessage: ''});


         var euser = firebase.auth().currentUser;

         euser.sendEmailVerification().then(function() {
           // Email sent.
           console.log("account created for: " + euser.email);
         }).catch(function(error) {
           // An error happened.
           console.log("cannot send eamil creation");
         });

         let user = firebase.auth().currentUser;
         if (user) {
           const account = firebase.database().ref("users").child(user.uid);
           account.set({
             Email: em,
             Id: user.uid,
             Password: pass,
             Phone: phone,
             Posts: 0
           });
         } else {
           console.log("user does not exists")
         }
      })//done delete
       .catch((error) => {
         console.log(error.message);
         this.setState({shouldCreateAccountFirebase: false, firebaseErrorMessage: error.message});
       });
     }

     this.setState({
       emailin: document.querySelector('input[type="email"]').value,
       pwin: document.querySelector('input[type="password"]').value,
       phonein: document.querySelector('input[type="password"]').value,
     });
   }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    const showConfirm = [
      {
        message: '*Required',
        validator: value => {
          return value != '' ? true : false
        },
      },
        {
          message: '',
          validator: value => {
             value != '' ? this.setState({showConfirm: true}) : this.setState({showConfirm: false})
             return true;
          }
        },
    ];

    return (
      <div>
        <div className={style.fields}>
          <div>
            <p className={style.fieldName}> Email: </p>
            <ReactTextField
              name="E-mail"
              type="email"
              placeholder="E-mail"
              onChange={this.handleChange}
              value = {this.state.emailin}
              validators={emailValidator}
            />
          </div>

          <div>
            <p className={style.fieldName}> PhoneNumber: </p>
            <ReactTextField
              name="Phone Number"
              type="tel"
              placeholder="Phone Number"
              onChange={this.handleChange}
              value = {this.state.phonein}
              validators={alphaNumericValidator}
            />
          </div>

          <div>
            <p className={style.fieldName}> Password: </p>
            <ReactTextField
              name="Password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value = {this.state.pwin}
              validators={showConfirm}
              afterValidate={this.validatePassword}
            />
          </div>
          {this.state.showConfirm ?
          <div>
            <p className={style.fieldName}> Confirm Password: </p>
            <ReactTextField
              name="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              afterValidate={this.validatePassword}
            />
            {this.state.passwordsMatch ? null : (<p id="error" className={style.error}> Passwords Must Match </p>)}
          </div>
          : null}
          </div>

          <div className={style.back}>
            <Link to="/">
              <Button buttonText="Cancel" />
            </Link>
          </div>

          <div className={style.submit}>
            <div onClick={this.handleSubmit}>
              <Button
                buttonText="Submit"
              />
            </div>
            {(this.state.shouldCreateAccount && this.state.shouldCreateAccountFirebase)
              ? (<Redirect push to="/some/where/AccountManagement" />) : (this.state.shouldCreateAccount != null && this.state.shouldCreateAccount == false) ? (<div className={style.reject}> Errors Exist on Page </div>)
                : (<div className={style.fuck}> {this.state.firebaseErrorMessage} </div>)}
          </div>

        </div>

    );
  }
}

export default CreateAccountPage;
