import React, {useState}  from 'react';
import Form from 'react-bootstrap/Form'
// import useStateWithCallback from 'use-state-with-callback';


const IngredientInput = ({cb}) => {
    const onChangeCB = (event) => {
        setIngredients(event.target.value)
        cb(event.target.value)
    }
    const [ingredients, setIngredients] = useState([])

    return (
        <Form.Control as="textarea" rows={3}
            value={ingredients}
            onChange={e => onChangeCB(e)} />
    )
}
export default IngredientInput