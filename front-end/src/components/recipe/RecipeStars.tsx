import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
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

    const onStarClick = (nextValue:number, prevValue:number, name:string) => {
        setRating(nextValue);
        if (params.cb !== undefined) {
            params.cb("rating", nextValue.toString())
        }
    }
    // dv-star-rating
    return (
            <StarRatingComponent

                editing={params.editable}
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={onStarClick.bind(this)}
            />
    );
}
export default RecipeStars