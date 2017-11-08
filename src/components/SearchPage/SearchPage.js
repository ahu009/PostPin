import React from 'react';
import style from './SearchPage.scss';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ReactTextField,validator} from 'react-textfield';
import auto from './TempAutoFill';
import Button from './../Button';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Category from './Category';


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
      showError: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.rejectSubmit = this.rejectSubmit.bind(this);
    this.setCanApply = this.setCanApply.bind(this);
    this.toggleEnterClicked = this.toggleEnterClicked.bind(this);
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
    sessionStorage.setItem("userSearch",`'${document.querySelector('input[autocomplete="off"]').value}'`);
    sessionStorage.setItem("Category", '');
  }

  retrieveTags () {
    var res = document.querySelector('input[name="Tags"]').value.split(",");
    var min_val = document.querySelector('input[name="min_in"]').value;
    var max_val = document.querySelector('input[name="max_in"]').value;

    this.setState({modalIsOpen: false});

    document.getElementById("taglist").innerHTML = "";

    if(res[0] != ""){
      var tag_l = "<li><div style=\"text-decoration:underline; font-size: 14px;\">Tags:</div></li>";
      document.getElementById("taglist").innerHTML += tag_l;
    }
    for (var i = 0; i < res.length; i++)
    {
      var tag_l = "<li><div style=\"border: 2px solid #EEECF4; border-radius:4px; padding-left:2px; padding-right:2px\">" + res[i] + "</div></li>";
      document.getElementById("taglist").innerHTML += tag_l;
    }
    res = "";

    if(min_val != 0 || max_val != 0){
      var tag_l = "<li><div style=\"text-decoration:underline; font-size: 14px;\">Price range:</div></li>";
      document.getElementById("taglist").innerHTML += tag_l;


      var min_max = "<li><div style=\"border: 2px solid #EEECF4; border-radius:4px; padding-left:2px; padding-right:2px\">" + "$" + min_val + " - $"+ max_val + "</div></li>";
      document.getElementById("taglist").innerHTML += min_max;

      min_val = "";
      max_val = "";
    }
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
          <Category name="Housing" tags={housing} />
        </div>
        <div className={style.forsale}>
          <Category name="For Sale" tags={forSale} />
        </div>
        <div className={style.jobs}>
          <Category name="Jobs" tags={jobs} />
        </div>
        <div className={style.community}>
          <Category name="Community" tags={community} />
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
          <Link to="/some/where/else">
            <Button buttonText={'Create Post'} />
          </Link>
        </div>
        <p onClick={this.openModal} className={style.filter}> Filter </p>



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

        <div className={style.tagList}>
          <ul id="taglist" className={style.tlist}>

          </ul>
        </div>

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
