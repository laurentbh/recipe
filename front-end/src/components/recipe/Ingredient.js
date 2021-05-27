import React, {useState}   from 'react';
import IngredientControl  from "./IngredientControl";
import IngredientInput  from "./IngredientInput";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {parseRecipe} from '../../services/RecipeService'
// import AppContext from "../context/app-context";

const Ingredient= () =>  {
    var previous = []
    const [myMap, setMyMap] = useState(new Map()); 

    const updateMap = (k,v) => {
        // console.log("update myMap key="+k)
        setMyMap(new Map(myMap.set(k,v,myMap)))
        // myMap.forEach( (key,v) => {
        //     console.log("updateMap k:" + key )
        // })
      }
    const parseCB2 = (err, response) => {
        var list = response.getResultsList()
      list.forEach(e => {
          if (! myMap.has(e.getWord())) {
            //   console.log("adding " + e.getWord())
              updateMap(e.getWord(),
              {
                id: e.getId(),
                word: e.getWord(),
                identified: e.getIdentified(),
                entity: e.getEntity(),
                pos: e.getPosition(),
                index: e.getIndex()
                }
              )
          }
        })
    }

     const updatePrevious = async (input) => {
        //  console.log("updatePrevious with " + input)
        //  console.log("CALLING [" + input + "]")
        //  const response = await parseRecipe(input, parseCB2)
        var tmp = []
        input.split("\n").forEach(e => tmp.push(e));
        if (input.charAt(input.length-1) !== '\n') {
           tmp.pop()
        }
        var delta = tmp.filter(x => !previous.includes(x));

        for (var i = 0; i <delta.length; i++) {
            if (delta[i].length > 0) {
                // console.log("CALLING [" + delta[i]+"]")
                await parseRecipe(delta[i], parseCB2)
            }
        }
        previous = tmp
    }
    return (
        <Container>
            <Row>
                <Col>
                    <IngredientInput cb={updatePrevious}/>
                </Col>
                <Col >
                    <IngredientControl parsed={myMap}/> 
                </Col>
            </Row>
        </Container>
    )
}
export default Ingredient