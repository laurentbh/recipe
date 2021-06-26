import React, {MouseEvent, useContext, useEffect, useState} from 'react';
import appContext from "../context/app-context";
import Recipe from "./Recipe"

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import {useHistory, useLocation} from 'react-router-dom';
import RecipeTitle from "./RecipeTitle";
import {PacmanLoader} from "react-spinners";
import {Accordion, AccordionContext, Card, useAccordionToggle} from "react-bootstrap";

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

interface CustomToggleI {
    children: any
    eventKey : string
}
const CustomToggle = (arg : CustomToggleI) => {
    const decoratedOnClick = useAccordionToggle(arg.eventKey, () => {} );
    const currentEventKey = useContext(AccordionContext);
    const isCurrentEventKey = currentEventKey === arg.eventKey;
    return (
        <button
            type="button"
            style={{  backgroundColor: isCurrentEventKey ? 'gray' : 'lightgray' }}
            onClick={decoratedOnClick}
        >
            {arg.children}
        </button>
    );
}
const RenderList = (arg : RenderResultsI) : JSX.Element => {
    return (
        <Accordion >
            {arg.results ? arg.results.map((r, index) => (
                    <Card>
                        <CustomToggle eventKey={String(index)} >
                            <RecipeTitle data={r} cb={arg.cb} edit={false} />
                        </CustomToggle>
                        <Accordion.Collapse eventKey={String(index)}>
                            <Card.Body>
                                <Recipe recipe={r} editable={false} />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
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
interface SearchResultI {
    searchItems : string
}
const SearchResult = (arg : SearchResultI) => {
    useLocation();

    const ctx = useContext(appContext)
    const serverURL = ctx.serverURL
    const [loading, setLoading] = useState(true)
    const [searchTerms] = useState(arg.searchItems)
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState("")

    console.log(">>>> SearchResult with = [" + arg.searchItems + "]")

    const resultLoaded = (data : any[]) : void => {
        setLoading(false)
        setResults(data)
    }
    useEffect(() => {
        async function handleResponse(res: Promise<Response>): Promise<void> {
            const ok = (await res).ok
            const status = (await res).status
            if (ok) {
                if (status === 200) {
                    (await res).json()
                        .then(data => resultLoaded(data))
                } else {
                    resultLoaded([])
                }
            }
            else {
                (await res).text()
                    .then(err => {
                        setLoading(false)
                        setError(err)
                    })
            }

        }
        console.log(">>>> SearchResult.useEffect with [" + searchTerms + "]")
        // fetchRecipe(searchTerms)
        const list = arg.searchItems.split(" ")
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
        const res = fetch(postUrl, requestOptions)
        handleResponse(res);
        return () => {}

    }, [arg.searchItems, serverURL])

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