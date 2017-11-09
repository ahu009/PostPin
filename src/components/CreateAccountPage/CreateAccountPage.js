import React from 'react';
import style from './CreateAccountPage.scss';
import { ReactTextField, validator  } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';
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
];

const emailValidator = [
    {
      message: 'Not an email',
      validator: value => {
        return value != "" ? validator.isEmail(value) : true
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
      submitLink: '/'

    };
    this.checkSubmit = this.checkSubmit.bind(this);
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

   handleSubmit(e) {
     //e.preventDefault();
     let em = document.querySelector('input[type="email"]').value;
     let pass = document.querySelector('input[type="password"]').value;
     firebase.auth().createUserWithEmailAndPassword(em, pass).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
      this.setState({
        submitLink: '/accounts/create-account'
      });
     });
     this.setState({
       emailin: document.querySelector('input[type="email"]').value,
       pwin: document.querySelector('input[type="password"]').value,
       phonein: document.querySelector('input[type="password"]').value,
       submitLink: '/'
     });

    //  let em = document.querySelector('input[type="email"]').value;
    //  let pw = document.querySelector('input[type="password"]').value;
    //  firebase.auth().createUserWithEmailAndPassword(em, pw);
     //
    //  this.setState({emailin: em});
    //  this.setState({pwin: pw});
    //  return userInput;
   }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    const passwordValidator = [
        {
          message: 'Passwords must match',
          validator: value => {
             let password = document.querySelector('[name="Password"]').value;
             let confirm = document.querySelector('[name="Confirm Password"]').value;
             this.checkSubmit();
             if(confirm != password)
              return false;
             return true;
          },
        },
    ];

    const showConfirm = [
        {
          message: '',
          validator: value => {
             value != '' ? this.setState({showConfirm: true}) : this.setState({showConfirm: false})
          },
        },
    ];

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
              value = {this.state.emailin}
              validators={emailValidator}
            />
          </div>

          <div>
            PhoneNumber:
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
            Password:
            <ReactTextField
              name="Password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value = {this.state.pwin}
              validators={showConfirm}
            />
          </div>

          {this.state.showConfirm ?
          <div>
            Confirm Password:
            <ReactTextField
              name="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              validators={passwordValidator}
            />
          </div>
          : null}
          <div className={style.submit}>
            <Link to={this.state.submitLink}>
              <div onClick={this.handleSubmit}>
                <Button
                  buttonText="Submit"
                />
              </div>
            </Link>
          </div>
          </div>

          <div className={style.back}>
            <Link to="/">
              <Button buttonText="Cancel" />
            </Link>
          </div>
        </div>

    );
  }
}

export default CreateAccountPage;
