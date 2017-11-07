import React from 'react';
import style from './PostingPage.scss';
import { ReactTextField, validator  } from 'react-textfield';
import Button from './../Button';
import { Link, Prompt } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

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
    this.state = { canSubmit: false, pictures: [], showError: false };
    this.checkSubmit = this.checkSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.rejectSubmit = this.rejectSubmit.bind(this);
  }

  onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
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
          />
        </div>

        <div className={style.tags}>
          Insert tags separated by commas
          <ReactTextField
            name="Tags"
            type="text"
            placeholder="Tags separated by commas (e.g Art, Cars, Phones)"
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

        <div className={style.submit} onClick={this.rejectSubmit}>
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
