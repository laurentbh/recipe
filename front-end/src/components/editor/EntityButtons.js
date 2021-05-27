import React from 'react';

const Entities = [
    { label: "An Ingredient", entity: "Ingredient", style: "green" },
    { label: "Utensil", entity: "Utensil", style: "gray" },
    { label: "Category", entity: "Category", style: "orange" },
    { label: "Measure", entity: "Measure", style: "blue" },
]
const EntityButtons = (props) => {
    return (
        <div>
            {Entities.map( e => 
                <EntityButton key={e.label} style={e.style} label={e.label} entity={e.entity} onToggle={props.onToggle} />
           )}
        </div>
    )
}
const EntityButton = (props) => {

    const onToggle = (e) => {
        e.preventDefault();
        props.onToggle(props.entity)
    }
        
    return (
        <span className="editor-btn" onMouseDown={onToggle}>
            {props.label}
        </span>

    );
}
export default EntityButtons