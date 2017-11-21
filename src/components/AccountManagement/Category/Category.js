import React from 'react';
import style from './Category.scss';
import { Link } from 'react-router-dom';
import SmallButton from './../SmallButton';
import { ReactTextField, validator } from 'react-textfield';
import firebase from './../../../firebase.js';


const passwordValidator = [
    {
      message: 'Password must be at least 6 characters',
      validator: value => {
        if (value.length < 6 && value != "")
          return false;
        return true;
      },
    }
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
    }
];

const emailValidator = [
    {
      message: 'Not an email',
      validator: value => {
        return value != "" ? validator.isEmail(value) : true
      },
    }
];

/**
 * Category
 * @type {Class}
 */
class Category extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      canSubmit: true,
      isEdit: false,
      showError: false,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.populateEdit = this.populateEdit.bind(this);
  }

  populateEdit (post) {
    sessionStorage.setItem("postEdit", post);
  }

  updateInfo (callback) {
    let self = this;
    let shouldUpdate = false;
    let shouldUpdate2 = false;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const account = firebase.database().ref("users").child(user.uid);
        let email = document.querySelector('input[name="E-mail"]').value != ''
                        ? document.querySelector('input[name="E-mail"]').value
                        : document.querySelector('input[name="E-mail"]').placeholder;
        let password = document.querySelector('input[name="password"]').value != ''
                        ? document.querySelector('input[name="password"]').value
                        : document.querySelector('input[name="password"]').placeholder
        let phone = document.querySelector('input[name="phone"]').value != ''
                        ? document.querySelector('input[name="phone"]').value
                        : document.querySelector('input[name="phone"]').placeholder


        user.updateEmail(email).then((response) => {
          user.updatePassword(password).then((response) => {
            firebase.database().ref('users/' + user.uid).update({Email: email, Password: password, Phone: phone});
            self.setState({showError: false});
          })
        })
        .catch((error) => {
          self.setState({showError: true});
        });
        // user.updatePhoneNumber(phone).catch((error) => console.log(error));
        // ^^ May cause problems later.
      }
      });
      setTimeout(() => {callback();}, 200);
    }

  toggleEdit () {
    this.setState({isEdit: !this.state.isEdit})
  }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
      <div className={style.header}> {this.props.name} </div>
        <div className={style.content}>
          {this.props.name === "Account Information"
          ? (<div>
              {this.state.showError ? <p className={style.error}> Email already in use OR Sign in Again </p> : null}
              {
                this.state.isEdit
                ? (<div className={style.button} onClick={() => {
                    if (!document.querySelector('span[class="ReactTextField-message ReactTextField--error"]'))
                      this.updateInfo(this.toggleEdit);
                }}> <SmallButton buttonText="submit" /> </div>)
                : (<div className={style.button} onClick={() => this.toggleEdit()}> <SmallButton buttonText="edit" /> </div>)
              }
              <div className={style.text}>
                <p className={style.headers}> Email: </p>
                {
                  !this.state.isEdit
                  ? (<p> {this.props.info.email} </p>)
                  : ( <ReactTextField
                        name="E-mail"
                        type="email"
                        placeholder={this.props.info.email}
                        validators={emailValidator}
                      />)
                }
              </div>
            <div className={style.text}>
              <p className={style.headers}> Phone Number: </p>
              {
                !this.state.isEdit
                ? (<p> {this.props.info.phone} </p>)
                : ( <ReactTextField
                      name="phone"
                      type="tel"
                      placeholder={this.props.info.phone}
                      validators={alphaNumericValidator}
                    />)
              }
            </div>
            <div className={style.text}>
              <p className={style.headers}> Password: </p>
              {
                !this.state.isEdit
                ? (<p> {this.props.info.password} </p>)
                : ( <ReactTextField
                      name="password"
                      type="text"
                      placeholder={this.props.info.password}
                      validators={passwordValidator}
                    />)
              }
              </div></div>) : (
                <div><div className={style.text}>
                  <div>
                  {this.props.info.map(function(listValue){
                    return (
                      <Link to="/some/where/else/edit">
                        <p onClick={() => {sessionStorage.setItem("postEdit", JSON.stringify(listValue));}} className={style.headers}>{listValue.title}</p>
                      </Link>
                    )
                  })}
                  </div>
                </div></div>

              )}
        </div>
      </div>
    );
  }
}

export default Category;
