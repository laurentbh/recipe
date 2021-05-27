import React, {Component} from 'react';
import  ParseRecipe  from '../components/ParseRecipe'
// import parseRecipe  from './services/RecipeService'
import parseStreamRecipe from '../services/RecipeService'
import ResultRecipe from '../components/ResultRecipe'

class ParsingView extends Component {
  // TODO: check if those are really state (they are not use in render)
  // the bean, chicken, green bean and 3 ducks with a few potatoes, in the blender add some pepper and salt \
  //  put everything in the bean cooker until it reaches 400 degrees beef, do not use a food processor
  state = {
    recipeIn: '',
    recipe: {},
    parsingResults: []
  };

  clearRecipeOut = () => {
    this.setState({parsingResults: []})
  }
  parsingCB = (resp) => {
    console.log("App.parsingCb >> (" + resp.getId() + ") " +resp.getWord() + " identified " + resp.getIdentified())
    this.setState({ parsingResults: [...this.state.parsingResults, 
      { id: resp.getId(),
        word: resp.getWord(),
        identified: resp.getIdentified(),
        entity: resp.getEntity(),
        pos: resp.getPosition(),
        index: resp.getIndex()
      }] });

  }
  streamResult = (resp) => {
    console.log("streamResult " +resp.getWord() + " identified " + resp.getIdentified())
    this.state.recipeOut.push(resp.getId());
  }
  // function invoked by ParseRecipe component
  parseRecipe = (e) => {
    this.clearRecipeOut();
    console.log('in App parseRecipe() recipeIn=' + this.state.recipeIn)
    parseStreamRecipe(this.state.recipeIn, this.parsingCB)
      .then(response => {
        console.log("App.js stream complete");
    });
  }

onChangeForm = (e) => {
  console.log(e)

  if (e.target.name === 'recipeIn') {
    this.setState({recipeIn: e.target.value})
  }
}
  render() {
    
    return (
      <div className="App">
        {/* <Header></Header> */}
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
                <ParseRecipe
                  user={this.state.recipe} // dummy thing to pass state
                  onChangeForm={this.onChangeForm}
                  parseRecipeCB={this.parseRecipe}
                  >
                </ParseRecipe>
            </div>
        </div>
      </div>
        <ResultRecipe  result={this.state.parsingResults} />
      </div>
    );
  }
}

export default ParsingView;
