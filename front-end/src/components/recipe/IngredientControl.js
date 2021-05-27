import React  from 'react';
import Word from '../Word'

const IngredientControl = ( {parsed} ) =>  {
    var known =[]
    var unknown = []
    parsed.forEach(values => {
        if (values.identified) {
            known.push(values)
        } else {
            unknown.push(values)
        }
    })
    // console.log("known:" + known.length + " unknown:" + unknown.length)

    return (
        <div className="flex-container"> 
        <div> Unknown:
            <div>
            {
                unknown.map(u => <Word key={u.word} word={u} />)
                // Array.from(parsed.values()).map( (v) =>(
                //     <Word key={v.id} word={v} />))
            }
            </div>
        </div>
        <div> known:
            <div>
            {
                known.map(u => <Word key={u.id} word={u} />)
            }
            </div>
        </div>
        </div>
    );
}
export default IngredientControl