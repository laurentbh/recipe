import React  from 'react'
import Word from './Word'
import PropTypes from 'prop-types';

const ResultRecipe = (props) => {
    // console.log(props)
    return (
    <div className="flex-container"> 
        {
         props.result.map((r) => (
            <Word key={r.index} word={r}/>))
         }
    </div>
    );
};

// PropTypes
ResultRecipe.propTypes = {
    parsingResults: PropTypes.array
  }
export default ResultRecipe