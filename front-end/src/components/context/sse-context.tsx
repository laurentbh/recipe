import { createContext } from "react";
import { Entity } from "../../data/entity";


export interface SseContext {
    isLoading : boolean,
    data : Map<string, Entity>,
    // setDataCB : Function,
    size : number,
    setSize : Function

}
const sseContext = createContext<SseContext>(
    {
        isLoading: true,
        data : new Map<string, Entity>(),
        // setDataCB : () => {},
        size: 0,
        setSize : () => {}
    }
);
export default sseContext
