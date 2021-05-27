
import { useState } from "react";
import Autosuggest from "react-autosuggest";
import './search.css'

const SearchTest = () => {

  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([]);


  // TODO: should be const searchOnChange = (event : FormEvent<HTMLElement> ) => {
  const searchOnChange = (event , { newValue } ) => {
    // console.log(event)
    setSearchValue( newValue)
  };

  const onSuggestionsClearRequested = () => {
    setSearchResults([])
  }
  const buildQuey = (where , search )  => {
    var ret = {
      query : {
        multi_match : {
          query : search,
          type: "bool_prefix",
          fields: [
            where,
            where + "._2gram", 
            where + "._3gram"
          ]
        }
      },
      fields : [where],
      _source: false
    }
    return ret;
  }

  async function postSearch () {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildQuey("title", searchValue))
    };

    console.log(JSON.stringify(buildQuey("title", searchValue)))
    const res= await fetch("http://localhost:9200/lol/_search", requestOptions)
    const body = await res.json();
     if (res.status !== 200) {
        console.log("res: " + res.status + " body:"+ body.error);
    }
    else {
      console.log("res: " + res.status + " body:"+ body)
    }
    return body;
  }

  const onSuggestionsFetchRequested = () => {
    console.log("onSuggestionsFetchRequested for [" + searchValue + "]")
    postSearch().then(res => {
      const pay = res.hits.hits
      const results = pay.map(
        h  => {
          return {
            id : h._id,
            value: h.fields.title[0]
          }
        }
      )
      console.log("results :" + results)
      setSearchResults(results)
      }
    )
  }

  const focusInputOnSuggestionClick = true

  const getSuggestionValue = (suggestion ) => {
   return suggestion.value;

  }

  const inputProps = {
    placeholder: 'ingredient',
    value: searchValue,
    onChange: searchOnChange
  }
    return (
      <div>
        <Autosuggest
          inputProps={inputProps}
          suggestions={searchResults}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={RenderResults}
          focusInputOnSuggestionClick={focusInputOnSuggestionClick}
        />
      </div> 
    )
}


const RenderResults = (suggestion ) => {
  // console.log("RenderResults with " + suggestion )
  return (
    <div className="result">
      {/* <div>[{suggestion.id}] {suggestion.value}</div> */}
      <div>{suggestion.value}</div>
    </div>
  )
}

export default SearchTest