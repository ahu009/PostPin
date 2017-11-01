import React from 'react';
import style from './SearchPage.scss';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import auto from './TempAutoFill';
import Button from './../Button';
import { Link } from 'react-router-dom';
import school from './../../shared/school';
import Modal from 'react-modal';
import PostPin_Info from './../../shared/PostPin_Info';
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
/**
 * UI Component
 * @type {Class}
 */
class SearchPage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      enterClicked: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    PostPin_Info.searchString = document.querySelector('input[autocomplete="off"]').value;
  }

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    let placeHolderText = `Search for Pins in ${school.name}`;
    const community = ['Activities', 'Lost + Found', 'RideShare', 'Events', 'General', 'Groups', 'Volunteers', 'Clubs', 'Classes', 'Intramural Sports'];
    const housing = ['Housing Swap', 'Office', 'Commercial', 'Parking', 'Storage', 'Rooms', 'Sublets', 'Rental'];
    const jobs = ['Tutoring', 'Internships', 'Club Position', 'Retail', 'Film', 'Gigs', 'Legal', 'General Labor', 'On-Campus', 'Off-Campus'];
    const forSale = ['Books', 'School Supplies', 'Clothes + Acc', 'Electronics', 'Arts & Crafts', 'Collectibles', 'Wanted', 'Cars + Motorcycles', 'General'];

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
            <Button buttonText={'Create Pin'} />
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

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          shouldCloseOnOverlayClick={true}
          contentLabel="Modal"
        >
          <div className={style.buttonContainer}>
            <div onClick={this.closeModal}> <Button buttonText={'Close'} /> </div>
            <div className={style.modal2} onClick={this.closeModal}> <Button buttonText={'Apply'} /> </div>
          </div>
          <MuiThemeProvider>
            <SearchBar
              autoFocus
              dataSource={auto}
              placeholder="Search for Tags separated by Commas. (e.g Electronics, Art, etc.)"
              onChange={() => console.log('onChange')}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                width: '70%',
                position: 'absolute',
                left: '20%',
                top: '20%'
              }}
            />
          </MuiThemeProvider>
            <div className={style.inputContainer}>
              <p className={style.inputText}> Enter Price Range </p>
              <p className={style.dash}> $ </p>
              <input className={style.input1} type="text" name="txt" />
              <p className={style.dash}> - </p>
              <p className={style.dash}> $ </p>
              <input className={style.input2} type="text" name="txt" />
            </div>
        </Modal>

      </div>
    );
  }
}

export default SearchPage;
