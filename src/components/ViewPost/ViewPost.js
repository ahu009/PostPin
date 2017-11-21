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
          {this.props.title}
        </div>

        <div className={style.price}>
          ${this.props.price}
        </div>

        <div className={style.description}>
          {this.props.description}
        </div>

        <div className={style.images}>
          <Image src={require('./../../../Steven.jpg')} height={454} width={600} />
        </div>

        <div className={style.posterInfo}>
          Poster Information:
          <div className={style.info}>
            <p> Email: {this.props.posterEmail} </p>
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
