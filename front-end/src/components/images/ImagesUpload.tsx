import React, {MouseEvent, useContext} from 'react';
import ImageUploading, {ImageListType} from '../ReactimageUploading/ReactImageUploading';
import {ImageType} from '../ReactimageUploading/typings';
import AppContext from "../context/app-context";

interface ImagesUploadI {

}

const ImagesUpload = (args : ImagesUploadI) => {
    const ctx  = useContext(AppContext);
    const serverUrl = ctx.serverURL
    const [images, setImages] = React.useState<ImageType[]>([]);

    const onChange = ( imageList: ImageListType, addUpdateIndex: number[] | undefined ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };

    const push = (event : MouseEvent<HTMLButtonElement> ) => {
        const formData = new FormData();
        console.log("Click nb images = " + images.length)
        for (let i=0; i< images.length; i++ ) {
            const what = images[i].file
            console.log(i + " --> " + images[i])
            formData.append('upload[]', images[i].file!);
        }

        const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'multipart/form-data'},
            body: formData,
        };
        fetch(serverUrl+"/recipes/images", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <ImageUploading value={images} onChange={onChange} multiple={true}>
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>Remove all images</button>

                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['dataURL']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            <button onClick={push}>Pubish</button>
        </div>
    )
}
export default ImagesUpload