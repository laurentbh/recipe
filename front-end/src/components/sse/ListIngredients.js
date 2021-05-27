import React, { useContext } from 'react';
import AppContext from "../context/app-context";
import Entity from '../entities/Entity';
import ListGroup from 'react-bootstrap/ListGroup'
// import add from '../../services/test.ts'

const ListIngredients = () => {
    // console.log("test typescript call: "  + add(1,2))
    const  ctx  = useContext(AppContext);

    return (
    <div className="flex-container"> 
    <ListGroup>
        {
        ctx.ing.map((r) => (
            <ListGroup.Item key={r.id}>
                <Entity word={r} />
            </ListGroup.Item>
        ))
    }
    </ListGroup>
    </div>
    )
}

export default ListIngredients