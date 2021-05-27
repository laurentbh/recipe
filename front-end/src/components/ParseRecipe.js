import React from 'react'


const ParseRecipe = ({onChangeForm, parseRecipeCB }) => {

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Parse String</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputString">Input A Recipe</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}
                            className="form-control" name="recipeIn" id="recipeIn" placeholder="string data" />
                        </div>
                    </div>
                    <button type="button" onClick= {(e) => parseRecipeCB()} className="btn btn-danger">Parse</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default ParseRecipe