import React, { ChangeEvent } from 'react';
import  AddNewField  from "./RecipeNewField";
import TimeInput from "../TimeInput";

type FieldValueProps = {
    field : string;
    value: any;
    editable: boolean;
    cb : ( k: string, v: string) => void;
  };

const FieldValue = (params : FieldValueProps) => {
    var handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        params.cb(event.target.id, event.currentTarget.value);
     }
    if (params.editable) {
        return <input type="text" id={params.field} value={params.value} onChange={handleChange.bind(this)}/>
    }
    return <span>{params.value}</span> 

}
export interface TimeSectionProps {
    data: any;
    editable: boolean;
    cb : ( k: string, v : string) => void;
}
const TimeSection = (params : TimeSectionProps ) => {
    // console.log(">>> TimeSection " + params.data["total_time"])
    const recipe = params.data
    const na = (params.editable === true ? "0":"0")
    const total = (recipe["total_time"] !== undefined ? recipe["total_time"] : na)
    const prep = (recipe["prep_time"] !== undefined ? recipe["prep_time"] : na)
    const cook = (recipe["cook_time"] !== undefined ? recipe["cook_time"] : na)

    return (
        <div>
            <TimeInput editable={params.editable} value={total} label={"total"} field={"total_time"} cb={params.cb} />
            <TimeInput editable={params.editable} value={prep} label={"prep"} field={"prep_time"} cb={params.cb} />
            <TimeInput editable={params.editable} value={cook} label={"cook"} field={"cook_time"} cb={params.cb} />

            <div className="field-field-total-time"><span className="search-recipe-field">total:</span>
            <FieldValue field="total_time" value={total} editable ={params.editable} cb={params.cb} />
            </div>
            <div><span className="search-recipe-field">prep:</span>
            <FieldValue field="prep_time" value={prep} editable ={params.editable} cb={params.cb} />
            </div>
            <div><span className="search-recipe-field">cook:</span>
            <FieldValue field="cook_time" value={cook} editable ={params.editable} cb={params.cb} />
            </div>
        </div>
    )
}

type RecipeFieldProps = {
    name: string;
    value: string;
    editable: boolean;
    cb : ( k: string, v : string) => void;
}
const RecipeField = (param:RecipeFieldProps) => {
    return (
        <div>
            <span className="search-recipe-field">{param.name}:</span>
            <FieldValue field={param.name} value={param.value} editable={param.editable} cb={param.cb} />
        </div>
    )
}
export interface FieldSectionProps  {
    data: any;
    editable: boolean;
    cb : ( k: string, v : string) => void;
}
const OtherSection = (param : FieldSectionProps) => {
    let exclude: String[] = ["title", "total_time", "prep_time", "cook_time", "id", "ingredients", "instruction", "references"]
    var jsx = Object.keys(param.data).map(key => {
        if (!exclude.find(el => el === key)) {
            return <RecipeField key={key} name={key} value={param.data[key]} editable={param.editable} cb={param.cb} />
        }
        return <></>
    })
    if (param.editable) {
        jsx.push(AddNewField(param))
    }

    return (
        <div>{jsx}</div>
    )
}

export { TimeSection, OtherSection, FieldValue }