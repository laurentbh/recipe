import React, { useState } from 'react';
import Rating from "../rating/Rating";
interface  RecipeStarsI {
    editable : boolean
    rating : string
    cb? : ( k: string, v : string) => void;
}
const RecipeStars = (params : RecipeStarsI) => {
    const [rating, setRating] = useState( () => {
        if (params.rating === undefined || params.rating === "") return 0
        return parseInt(params.rating,10)
        }
    )

    // const onStarClick = (nextValue:number, prevValue:number, name:string) => {
    //     setRating(nextValue);
    //     if (params.cb !== undefined) {
    //         params.cb("rating", nextValue.toString())
    //     }
    // }
    const handleRating = (index : number ) => {
        setRating(index)
        if (params.cb !== undefined) {
            params.cb("rating", index.toString())
        }
    }
    // dv-star-rating
    return (
        <Rating
            onClick={handleRating}
            ratingValue={rating}
            size={20}
            editable={params.editable}
            transition
            fillColor='orange'
            emptyColor='gray'
            className='foo' // Will remove the inline style if applied
        />
    );
}
export default RecipeStars