import React, {useState, useCallback, useMemo, useContext} from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { Text, createEditor, Node, Descendant } from 'slate'
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
    const [serial, setSerial] = useState('')


    const decorate = useCallback(
        ([node, path]) => {
            const getTokenType = (token : string) : string | undefined => {
                const ent : Entity | undefined = ctx.data.get(token)
                return ent !== undefined ? ent.type :  undefined
            }
            const ranges: any[] = []
            if (!Text.isText(node)) {
                return ranges
            }
            const tokens = ParseLine(node.text)

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
            }
            return ranges
        }, [ctx.data]
    )
    const serialize = (nodes : Descendant[]) : string => {
        const str : string = nodes.map(n  => {
            console.log(n + "  " + Node.string(n))
            return Node.string(n)
        }).join('\n')
        return str
    }
    return (
        <div>
        <Slate editor={editor} value={value}
               onChange={ (value) => {
                   setValue(value)
                   const content = JSON.stringify(value)
                   setStorage(content)
                   const children : Descendant[] = editor.children
                   setSerial(serialize(children))
                   // console.log(children)
                    }
               }>
            <Editable
                decorate={decorate}
                renderLeaf={renderLeaf}
                placeholder="Write something ..."
            />
        </Slate>
            <textarea value={storage} />
            <textarea value={serial} />
        </div>
    )
}

export default Editor