import { useHistory} from "react-router-dom";
import { RecipeProps } from './Recipe'

const RecipeNew = (props: any) => {
    var history = useHistory()
    // const location = useLocation()
    var arg: RecipeProps = {
        recipe:  JSON.parse('{"title":"", "ingredients":[], "instruction":""}'),
        editable: true }
    history.push("/recipeEdit", arg)


    return (
        null
    )
}

export default RecipeNew