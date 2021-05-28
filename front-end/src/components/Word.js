import { Tooltip, } from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import React, {useContext} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import AppContext from "./context/app-context";

let color = new Map([
  ["Ingredient", "#14fc10"],
  ["Category", "#2d43fe"],
  ["Ignore ", "#fa750e"],
  ["Utensil", "#f4f4f4"],
  ["ByPass", "#ffffff"],
  ["Measure", "#993300"]
]); 
const setStyle = (c) => {
    return {
      background: color.get(c),
      padding: "2px 2px 2px 2px",
      border: "1px solid ",
      // borderBottom: "1px #ccc dotted",
      borderRadius: "90%",
    };
  };

  const GenContent = ({word, url}) => {
    // const { serverUrl } = useContext(AppContext);
    const handleSelect=(e)=>{
      console.log("handleSelect " + e + " on index:" + word.word );
      var postURl = url
      const entity = {
        name: word.word
      }
      switch (e) {
        case "1":
          postURl += "/ingredients"
          break;
          case "2":
          postURl += "/categories"
          break;
          case "3":
          postURl += "/utensils"
          break;
          case "4":
          postURl += "/ignore"
          break;
        default:
          break;
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    };
    fetch(postURl, requestOptions)
        .then(response => response.json());

    }
    return (
        <div>
          <h2>{word.word}</h2>
          <GenButton words={word} cb={handleSelect} />
        </div>
    );
}

const Word = ({word}) => {
  const { serverUrl } = useContext(AppContext);

  if (word.entity === "ByPass") {
    return (
      <div style={setStyle(word.entity)}>{word.word}</div>
    )
  } else
    return (
      <Tooltip
        title="Recipe"
        trigger="click"
        position="right"
        arrow = "true"
        size = "small"
        theme = "transparent"
        interactive
        html = {<GenContent word={word} url={serverUrl}/>}
      >
        <div style={setStyle(word.entity)}>{word.word}</div>
      </Tooltip>
    );
}
const GenButton = ({words, cb}) => {
  if (words.entity === "") {
    return (
    <DropdownButton as={ButtonGroup} title="type" id="bg-nested-dropdown" onSelect={cb}>
    <Dropdown.Item eventKey="1" >Ingredient</Dropdown.Item>
    <Dropdown.Item eventKey="2" >Category</Dropdown.Item>
    <Dropdown.Item eventKey="3" >Utensil</Dropdown.Item>
    <Dropdown.Item eventKey="4" >Ignore</Dropdown.Item>
    <Dropdown.Item eventKey="5" disabled >Measure</Dropdown.Item>
  </DropdownButton>
    );
  }
    else  {
      return (
      <DropdownButton as={ButtonGroup} title="type" id="bg-nested-dropdown" >
        <Dropdown.Item eventKey="1" disabled active={words.entity==='Ingredient' ? "true":""}>Ingredient</Dropdown.Item>
        <Dropdown.Item eventKey="2" disabled active={words.entity==='Category' ? "true":""}>Category</Dropdown.Item>
        <Dropdown.Item eventKey="3" disabled active={words.entity==='Utensil' ? "true":""} >Utensil</Dropdown.Item>
        <Dropdown.Item eventKey="4" disabled active={words.entity==='Ignore' ? "true":""}>Ignore</Dropdown.Item>
        <Dropdown.Item eventKey="5" disabled active={words.entity==='Measure' ? "true":""}>Measure</Dropdown.Item>
      </DropdownButton>
      );
    }
  }

export default Word

