import {Button, OverlayTrigger, Popover, PopoverContent, PopoverTitle} from "react-bootstrap";
import React from "react";
import ImagesUpload from "./components/images/ImagesUpload";

interface ImageOverlayI {

}

const popover = (
    <Popover id="popover-basic">
        <PopoverTitle as="h3">Add Images</PopoverTitle>
        <PopoverContent>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
            <ImagesUpload />
        </PopoverContent>
    </Popover>
)
const ImageOverlay = (arg : ImageOverlayI) => {

    return (
        <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
            <Button variant="secondary" size="sm">images</Button>
        </OverlayTrigger>
    )

}
export default ImageOverlay