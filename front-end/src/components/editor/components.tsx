import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
/** @jsxImportSource @emotion/react */
import { jsx, css, Global, ClassNames } from '@emotion/react'
// import {  css } from '@emotion/react'
// import { cx, css } from '@emotion/css/macro'

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

// @ts-ignore
export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
      <ClassNames>
          {({ css, cx }) => (
    <span
      {...props}
      // @ts-ignore
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )}
    />
          )}
      </ClassNames>
  )
)

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any
      } & BaseProps
    >,
    ref: Ref<OrNull<null>>
  ) => {
    const textLines = value.document.nodes
        // @ts-ignore
      .map(node => node.text)
      .toArray()
      .join('\n')
      return (
        <ClassNames>
            {({ css, cx }) => (
      <div
        {...props}
        // @ts-ignore
        ref={ref}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `
        )}
      >
        <div
            // @ts-ignore
          className css={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slate's value as text
        </div>
        <div
            // @ts-ignore
          className css={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
            )}
        </ClassNames>
    )
  }
)

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
      <ClassNames>
          {({ css, cx }) => (
    <span
      {...props}
        // @ts-ignore
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    />
          )}
      </ClassNames>
  )
)

export const Instruction = React.forwardRef(
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
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
          )}
      </ClassNames>
  )
)

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

// @ts-ignore
export const Portal = ( children:any ) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
      <ClassNames>
          {({ css, cx }) => (
              <Menu
                  {...props}
                  // @ts-ignore
                  ref={ref}
                  className={cx(
                      className,
                      css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
                  )}
              />
          )}
      </ClassNames>
  )
)
