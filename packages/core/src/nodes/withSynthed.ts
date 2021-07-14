import React, {useEffect, createElement} from 'react'
import {SynthedValue} from './SynthedValue'
import {node} from './constructors'
import {is, each, useOnce} from '../utils'
import {Tag, Construct, Config} from './constructors'

export type AudioProps = {
    ref: React.Ref<Element>
    args: any[]
    reverse: boolean
    immediate: boolean,
    destinate: boolean,
    from: any,
    to: any,
    children: null | JSX.Element | ((synthedValue: SynthedValue) => null | JSX.Element)
}

export function useSynthed (
    Component: Component,
    props: AudioProps,
    ref?: React.Ref<Element>
): null | JSX.Element

export function useSynthed (Component: any, props: any, ref: any) {
    const {tags=[], synthedValue: $} = Component
    let {args=[], from=[], to=[], on, context, children, ...other} = props

    useOnce(() => void ($.context = context))
    useOnce(() => void ($.set(node(tags, ...args))))

    useEffect(() => each(from, node => $.parents.add(node)), [from])
    useEffect(() => each(to, node => node.parents.add($)), [to])

    useEffect(() => void (is.bol(on) && $.immediate(on)), [on])
    useEffect(() => void (is.bol(to) && $.destinate(to)), [to])

    return createElement(props.as || 'div', { ...other, ref}, children($))
}

export interface Component extends Construct {
    tags?: Tag<Component>,
    attrs?: Attr[],
    config?: Config,
    synthedValue?: SynthedValue,
    displayName?: string | null,
}

export function withSynthed (
    config: Config,
    tags: Set<Component>
): Component

export function withSynthed (config: any, tags: any) {
    const [tag] = tags,
        isSynthed = !is.str(tag) && is.str(tag?.displayName),
        displayName = getDisplayName(tag) || 'Anonymous',
        attrs = isSynthed && tag.attrs
            ? Array.prototype.concat(tag.attrs, config.attrs).filter(Boolean)
            : config.attrs || []

    const synthedValue = new SynthedValue()

    let Component: Component

    function Render (props: any, ref: any) {
        return useSynthed(Component, props, ref)
    }

    Component = React.forwardRef(Render) as unknown as Component
    Component.tags = tags
    Component.attrs = attrs
    Component.config = config
    Component.synthedValue = synthedValue
    Component.displayName = displayName
    Component.toString = () => `.${Component.displayName}`;

    return Component
}

const getDisplayName = (arg: any) =>
    is.str(arg)
        ? arg
        : is.str(arg?.displayName)
        ? arg.displayName
        : (is.fun(arg) && arg.name) || null
