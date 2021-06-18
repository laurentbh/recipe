import React, { useContext, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import appContext from "../context/app-context";
import { TimeSection, OtherSection, FieldValue } from "./RecipeSections";
import RecipeStars from "./RecipeStars";
import Editor from "../editor/Editor";
// export interface RecipeI {
//     id: string;
//     title: string;
//     ingredients: string[];
//     instruction: string;
//     attributes?: Map<string, string>;
// }
export interface RecipeProps {
    id?: string;
    recipe: any;
    editable: boolean;
}
export const recipeReservedFields: String[] =
    ["title", "total_time", "prep_time", "cook_time", "id", "ingredients", "instruction", "references", "rating"]

async function postRecipe( serverURL: string, recipe: any ): Promise<any> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    };
    const response = await fetch(serverURL + '/recipes', requestOptions)
    const body = await response.json();
    if (response.status !== 201) {
        alert(body.message)
    }
    return body;
  }

interface CommandI {
    serverURL : string
    recipeId : string;
    edit : boolean;
    recipe: any
}
const Command = (arg : CommandI) => {
    const history = useHistory()
    const handleClick = () => {
        if (arg.edit === false) {
            console.log("Zoom on :" + arg.recipeId)
            history.push("/recipeLoad", arg.recipeId)
        }
        else {
            if (arg.recipeId !== "" ) {
                console.log("Update on :" + arg.recipeId)
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(arg.recipe)
                };
                fetch(arg.serverURL + '/recipes/' + arg.recipeId, requestOptions)
                .then(response => response.json())
            }
            else {
                console.log("Save new recipe")
                postRecipe(arg.serverURL, arg.recipe)
            }
        }
    }
    const onClickLabel = arg.edit ? "Save":"Zoom"
    return (
        <>
            <div>{arg.recipeId}</div>
            <Button variant="outline-primary" size="sm" onClick={handleClick}>{onClickLabel}</Button>{'    '}
            <Button variant="outline-danger" size="sm" disabled={true}>Delete</Button>
        </>
    )
}

// export interface FieldChangeI {
//     key: string;
//     value: string;
// }
const Recipe = (data: RecipeProps) => {
    const ctx = useContext(appContext)
    const location = useLocation()
    if (location.state !== undefined) {
        // comming from RecipeLoad container
        data = location.state as RecipeProps
    }
    // const [recipeId] = useState(data.recipe["id"])
    const [recipeId] = useState( ()=> {
        return (data.recipe !== undefined && data.recipe["id"] !== undefined ?  data.recipe["id"] :
         (data.id !== undefined ? data.id : ''))
    })

    const [recipe, setRecipe] = useState<any>(data.recipe);

    const FieldChangeCB = (field: string, value: string ) => {
        console.log("fieldChange [" + field +"] => " + value )
        setRecipe((p:any) => ({
            ...p, [field]: value
        }))
    }

    const handleEditorChange = (id :string, data: string) : void => {
        const split = data.split("\n")
        console.log(">>> handleEditorChange " + data+ "-> " + split)
        if (id === "Ingredients") {
            setRecipe((p:any) => ({
                ...p, ["ingredients"]: split
            }))
        }
        else {
            setRecipe((p:any) => ({
                ...p, ["instruction"]: split
            }))
        }
    }
    const handleSave = () => {
        if (recipeId !== "") {
            console.log("Update on :" + recipeId)
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe)
            };
            fetch(ctx.serverURL + '/recipes/' + recipeId, requestOptions)
                .then(response => response.json())
        }
        else {
            console.log("Save new recipe")
            postRecipe(ctx.serverURL, recipe)
        }
    }
    const handleDelete = () => {
        console.log("Delete on :" + recipeId)
            const requestOptions = {
                method: 'DELETE',
            };
            fetch(ctx.serverURL + '/recipes/' + recipeId, requestOptions)
                .then(response => response.json())
    }
    return (
        <Container fluid={true}>
            {data.editable === true &&
                <Row>
                    <Col className={"recipe-title"}>
                    <span className="search-recipe-field">Title:</span>
                        <FieldValue field="title" value={recipe.title} editable={true} cb={FieldChangeCB} />
                        {'                     '}
                        <Button variant="outline-primary" size="sm" onClick={handleSave}>Save</Button>
                        {recipeId != "" &&
                            <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
                        }
                    </Col>
                </Row>
            }
            <Row >
                <Col className={"result-recipe-ing-col"} >
                    <Row>
                        <Editor data={recipe.ingredients.join("\n")}
                                id={"Ingredients"}
                                dataCB={handleEditorChange} />
                    </Row>
                    <Row>
                        <Col className={"result-recipe-ing-col search-recipe-section"} >
                            <TimeSection data={recipe} editable={data.editable} cb={FieldChangeCB} />
                        </Col>
                        <Col className={"result-recipe-ing-col search-recipe-section"} >
                            <RecipeStars editable={data.editable} rating={recipe.rating} cb={FieldChangeCB} />
                            <OtherSection data={recipe} editable={data.editable} cb={FieldChangeCB} />
                        </Col>
                        {/* <Col>
                            <Command edit={data.editable} recipeId={recipeId} recipe={recipe} serverURL={ctx.serverURL} />
                        </Col> */}
                    </Row>
                </Col>
                <Col lg={true} >
                    <Editor data={recipe.instruction.join("\n")}
                            id={"Instruction"}
                            dataCB={handleEditorChange} />
                </Col>
            </Row>
        </Container>
    );
}

export default Recipe