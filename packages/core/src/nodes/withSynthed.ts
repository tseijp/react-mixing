import React, {useEffect} from 'react'
import {SynthedValue} from './SynthedValue'
import {is, each} from '../utils'
import {Tag, Construct, Config} from './constructors'

export type AudioProps = {
    ref: React.Ref<Element>
    args: any[]
    reverse: boolean
    immediate: boolean,
    destination: boolean,
    children: null | JSX.Element | ((synthedNode: SynthedValue) => null | JSX.Element)
}

export function useSynthed (
    Component: Component,
    props: AudioProps,
    ref?: React.Ref<Element>
): null | JSX.Element

export function useSynthed (Component: any, props: any, ref: any) {
    const {tags=[], synthedNode: $} = Component
    let {args=[], from=[], to=[], context, immediate, destinate, children, ...other} = props

    if (to === true)
        destinate = to

    $.context = context
    $.set(tags, ...args)


    useEffect(() => $.destinate(destinate), [$, destinate])
    useEffect(() => $.immediate(immediate), [$, immediate])
    useEffect(() => each(from, node => $.parents.add(node)))
    useEffect(() => each(to, node => node?.type?.synthedNode?.parents.add?.($)))

    return React.createElement(props.as || 'div', { ...other, ref }, children($))
}

export interface Component extends Construct {
    tags?: Tag<Component>,
    attrs?: Attr[],
    config?: Config,
    synthedNode?: SynthedValue,
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

    const synthedNode = new SynthedValue()

    let Component: Component

    function Render (props: any, ref: any) {
        return useSynthed(Component, props, ref)
    }

    Component = React.forwardRef(Render) as unknown as Component
    Component.tags = tags
    Component.attrs = attrs
    Component.config = config
    Component.synthedNode = synthedNode
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
