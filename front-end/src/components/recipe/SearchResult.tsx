import React, {MouseEvent, useContext, useEffect, useState} from 'react';
import appContext from "../context/app-context";
import Recipe from "./Recipe"
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import {useHistory, useLocation} from 'react-router-dom';
import RecipeTitle from "./RecipeTitle";
import {PacmanLoader} from "react-spinners";
// import JSX = jsx.JSX;
// import PacmanLoader from "react-spinners/PacmanLoader";

const RenderWaiting = () : JSX.Element => {
    return (
        <PacmanLoader color={"green"} size={15} margin={5} />
    )
}
interface  RenderResultsI {
    results : any[],
    cb : (e : MouseEvent<HTMLButtonElement>) => void,
    error? : string | undefined

}
const RenderResults = (arg : RenderResultsI) : JSX.Element => {
    return (
        <div>
        {
        (arg.results.length > 0)  ? <RenderList results={arg.results} cb={arg.cb} />
            : <RenderNoResults error = {arg.error} />
        }
        </div>
    )
}

const RenderList = (arg : RenderResultsI) : JSX.Element => {
    return (
        <Accordion allowMultipleExpanded={true}>
            {arg.results ? arg.results.map(r => (
                <AccordionItem key={r.id}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <RecipeTitle data={r} cb={arg.cb} edit={false} />
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <Recipe recipe={r} editable={false} />
                    </AccordionItemPanel>
                </AccordionItem>
            )) : null}
        </Accordion>
    )
}
interface RenderNoResultsI {
    error ? : string | undefined
}
const RenderNoResults = (arg: RenderNoResultsI): JSX.Element => {
    return (
        <div>
            <div>{arg.error}</div>

            <div>no results</div>
        </div>
    )
}
const SearchResult = (data: any) => {
    useLocation();

    const ctx = useContext(appContext)
    const serverURL = ctx.serverURL
    const [loading, setLoading] = useState(true)
    const [searchTerms] = useState(ctx.recipeSearch)
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState("")

    console.log(">>>> SearchResult with = [" + ctx.recipeSearch + "]")

    const resultLoaded = (data : any[]) : void => {
        setLoading(false)
        setResults(data)
    }
    useEffect(() => {
        console.log(">>>> SearchResult.useEffect with [" + searchTerms + "]")
        // fetchRecipe(searchTerms)
        const list = ctx.recipeSearch.split(" ")
        let postUrl = serverURL + "/recipes?ingredient="
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
            .then(data => resultLoaded(data))
            .catch(err => {
                   setError(err)
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
            {
                loading  ? <RenderWaiting />
                    : <RenderResults results={results} cb={handleClick} error={error} />
            }
        </div>
    )
}

export default SearchResult