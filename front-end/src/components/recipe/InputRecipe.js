import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AppContext from "../context/app-context";
import useStateWithCallback from 'use-state-with-callback';

const ingredientCB = (ingredients) => {
    console.log("new ingredient " + ingredients)

}
const InputRecipe = () => {
    const { serverUrl } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useStateWithCallback('', ingredientCB);
    const [desc, setDesc] = useState('');
    // const [id, setId] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        class ingObj {
            constructor(name) {
                this.name = name;
            }
        };
        var tmp = [] //new Array();
        ingredients.split("\n").forEach(e => tmp.push(new ingObj(e)));
        const recipe = {
            title: title,
            ingredients: tmp,
            preparation: desc
        };
        // var s = JSON.stringify(recipe)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe)
        };
        fetch(serverUrl +'/recipe', requestOptions)
            .then(response => response.json());
            // .then(data => setId(data.InsertedID));

    }
    return (
        <Form onSubmit={e => submitForm(e)} >
            < Form.Group controlId="inputRecipe.ControlTitle" >
                <Form.Label>Title </Form.Label>
                < Form.Control type="input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Group>
            < Form.Group controlId="inputRecipe.ControlIngredient" >
                <Form.Label>Ingredients </Form.Label>
                < Form.Control as="textarea" rows={3}
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)} />
            </Form.Group>
            < Form.Group controlId="inputRecipe.ControlDescription" >
                <Form.Label>Description </Form.Label>
                < Form.Control as="textarea" rows={8}
                    value={desc}
                    onChange={e => setDesc(e.target.value)} />
            </Form.Group>
            < Button variant="primary" type="submit" >
                Submit
                </Button>
        </Form>
    );
}
export default InputRecipe
