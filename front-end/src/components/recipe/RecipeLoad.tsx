import { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import appContext from "../context/app-context";
import { RecipeProps } from './Recipe'


const RecipeLoad = (props: any) => {
    const location = useLocation()
    var id = location.state
    console.log("RecipeLoad id=" + id)

    var history = useHistory()
    const ctx = useContext(appContext)
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        };
        fetch(ctx.serverURL + '/recipes/' + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                var arg: RecipeProps = { id: String(id), recipe: data, editable: true }
                history.push("/recipeEdit", arg)
            });

    }, [id])
    return (
        null
    )
}

export default RecipeLoad