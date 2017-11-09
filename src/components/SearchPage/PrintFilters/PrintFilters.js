import React from 'react';
import style from './PrintFilters.scss';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';


/**
 * Category
 * @type {Class}
 */
class PrintFilters extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
          <div className={style.header}> {this.props.header} </div>
          {this.props.content ? this.props.content.map((value) => (value.replace(/\s/g, '')
             ? (<div className={style.tags} key={value}>
               <div className={style.glyph} onClick={() => this.props.callBack(value, (this.props.header == 'Tags:' ? true : false))}>
                <Glyphicon glyph="remove" style={{color:'#393a3d', fontSize: '10px', textAlign: 'center'}}/>
               </div>
               <p className={style.text}> {value} </p>
              </div>) : null
          )) : null}
      </div>
    );
  }
}

export default PrintFilters;
