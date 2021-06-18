import { useHistory} from "react-router-dom";
import { RecipeProps } from './Recipe'

const RecipeNew = (props: any) => {
    const history = useHistory()
    // const location = useLocation()
    const arg: RecipeProps = {
        recipe:  JSON.parse('{"title":"", "ingredients":[], "instruction":[]}'),
        editable: true }
    history.push("/recipeEdit", arg)


    return (
        null
    )
}

export default RecipeNew