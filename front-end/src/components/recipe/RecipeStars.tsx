import React, {useState} from 'react';
import {Rating, RatingView} from "react-simple-star-rating";

interface RecipeStarsI {
    editable: boolean
    rating: string
    cb?: (k: string, v: string) => void;
}

const RecipeStars = (params: RecipeStarsI) => {
    const [rating, setRating] = useState(() => {
            if (params.rating === undefined || params.rating === "") return 0
            return parseInt(params.rating, 10)
        }
    )

    const handleRating = (index: number) => {
        setRating(index)
        if (params.cb !== undefined) {
            params.cb("rating", index.toString())
        }
    }
    if (params.editable) {
        return (
            <Rating
                onClick={handleRating}
                ratingValue={rating}
                size={20}
                transition
                fillColor='orange'
                emptyColor='gray'
                className='foo' // Will remove the inline style if applied
            />
        );
    } else {
        return (
            <RatingView ratingValue={rating}/>
        )
    }
}
export default RecipeStars