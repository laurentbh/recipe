import React, { useState, useCallback, useMemo } from 'react'
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
    // console.log(">>> LEAF " + leaf.comment)
    return (
        <span
            {...attributes}
            className css={css`
            font-family: monospace;
            background: hsla(0, 0%, 100%, .5);

        ${leaf.comment &&
            css`
            // padding: 32px;
      background-color: hotpink;
      // font-size: 24px;
      border-radius: 4px;
          `}
         `}
        >
      {children}
    </span>
    )
}
const Editor = () => {
    const [value, setValue] = useState<Descendant[]>(
        RawToSLate("line 1 chicken\nline2\\tline3  chicken")
        // initialValue
    )
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [storage, setStorage] = useState('')

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

                if (token.value === "chicken") {
                    ranges.push({
                        ['comment']: true,
                        anchor: { path, offset: token.offset},
                        focus: { path, offset: end },
                    })
                }
                // if (typeof token !== 'string') {
                //     ranges.push({
                //         [token.type]: true,
                //         anchor: { path, offset: start },
                //         focus: { path, offset: end },
                //     })
                // }
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