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
    this.state = {
      canSubmit: false,
      pictures: [],
      showError: false,
      titlein: '',
      pricein: '',
      descriptionin: '',
      tagsin: '',
      postnumber:''
    };
    this.checkSubmit = this.checkSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.rejectSubmit = this.rejectSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onDrop(picture) {
    if (picture) {
      this.setState({
        pictures: this.state.pictures.concat(picture)
      });
      setTimeout(() => {
        let elementtoscroll = document.querySelectorAll('div[class="uploadPictureContainer"]')[document.querySelectorAll('div[class="uploadPictureContainer"]').length - 1];
        elementtoscroll.scrollIntoView({behavior: 'smooth'});
      }, 50);
    }
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
    var that = this;
    console.log(document.querySelector('input[name="Title"]').value)
    let _title = document.querySelector('input[name="Title"]').value;
    let _price = document.querySelector('input[name="Price"]').value;
    let _description = document.querySelector('input[name="Body"]').value;
    let _tag = document.querySelector('input[name="Tags"]').value;
    let _school = sessionStorage.getItem("schoolName");
    let _pictures = this.state.pictures;
    let user = firebase.auth().currentUser;
      if (user) {
        console.log("user is: " + user.email);
        var postnum;
        var getpostdata = firebase.database().ref('users/' + user.uid);
        getpostdata.once('value',function(snapshot){
          postnum = snapshot.val().Posts;
          postnum = postnum + 1;
          console.log("postnume: " + postnum)
          const post = firebase.database().ref("users").child(user.uid).child("posts").child(postnum);
          firebase.database().ref('users/' + user.uid).update({Posts: postnum});
          post.set({
            title: _title,
            price: _price,
            school: _school,
            description: _description,
            tag: _tag,
            pictures: "hi",
            posterEmail: user.email,
            numPics: _pictures.length,
            posterID: user.uid,
            postNum: postnum,
            PostID: postnum
          });
          console.log('sending email to: ' + user);
          var auth = firebase.auth();
          var curu = firebase.auth().currentUser;
          var emailAddress = curu.email;

          auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
            console.log("reset email sent to " + emailAddress)
          }).catch(function(error) {
            // An error happened.
            console.log("did not send");
          });


          //creates storage reference
          for (var i = 0; i < _pictures.length; i++) {
            console.log(_pictures[i][0]);
            var pics = firebase.storage().ref(user.uid).child(postnum.toString()).child(i.toString());
            var currpic = pics.put(_pictures[i][0]);
            //pics.getDownloadURL().then(function(url) {
              //console.log(url);
              //post.update({
                //pictureURLS: pictureURLS.concat(url)
              //});
            //});
            currpic.on('state_changed',
            function progress(snapshot) {
              if (snapshot.bytesTransferred == snapshot.totalbytes) {
                console.log("Image Successfully Uploaded!");
              }
              else {
                console.log("uploading...");
              }
            },
            function error(err) {
              console.log("errrorrssssss");
            },
            function complete() {
              console.log("success!");
            }
            );


          }
        })
      }
      else {
        console.log("user does not exists")
      }

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
          Price ($)
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
                  imgExtension={['.JPG', '.jpg', '.png', '.PNG','.gif', '.GIF']}
                  maxFileSize={5242880}
                  label='Max file size: 5mb, Accepted: jpg, gif, png, gif'
            />
          </div>

        <div className={style.submit} onClick={this.state.canSubmit ? this.handleSubmit : this.rejectSubmit}>
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
