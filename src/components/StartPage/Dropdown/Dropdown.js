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

    return (
      <div>
        <Select className={s.dropDown}
        name="University"
        value="one"
        options={options}
        resetValue=''
        placeholder={(sessionStorage.getItem("schoolName") != 'undefined' && sessionStorage.getItem("schoolName") != null) ? sessionStorage.getItem("schoolName") : 'Select...'}
        onChange={(val) => {
          console.log(val);
          sessionStorage.setItem("schoolName", val.label);
          this.forceUpdate();
        }}
        />
        <SubmitButton shouldHide={(sessionStorage.getItem("schoolName") != 'undefined' && sessionStorage.getItem("schoolName") != null) ? false : true}/>
      </div>
    );
  }
}

export default Dropdown;
