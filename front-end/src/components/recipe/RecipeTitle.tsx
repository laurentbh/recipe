import React, {MouseEvent} from "react";
import RecipeStars from "./RecipeStars";
import {Button} from "react-bootstrap";

interface TitleI {
    data: any
    cb : (event : MouseEvent<HTMLButtonElement>) => void
    edit: boolean

}
const RecipeTitle = (params: TitleI) => {
    const onClickLabel = params.edit ? "Save":"Zoom"
    return (
        <div className={"accordionTitle"}>
            {params.data.title}
            <div>{'           '}</div>
            <RecipeStars editable={false} rating={params.data.rating} />
            {'           '}
            <Button id={params.data.id} variant="secondary" size="sm" onClick={params.cb}>{onClickLabel}</Button>
            {'    '} <Button variant="outline-danger" size="sm" disabled={true}>Delete</Button>
            {'           '}
            {params.data.id}
        </div>
    )
}
export default RecipeTitle