import React from 'react';
import s from './Dropdown.scss';
import Select from 'react-select';
import SubmitButton from './SubmitButton';
import './Dropdown2.css';
/**
 * UI Component
 * @type {Class}
 */
class Dropdown extends React.Component {
  /**
   * Constructor for UI Component
   * @param  {Object} props  Props passed to this class
   * @return {void}
   */
   constructor (props) {
     super(props);
     this.state = {
       placeHolder: null
     };
   }

  /**
   * Render functsion for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    const options = [
      {value: 'Stanford University', label: 'Stanford'},
      {value: 'Stanford University', label: 'UC Berkeley'},
      {value: 'Stanford University', label: 'UCLA'},
      {value: 'Stanford University', label: 'UC San Diego'},
      {value: 'Stanford University', label: 'UC Riverside'}
    ];
    let value = this.state.placeHolder;
    sessionStorage.setItem("schoolName", value);

    return (
      <div>
        <Select className={s.dropDown}
        name="University"
        value="one"
        options={options}
        resetValue=''
        placeholder={value ? value : 'Select...'}
        onChange={(val) => {
          console.log(val);
          this.setState({placeHolder: val.label})
        }}
        />
        <SubmitButton shouldHide={value ? false : true}/>
      </div>
    );
  }
}

export default Dropdown;
