import { createContext } from "react";
import configData from "../../config.json";


export interface RecipeContext {
    serverURL: string
    recipeSearch: string
}
const appContext = createContext<RecipeContext>(
    {
        serverURL: configData.BACKEND_SERVER+":"+configData.BACKEND_PORT,
        recipeSearch: ""
    }
);
export default appContext
