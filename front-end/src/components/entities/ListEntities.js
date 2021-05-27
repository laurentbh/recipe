import React, { useContext } from 'react';
import AppContext from "../context/app-context";
import Entity from '../entities/Entity';
import ListGroup from 'react-bootstrap/ListGroup'

const ListEntities = ({domain}) => {
    const  ctx  = useContext(AppContext);

    return (
    <div className="flex-container"> 
    <ListGroup>
        {
        ctx.cat.map((r) => (
            <ListGroup.Item>
                <Entity key={r.id} word={r} />
        </ListGroup.Item>
        ))
    }
    </ListGroup>
    </div>
    )
}

export default ListEntities