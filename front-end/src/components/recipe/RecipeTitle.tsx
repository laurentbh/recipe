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
            <div className="recipe-title-star">
                <RecipeStars editable={false} rating={params.data.rating} />
            </div>
            <div className="recipe-title-title">
                {params.data.title}
            </div>
            <div className="recipe-title-control">
                <Button id={params.data.id} variant="secondary" size="sm" onClick={params.cb}>{onClickLabel}</Button>
                <Button variant="outline-danger" size="sm" disabled={true}>Delete</Button>
                {params.data.id}
            </div>
        </div>
    )
}
export default RecipeTitle