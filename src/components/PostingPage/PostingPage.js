import React from 'react';
import style from './PostingPage.scss';
import { ReactTextField, validator  } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';

const priceValidator = [
    {
      message: 'Price must be a number',
      validator: value => !isNaN(value),
    },
];

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
    width: '700px',
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

const style2 = {
  container: {
    textAlign: 'left',
  },
  input: {
    width: '400px',
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

const style3 = {
  container: {
    textAlign: 'left',
  },
  input: {
    width: '250px',
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

const style4 = {
  container: {
    textAlign: 'left',
  },
  input: {
    width: '324px',
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
class PostingPage extends React.Component {
  /**
   * Constructor for UI Component
   * @param  {Object} props  Props passed to this class
   * @return {void}
   */
  constructor (props) {
    super(props);
    this.state = { canSubmit: true, showConfirm: false };
    this.checkSubmit = this.checkSubmit.bind(this);
  }

   checkSubmit () {
     let canSubmit = document.querySelector('[class="ReactTextField-message ReactTextField--error"]') ? false : true;
     this.setState({ canSubmit: canSubmit });
     return canSubmit;
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
      <div className={style.container}>
        <div className={style.title}>
          Title
          <ReactTextField
            name="Title"
            type="text"
            placeholder="Title"
            style = {style2}
          />
        </div>

        <div className={style.description}>
          Description
          <ReactTextField
            name="Body"
            type="text"
            placeholder="Body"
            style = {style1}
          />
        </div>

        <div className={style.price}>
          Price
          <ReactTextField
            name="Price"
            type="text"
            validators={priceValidator}
            placeholder="Price"
            style = {style3}
          />
        </div>

        <div className={style.phone_number}>
          Phone Number
          <ReactTextField
            name="Phone Number"
            type="tel"
            placeholder="Phone Number"
            validators={alphaNumericValidator}
            style = {style3}
          />
        </div>

        <div className={style.email}>
          Email
          <ReactTextField
            name="E-mail"
            type="email"
            placeholder="E-mail"
            validators={emailValidator}
            style = {style2}
          />
        </div>

        <div className={style.pword}>
          Password
          <ReactTextField
            name="Password"
            type="password"
            placeholder="Password"
            validators={showConfirm}
            style = {style4}
          />
        </div>

        {this.state.showConfirm ?
        <div className={style.confirm_pword}>
          Confirm Password
          <ReactTextField
            name="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            validators={passwordValidator}
            style = {style4}
          />
        </div>
        : null}

        <div className={style.tags}>
          Insert tags separated by commas
          <ReactTextField
            name="Tags"
            type="text"
            placeholder="Tags separated by commas (e.g Art, Cars, Phones)"
            style = {style1}
          />
        </div>

        <div className={style.submit}>
          <Link to={this.state.canSubmit ? "/some/where" : "/some/where/else"}>
            <Button buttonText="Submit" />
          </Link>
        </div>
        <div className={style.back}>
          <Link to="/some/where">
            <Button buttonText="Back" />
          </Link>
        </div>
      </div>



    );
  }
}

export default PostingPage;
