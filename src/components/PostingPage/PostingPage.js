import React from 'react';
import style from './PostingPage.scss';
import { ReactTextField, validator  } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import firebase from './../../firebase.js';

const style1 = {
  container: {
    textAlign: 'left',
  },
  input: {
    //width: '700px',
    width: '100%',
    fontSize: '14px',
  },
  successMessage: {
    fontSize: '10px',
    color: '#3949AB',
  },
  errorMessage: {
    fontSize: '10px',
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
    this.state = { canSubmit: false, pictures: [], showError: false, titlein: '', pricein: '', descriptionin: '',tagsin: '' };
    this.checkSubmit = this.checkSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.rejectSubmit = this.rejectSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }


   checkSubmit () {
    document.querySelector('span[class="ReactTextField-message ReactTextField--error"]')
     ? this.setState({canSubmit: false})
     : this.setState({canSubmit: true, showError: false})
   }

   rejectSubmit () {
     return this.setState({showError: true});
   }

   handleSubmit(e) {
     e.preventDefault();
     console.log("hello")
     const usersPosts = firebase.database().ref('postings');
     const Posts = {
       title: document.querySelector('input[name="Title"]').value,
       price: document.querySelector('input[name="Price"]').value,
       description: document.querySelector('input[name="Body"]').value,
       tags: document.querySelector('input[name="Tags"]').value
     }
     usersPosts.push(Posts);
     this.setState({
       titlein: document.querySelector('input[name="Title"]').value,
       pricein: document.querySelector('input[name="Price"]').value,
       descriptionin: document.querySelector('input[name="Body"]').value,
       tagsin: document.querySelector('input[name="Tags"]').value
     });
   }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    const priceValidator = [
        {
          message: 'Price must be a number',
          validator: value => !isNaN(value)
        },
        {
          message: '*Required',
          validator: value => value.replace(/\s+/, "")  != ''
        }
    ];

    const emptyValidator = [
        {
          message: '*Required',
          validator: value => value.replace(/\s+/, "")  != ''
        },
    ];

    return (
      <div className={style.container}>

        <div className = {style.title}>
          Title
          <ReactTextField
            name="Title"
            type="text"
            validators={emptyValidator}
            placeholder="Title"
            style = {style1}
            onChange={this.handleChange}
            value = {this.state.titlein}
            afterValidate={this.checkSubmit}
          />
        </div>

        <div className={style.price}>
          Price
          <ReactTextField
            name="Price"
            type="text"
            validators={priceValidator}
            placeholder="Price"
            style = {style1}
            onChange={this.handleChange}
            value = {this.state.pricein}
            afterValidate={this.checkSubmit}
          />
        </div>

        <div className={style.description}>
          Description
          <ReactTextField
            name="Body"
            type="text"
            validators={emptyValidator}
            placeholder="Body"
            style = {style1}
            onChange={this.handleChange}
            value = {this.state.descriptionin}
            afterValidate={this.checkSubmit}
          />
        </div>

        <div className={style.tags}>
          Insert tags separated by commas
          <ReactTextField
            name="Tags"
            type="text"
            placeholder="Tags separated by commas (e.g Art, Cars, Phones)"
            onChange={this.handleChange}
            value = {this.state.tagsin}
            style = {style1}
          />
        </div>

        <div className={style.upload}>
          <ImageUploader
                  withPreview={true}
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  label='Max file size: 5mb, Accepted: jpg, gif, png, gif'
            />
          </div>

        <div className={style.submit} onClick={this.handleSubmit}> //onClick={this.state.canSubmit ? null : this.rejectSubmit}>
          {this.state.showError ? <div className={style.error}> Errors Exist on Page </div> : null}
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
