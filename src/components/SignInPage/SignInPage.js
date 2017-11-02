import React from 'react';
import style from './SignInPage.scss';
import { ReactTextField, validator  } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';

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
              validators={emailValidator}
            />
          </div>

          <div>
            Password:
            <ReactTextField
              name="Password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className={style.submit}>
            <Link to={"/"}>
              <Button buttonText="Sign In" />
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

export default SignInPage;
