import {filter} from '../context/loader'
import { Entity } from "../../data/entity";

type ListEntityProps = {
    type: string,
    data : Map<string, Entity>
}
const ListEntity = (props :ListEntityProps) => {

    console.log(">>>> ListEntity2")
    const Loading = () => {
        return (
            <div>
                <div>Loading {props.type}</div>
                <span>Loading...</span>
            </div>
        )
    }
    const RenderList = () => {
        return (
            <div>
                <div>Render {props.type}</div>
            <ul>
                {
                    filter(props.type, props.data).map(
                         (e , index) => {
                            return  <li key={e.id}>id:{e.id} name:{e.name}</li>
                         }
                    )
                 }
             </ul>
            </div>
        )
    }

    if (props.data.size === 0) {
        return Loading();
    }
    else {
        return RenderList();
    }
}
export default ListEntity