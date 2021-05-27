import PlusIcon from '../../resources/append-blue-icon.svg';
import CheckIcon from '../../resources/check.svg';
import CancelIcon from '../../resources/cancel.svg';
import { ChangeEvent, useState } from 'react';
import { FieldSectionProps } from './RecipeSections';


const AddNewField = (param : FieldSectionProps) => {
    const [show, setShow] = useState(false)
    const [newField, setNewField] = useState('')
    const [newValue, setNewValue] = useState('')
    const expand = () => { setShow(true) }
    const cancel = () => { 
        setNewField('')
        setNewValue('')
        setShow(false)
    }
    const check = () => {
        if (param.data[newField] !== undefined) {
            console.log("field " + newField + " already exists")
        }
        else {
            param.cb(newField, newValue)
        }
        setShow(false)
    }

    return (
        <div>
            {!show ? 
            <div >
                <img style={{height:'16px', width: '16px'}} src={PlusIcon} alt="Add Field" onClick={expand} />
            </div> :
            <div>
                <Input field={newField} val={newValue} fieldCB={setNewField} valCB={setNewValue}/>
                <img style={{height:'16px', width: '16px'}} src={CheckIcon} alt="Save" onClick={check} />
                <img style={{height:'16px', width: '16px'}} src={CancelIcon} alt="Cancel" onClick={cancel} />
            </div>
            }
        </div>
    )
}
interface InputI  {
    field: string;
    val : string;
    fieldCB : ( v: string) => void;
    valCB : ( v: string) => void;

}
const Input = (param : InputI) => {
    const fieldCB = (event: ChangeEvent<HTMLInputElement> ) => {
        param.fieldCB(event.currentTarget.value)
    }
    return (
        <div>
            <div>field:</div><input type="text" value={param.field} onChange={fieldCB.bind(this)}/>
            <div>value:</div><input type="text" value={param.val} onChange={
                 (ev: React.ChangeEvent<HTMLInputElement>) : void => {
                     param.valCB(ev.target.value)
                 }
                }/>
        </div>
    )
}

export default AddNewField
