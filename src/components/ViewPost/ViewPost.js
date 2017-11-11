import React from 'react';
import style from './ViewPost.scss';
import { ReactTextField, validator  } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';
import firebase from './../../firebase.js';
import Image from 'react-image-resizer';

/**
 * UI Component
 * @type {Class}
 */
class ViewPost extends React.Component {
  /**
   * Constructor for UI Component
   * @param  {Object} props  Props passed to this class
   * @return {void}
   */
  constructor (props) {
    super(props);
    this.state = { canSubmit: false, pictures: [], showError: false, titlein: '', pricein: '', descriptionin: '',tagsin: '' };

    // this.checkSubmit = this.checkSubmit.bind(this);
  }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>

        <div className = {style.title}>
          CSS SLAVE FOR SALE
        </div>

        <div className={style.price}>
          $FREE
        </div>

        <div className={style.description}>
          PLS TAKE MY CSS SLAVE
        </div>

        <div className={style.images}>
          <Image src={require('./../../../Steven.jpg')} height={454} width={600} />
        </div>

        <div className={style.posterInfo}>
          Poster Information:
          <div className={style.info}>
            <p> Email: ahu009@ucr.edu </p>
            <p> Phone Number: 408-691-1969 </p>
          </div>
        </div>

        <div className={style.back}>
          <Link to="/some/where/search">
            <Button buttonText="Back" />
          </Link>
        </div>
      </div>
    );
  }
}

export default ViewPost;
