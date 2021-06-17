import React, {useState, useCallback, useMemo, useContext} from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { Text, createEditor, Element as SlateElement, Descendant } from 'slate'
import { withHistory } from 'slate-history'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './editor.css';

// >> needed for TS
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import RawToSLate, {ParseLine} from "./EditorUtils";
import sseContext from "../context/sse-context";
import {Entity} from "../../data/entity";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
// <<

// @ts-ignore
const Leaf = ({ attributes, children, leaf }) => {
    return (
        <span
            {...attributes}
            className css={css`
            font-family: monospace;
            background: hsla(0, 0%, 100%, .5);

            ${leaf.Ingredient &&
                css`
                background-color: lightgreen;
                border-radius: 4px;
            `}
            ${leaf.Utensil &&
                css`
                background-color: lightgray;
                border-radius: 4px;
            `}
            ${leaf.Category &&
                css`
                background-color: lightblue;
                border-radius: 4px;
            `}
         `}
        >
      {children}
    </span>
    )
}
const Editor = () => {
    const  ctx  = useContext(sseContext);

    const [value, setValue] = useState<Descendant[]>(
        RawToSLate("bea")
        // initialValue
    )
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [storage, setStorage] = useState('')

    const getTokenType = (token : string) : string | undefined => {
        const ent : Entity | undefined = ctx.data.get(token)
        // console.log("token: " + token + "  -> " + ent?.type)
        return ent !== undefined ? ent.type :  undefined
    }
    const decorate = useCallback(
        ([node, path]) => {
            const ranges: any[] = []
            if (!Text.isText(node)) {
                return ranges
            }
            const tokens = ParseLine(node.text)
            let start = 0

            for (const token of tokens) {
                const length = token.length
                const end = token.offset + length

                const type : string | undefined = getTokenType(token.value)
                if (type !== undefined) {
                    ranges.push({
                        [type]: true,
                        anchor: { path, offset: token.offset},
                        focus: { path, offset: end },
                    })
                }
                start = end
            }

            return ranges
        }, []
    )
    return (
        <div>
        <Slate editor={editor} value={value}
               onChange={ (value) => {
                   setValue(value)
                   const content = JSON.stringify(value)
                   setStorage(content)
                    }
               }>
            {/*<div>*/}
            {/*    contentEditable={false}*/}
            {/*    style={{ position: 'relative', top: '5px', right: '5px' }}*/}
            {/*</div>*/}
            <Editable
                decorate={decorate}
                renderLeaf={renderLeaf}
                placeholder="Write something ..."
            />
        </Slate>
            <textarea value={storage} />
        </div>
    )
}

export default Editor