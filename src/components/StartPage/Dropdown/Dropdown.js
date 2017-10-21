import React from 'react';
import style from './Dropdown.scss';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
       placeHolder: 'Select...'
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

    return (
      <div>
        <Select className={style.dropDown}
        name="University"
        value="one"
        options={options}
        resetValue=''
        placeholder={value}
        onChange={(val) => {
          console.log(val);
          this.setState({placeHolder: val.label})
        }}
        />
      </div>
    );
  }
}

export default Dropdown;
