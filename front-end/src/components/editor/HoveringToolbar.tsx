import React, {useEffect, useRef, Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import {ReactEditor, useSlate} from "slate-react";
import { jsx, css, Global, ClassNames } from '@emotion/react'

import {
    Editor,
    Transforms,
    Text,
    createEditor,
    Element,
    Descendant,
} from 'slate'
import { Range } from 'slate'
import {Button, Icon, Portal} from "./components";

const HoveringToolbar = () => {
    const ref = useRef<HTMLDivElement | null>()
    const editor = useSlate()

    useEffect(() => {
        const el = ref.current
        const { selection } = editor

        if (!el) {
            return
        }

        if (
            !selection ||
            !ReactEditor.isFocused(editor) ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        // @ts-ignore
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        el.style.opacity = '1'
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
        el.style.left = `${rect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        rect.width / 2}px`
    })

    return (
        <Portal>
        {/*    <Menu*/}
        {/*        // @ts-ignore*/}
        {/*        ref={ref}*/}
        {/*        className={css`*/}
        {/*  padding: 8px 7px 6px;*/}
        {/*  position: absolute;*/}
        {/*  z-index: 1;*/}
        {/*  top: -10000px;*/}
        {/*  left: -10000px;*/}
        {/*  margin-top: -6px;*/}
        {/*  opacity: 0;*/}
        {/*  background-color: #222;*/}
        {/*  border-radius: 4px;*/}
        {/*  transition: opacity 0.75s;*/}
        {/*`}*/}
        {/*    >*/}
                <FormatButton format="bold" icon="format_bold" />
                <FormatButton format="italic" icon="format_italic" />
                <FormatButton format="underlined" icon="format_underlined" />
        {/*    </Menu>*/}
        </Portal>
    )
}

interface BaseProps {
    className: string
    [key: string]: unknown
}
type OrNull<T> = T | null
export const Menu = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => (
        <ClassNames>
            {({ css, cx }) => (
        <div
            {...props}
            // @ts-ignore
            ref={ref}
            className={cx(
                className,
                css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
            )}
        />
            )}
        </ClassNames>
    )
)

const toggleFormat = (editor : any, format : string) => {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
        editor,
        { [format]: isActive ? null : true },
        { match: Text.isText, split: true }
    )
}

const isFormatActive = (editor : any, format : any) => {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
        // @ts-ignore
        match: n => n[format] === true,
        mode: 'all',
    })
    return !!match
}
const FormatButton = ( format : any, icon : any ) => {
    const editor = useSlate()
    return (
        <Button
            reversed
            active={isFormatActive(editor, format)}
            // @ts-ignore
            onMouseDown={event => {
                event.preventDefault()
                toggleFormat(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}
export default HoveringToolbar