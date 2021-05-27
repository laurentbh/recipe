import React from 'react';

const Entity = ({word}) => {
    return(
        <div>{word.name} [{word.id}]</div>
    );
}
export default Entity