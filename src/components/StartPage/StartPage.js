import React from 'react';
import style from './StartPage.scss';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/**
 * UI Component
 * @type {Class}
 */
class StartPage extends React.Component {

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    const options = [
      {value: 'Stanford University', label: 'Stanford'},
      {value: 'Stanford University', label: 'Stanford'},
      {value: 'Stanford University', label: 'Stanford'},
      {value: 'Stanford University', label: 'Stanford'},
      {value: 'Stanford University', label: 'Stanford'}
    ];

    return (
      <div>
        <div className={style.container}>
          <p className={style.text}> What School Do You Attend?
          <Select className={style.dropDown}
          name="University"
          value="one"
          options={options}
          onChange={val => console.log(val)}
          />
          </p>
        </div>
      </div>

    );
  }
}

export default StartPage;
