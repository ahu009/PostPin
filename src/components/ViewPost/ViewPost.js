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
    this.state = {
      canSubmit: false,
      pictures: [],
      picIndex: 0,
      showError: false,
      titlein: '',
      pricein: '',
      descriptionin: '',
      tagsin: ''
    };
    this.changeImage = this.changeImage.bind(this);
  }

  componentDidMount() {
    for (var i = 0; i < this.props.numPics; ++i) {
      var pics = firebase.storage().ref(this.props.posterID).child(this.props.postNum.toString()).child(i.toString());
      pics.getDownloadURL().then(function(url){
        this.setState ({pictures: this.state.pictures.concat(url)});
      }.bind(this))
    }
  }

  changeImage() {
    if (this.state.picIndex < this.props.numPics - 1) {
      this.setState({picIndex: this.state.picIndex + 1});
    }
    else {
      this.setState({picIndex: 0});
    }
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
        {
          this.props.numPics < 1
          ?
           null
          :
          <img src={this.state.pictures[this.state.picIndex]} height={454} width={600}/>
        }
        </div>

        <div>
        {
          this.props.numPics <= 1
          ?
          null
          :
          <div className= {style.picture} onClick={this.changeImage}>
            <Button buttonText="Next Image"/>
          </div>
        }
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
