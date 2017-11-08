import React from 'react';
import style from './AccountManagement.scss';
import Button from './../Button';
import { Link } from 'react-router-dom';
import Category from './Category';




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
