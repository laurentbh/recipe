import { ChangeEvent, useState } from "react"


interface ChildPropsI  {
    editable : boolean;
    data: any,
    cb : (field:string, value:string) => void
}
const Parent = () => {
    const payload = '{"key1":"val1", "key2":"val2", "ing": ["one","two"]}'
    const obj = JSON.parse(payload)
    const [data, setData] = useState<any>( obj)

    const globalCB = (field : string, value: string) => {
        console.log(">>> globalCB on " + field + " => " + value)
        setData((p:any) => ({
            ...p, [field]: value
        }));
    }

    return (
        <Child editable={true} data={data} cb={globalCB}/>
    )
}

const Child = (props : ChildPropsI) => {
    const myKey = "key1"
    var handleChange = (event : ChangeEvent<HTMLInputElement> ) => {
        console.log("hanleChange on " + event.target.id + " . " + event.target.value)
        props.cb( event.target.id, event.currentTarget.value);
    }
    return (
        <div>
            <div>key1:</div>
            <input type="text" value={props.data["key1"]} id={myKey} onChange={handleChange}/>
        </div>
    )
}

export default Parent

