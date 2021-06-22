import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import appContext from "../context/app-context";
import Recipe  from "./Recipe"
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RecipeStars from "./RecipeStars";
import RecipeTitle from "./RecipeTitle";

const SearchResult = (data: any) => {
    useLocation();

    const ctx = useContext(appContext)
    const serverURL = ctx.serverURL
    // const [searchKey, setSearchKey] = useState(String(location.key))
    // const [searchTerms, setSearchTerms] = useState(String(location.state))
    const [searchTerms] = useState(ctx.recipeSearch)
    const [results, setResults] = useState<any[]>([]);
    const [error] = useState("")

    // console.log(">>>> SearchResult with location= [" + String(location.state) + "]")
    console.log(">>>> SearchResult with = [" + ctx.recipeSearch + "]")

    // setSearchTerms(String(location.state))
    // setSearchKey(String(location.key))
    useEffect(() => {
        console.log(">>>> SearchResult.useEffect with [" + searchTerms + "]")
        // fetchRecipe(searchTerms)
        var list = ctx.recipeSearch.split(" ")
        var postUrl = serverURL + "/recipes?ingredient="
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            postUrl += element
            if (i < list.length - 1) {
                postUrl += "&ingredient="
            }
        }
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(postUrl, requestOptions)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(err => {
                console.log(err) 
            })
        return () => {}

    }, [searchTerms, serverURL, ctx.recipeSearch])

    const history = useHistory()
    const handleClick = (e : MouseEvent<HTMLButtonElement>) => {
        history.push("/recipeLoad", e.currentTarget.id)
    }
    return (
        <div>
            {(() => {
                if (results.length > 0) {
                    return (
                        <Accordion allowMultipleExpanded={true}>
                            {results ? results.map(r => (
                                <AccordionItem key={r.id}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <RecipeTitle data={r} cb={handleClick} edit={false} />

                                            {/*{r.title}*/}
                                            {/*{'           '}*/}
                                            {/*<RecipeStars editable={false} rating={r.rating} />*/}
                                            {/*{'           '}*/}
                                            {/*<Button id={r.id} variant="secondary" size="sm" onClick={handleClick}>Zoom</Button>*/}
                                            {/*{'    '} <Button variant="outline-danger" size="sm" disabled={true}>Delete</Button>*/}
                                            {/*{'           '}*/}
                                            {/*{r.id}*/}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <Recipe recipe={r} editable={false} />
                                    </AccordionItemPanel>
                                </AccordionItem>
                            )) : null}
                        </Accordion>
                    )
                } else {
                    return (
                        <div>
                        <div>{error}</div>
                        
                        <div>no results </div>
                        </div>
                    )
                }
            })()}
        </div>
    )
}

export default SearchResult