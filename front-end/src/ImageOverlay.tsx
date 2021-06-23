import {Button, OverlayTrigger, Popover, PopoverContent, PopoverTitle} from "react-bootstrap";
import React from "react";
import ImagesUpload from "./components/images/ImagesUpload";
import CancelIcon from './resources/cancel.svg';
import CheckIcon from './resources/check.svg';

interface ImageOverlayI {

}
const cancel = () => {

}
const save = () => {

}

const popover = (
    <Popover id="popover-basic">
        <PopoverTitle as="h3">Add Images
            <img title="Save" style={{height: '16px', width: '16px'}} src={CheckIcon} alt="Save" onClick={save}/>
            <img title="Cancel" style={{height: '16px', width: '16px'}} src={CancelIcon} alt="Cancel"
                 onClick={cancel}/>
        </PopoverTitle>
        <PopoverContent>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
            <ImagesUpload />
        </PopoverContent>
    </Popover>
)
const ImageOverlay = (arg : ImageOverlayI) => {

    return (
        <OverlayTrigger trigger="click" placement="auto"  overlay={popover}>
            <Button variant="secondary" size="sm">images</Button>
        </OverlayTrigger>
    )

}
export default ImageOverlay