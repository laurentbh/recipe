import React, {useContext } from 'react';
import {Editor, EditorState, RichUtils, CompositeDecorator} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { splitText } from "../utils/splitText";
import sseContext from "../context/sse-context";
import { useState } from 'react';
import EntityButtons  from "./EntityButtons";
import  {postEntity} from "../../services/entity_services.js";
import './editor.css';


function RecipeEditor() {

  const  ctx  = useContext(sseContext);

  const styles = {
    root: {
      fontFamily: '\'Helvetica\', sans-serif',
      padding: 20,
      width: 600,
    },
    editor: {
      border: '1px solid #ddd',
      cursor: 'text',
      fontSize: 16,
      minHeight: 40,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
    handle: {
      backgroundColor: '#99ddff',
      border: '1px solid #0077b3',
      borderRadius: '3px',
      direction: 'ltr',
      unicodeBidi: 'bidi-override',
    },
  };
  const HandleWord = (props) => {
    return (
      <span
        style={styles.handle}
        data-offset-key={props.offsetKey}
      >
        {props.children}
      </span>
    );
  };

 

  const isInContext = (w) => {
    // console.log("isInContext data= "+ ctx.data.size + " w=" + w.Word)
    // console.log("..." + ctx.data.get(w.Word))
    return ctx.data.get(w.Word) !== undefined
  }
  function handleStrategy(contentBlock, callback, contentState) {
    const text = contentBlock.getText();
    splitText(text).forEach (w => {
      if (isInContext(w) === true ) {
        callback(w.Start, w.Start+w.Word.length)
      }
    })
  }
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: handleStrategy,
      component: HandleWord,
    },
  ]);
  const [editorState, setEditorState] = React.useState(
    // () => EditorState.createWithContent(ContentState.createFromText("Hello banana"), compositeDecorator)
    () => EditorState.createEmpty(compositeDecorator),
  );

  var _onBoldClick =() => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  // Selection test
  const [sel, setSel] = useState('')
  
  var _onSelectionClick = () => {
    setSel(getSelectedText())
  }
  const getSelectedText = () => {
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();
    var end = selectionState.getEndOffset();
    return currentContentBlock.getText().slice(start, end);

  }
  var _onToggle = (e) => {
    console.log(">>> _onToggle : [" + e+"]")
    var selection = getSelectedText()
    if (selection.length !== 0) {
    postEntity(ctx.serverUrl, e, getSelectedText())
    }
  }
  const handleClick = (e) => {
    if (e.nativeEvent.which === 1) {
      console.log('Left click');
    } else if (e.nativeEvent.which === 3) {
      console.log('Right click');
    }
  }

  return (
    <div>
      <div>{sel}</div>
    <EntityButtons onToggle={_onToggle} />
    <button onClick={_onBoldClick.bind(this)}>Bold</button>
    <button onClick={_onSelectionClick.bind(this)}>Test Slection</button>
    <div onClick={handleClick} >
    <Editor 
      editorState={editorState}
      handleKeyCommand={handleKeyCommand}
      onChange={setEditorState}
      placeholder="What are the ingredients?"
    />

    </div>
    </div>
  );
}

export default RecipeEditor