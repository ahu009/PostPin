import React from 'react';
import style from './SearchPage.scss';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ReactTextField,validator} from 'react-textfield';
import auto from './TempAutoFill';
import Button from './../Button';
import { Link, Route } from 'react-router-dom';
import Modal from 'react-modal';
import Category from './Category';
import PrintFilters from './PrintFilters';
import ACCOUNT_AUTH from './../../public/account';
import firebase from './../../firebase.js';

const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '45%',
    left                  : '50%',
    right                 : '0',
    bottom                : '0',
    transform             : 'translate(-50%, -50%)'
  }
};

const styleOne = {
  container: {
    textAlign: 'left',
  },
  input: {
    width: '60%',
    fontSize: '12px',
  },
};

const styleTwo = {
  container: {
    textAlign: 'left',
  },
  input: {
    width: '100%',
    fontSize: '20px',
  },
};

/**
 * UI Component
 * @type {Class}
 */
class SearchPage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      enterClicked: false,
      canApply: true,
      showError: false,
      tags: null,
      priceRange: null,
      userLoggedIn: null,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.rejectSubmit = this.rejectSubmit.bind(this);
    this.setCanApply = this.setCanApply.bind(this);
    this.retrieveTags = this.retrieveTags.bind(this);
    this.toggleEnterClicked = this.toggleEnterClicked.bind(this);
    this.tagRemoved = this.tagRemoved.bind(this);
    this.refreshParent = this.refreshParent.bind(this);
  }

  componentDidMount () {
    let user = firebase.auth().currentUser;
    user ? this.setState({userLoggedIn: true}) : this.setState({userLoggedIn: false})
  }

  refreshParent () {
    this.forceUpdate();
  }

  tagRemoved (value, isTag) {
    isTag
        ? sessionStorage.setItem("userTags", JSON.stringify(JSON.parse(sessionStorage.getItem("userTags")).filter(function(i) { return i != value })))
        : sessionStorage.setItem("userPrice", JSON.stringify(JSON.parse(sessionStorage.getItem("userPrice")).filter(function(i) { return i != value })))
    this.forceUpdate();
  }

  retrieveTags () {
    let tagArray = document.querySelector('input[name="Tags"]').value.split(",");
    for(let i = 0; i < tagArray.length; i++) {
      if (tagArray[i] != undefined && tagArray[i] != null)
        tagArray[i] = tagArray[i].replace(/\s/g, '').toLowerCase();
      if (tagArray[i] === '') {
        tagArray.splice(i,1);
        i--;
      }
    }
    tagArray = Array.from(new Set(tagArray));
    this.setState({tags: tagArray,
                  priceRange: [`$${document.querySelector('input[name="min_in"]').value} - $${document.querySelector('input[name="max_in"]').value}`]});
    sessionStorage.setItem("userTags", JSON.stringify(tagArray));
    sessionStorage.setItem("userPrice", JSON.stringify([`$${document.querySelector('input[name="min_in"]').value} - $${document.querySelector('input[name="max_in"]').value}`]));
    this.closeModal();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  toggleEnterClicked () {
    document.getElementById("navigate").click();
    sessionStorage.setItem("userSearch", document.querySelector('input[autocomplete="off"]').value);
    sessionStorage.setItem("Category", '');
  }

  setCanApply () {
    document.querySelector('span[class="ReactTextField-message ReactTextField--error"]')
    ? this.setState({canApply: false})
    : this.setState({canApply: true, showError: false});
  }

  rejectSubmit () {
    return this.setState({showError: true});
  }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    let placeHolderText = `Search for Pins in ${sessionStorage.getItem("schoolName")}`;
    const community = ['Activities', 'Lost + Found', 'RideShare', 'Events', 'General', 'Groups', 'Volunteers', 'Clubs', 'Classes', 'Intramural Sports'];
    const housing = ['Housing Swap', 'Office', 'Commercial', 'Parking', 'Storage', 'Rooms', 'Sublets', 'Rental'];
    const jobs = ['Tutoring', 'Internships', 'Club Position', 'Retail', 'Film', 'Gigs', 'Legal', 'General Labor', 'On-Campus', 'Off-Campus'];
    const forSale = ['Books', 'School Supplies', 'Clothes + Acc', 'Electronics', 'Arts & Crafts', 'Collectibles', 'Wanted', 'Cars + Motorcycles', 'General'];

    const numValidator = [
        {
          message: 'must be a number',
          validator: value => !isNaN(value)
        },
    ];

    return (
      <div className={style.container}>
        <div className={style.housing}>
          <Category name="Housing" tags={housing} refreshParent={this.refreshParent} />
        </div>
        <div className={style.forsale}>
          <Category name="For Sale" tags={forSale} refreshParent={this.refreshParent} />
        </div>
        <div className={style.jobs}>
          <Category name="Jobs" tags={jobs} refreshParent={this.refreshParent} />
        </div>
        <div className={style.community}>
          <Category name="Community" tags={community} refreshParent={this.refreshParent} />
        </div>

        <Link to="/some/where/search">
          <button id="navigate" className={style.navigate}/>
        </Link>

        <div className={style.button}>
          <Link to="/">
            <Button buttonText={'Back'} />
          </Link>
        </div>
        <div className={style.create}>
          <Link to={this.state.userLoggedIn ? "/some/where/else" : "/accounts/sign-in/"} >
            <Button buttonText={'Create Post'} />
          </Link>
        </div>
        <p onClick={this.openModal} className={style.filter}> Filter </p>

        <div className={style.tagPrice_container}>
          {(JSON.parse(sessionStorage.getItem("userTags")) != null && JSON.parse(sessionStorage.getItem("userTags")) != '' && JSON.parse(sessionStorage.getItem("userTags")) != undefined)
          ? (<div className={style.tags}>
              <PrintFilters callBack={this.tagRemoved} header="Tags:" content={JSON.parse(sessionStorage.getItem("userTags"))} />
            </div>) : null}
          {(JSON.parse(sessionStorage.getItem("userPrice")) != null && JSON.parse(sessionStorage.getItem("userPrice"))[0] != undefined && JSON.parse(sessionStorage.getItem("userPrice"))[0].replace(/\s/g, '') != '$-$')
          ? (<div className={style.priceRange}>
              <PrintFilters callBack={this.tagRemoved} header="Price Range:" content={JSON.parse(sessionStorage.getItem("userPrice"))} />
            </div>) : null}
        </div>

        <MuiThemeProvider>
          <SearchBar
            dataSource={auto}
            onChange={() => console.log('onChange')}
            onRequestSearch={() => this.toggleEnterClicked()}
            placeholder={placeHolderText}
            style={{
              width: '55%',
              position: 'absolute',
              left: '23%',
              top: '3%'
            }}
          />
        </MuiThemeProvider>


        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          shouldCloseOnOverlayClick={true}
          contentLabel="Modal">

          <div className={style.buttonContainer}>
            <div className={style.modal1} onClick={this.closeModal} > <Button buttonText={'Close'} /> </div>
            <div className={style.modal2} onClick={() => {
              this.state.canApply ? this.retrieveTags() : this.rejectSubmit();
            }}>
              <Button buttonText={'Apply'} />
              {this.state.showError ? (<div className={style.error}> Errors Exist on Page </div>) : null}
            </div>
          </div>


            <div className={style.inputContainer}>
              <div className={style.tagbar}>
                <ReactTextField
                    name = "Tags"
                    placeholder = "Enter tags separated by commas"
                    type="text"
                    style = {styleTwo}
                  />
              </div>
              <p className = {style.dollar1}> $ </p>
              <p className={style.dash}> - </p>
              <div className={style.input1}>
                <ReactTextField
                    name = "min_in"
                    type="text"
                    placeholder = "min"
                    validators={numValidator}
                    style = {styleOne}
                    afterValidate = {this.setCanApply}
                  />
              </div>
              <p className = {style.dollar2}> $ </p>
              <div className={style.input2}>
                <ReactTextField
                    name = "max_in"
                    type="text"
                    placeholder = "max"
                    validators={numValidator}
                    style = {styleOne}
                    afterValidate = {this.setCanApply}
                  />
              </div>
            </div>
        </Modal>

      </div>
    );
  }
}

export default SearchPage;
