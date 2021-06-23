import { createContext } from "react";
import configData from "../../config.json";


export interface RecipeContext {
    serverURL: string
}
const appContext = createContext<RecipeContext>(
    {
        serverURL: configData.BACKEND_SERVER+":"+configData.BACKEND_PORT
    }
);
export default appContext
