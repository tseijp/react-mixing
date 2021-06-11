import React, {useEffect} from 'react'
import {SynthedNode} from './SynthedNode'
import {is, each} from '../utils'
import {Tag, Construct, Options} from './constructors'

export type AudioProps = {
    ref: React.Ref<Element>
    args: any[]
    reverse: boolean
    immediate: boolean,
    destination: boolean,
    children: null | JSX.Element | ((synthedNode: SynthedNode) => null | JSX.Element)
}

function useSynthedAudio (
    Component: Component,
    props: AudioProps,
    ref?: React.Ref<Element>
): null | JSX.Element

function useSynthedAudio (Component: any, props: any, ref: any) {
    const {args=[], from=[], to=[], immediate, destinate, context, children, ...other} = props
    const {tags=[], synthedNode: _} = Component

    const propsForElement = { ...other, ref }
    const elementToBeMade = props.as || 'div'

    const nextChildren = React.useMemo(() => {
        _.context = context
        _.set(tags, ...args)
        if (is.fun(children)) return children(_)
        const childs = Array.prototype.concat(children, to)
        each(childs, child => child?.type?.synthedNode?.parents.add(_))
        each(from, parent => _.parents.add(parent))
        return children
    }, [context, _, tags, args, from, to, children])

    useEffect(() => _.destinate(destinate), [_, destinate])
    useEffect(() => _.immediate(immediate), [_, immediate])

    return React.createElement(elementToBeMade, propsForElement, nextChildren)
}

export interface Component extends Construct {
    tags?: Tag<Component>,
    attrs?: Attr[],
    config?: Options,
    synthedNode?: SynthedNode,
    displayName?: string | null,
}

export function withSynthed (
    options: Options,
    tags: Set<Component>
): Component

export function withSynthed (options: any, tags: any) {
    const [tag] = tags,
        isSynthed = !is.str(tag) && is.str(tag?.displayName),
        displayName = getDisplayName(tag) || 'Anonymous',
        attrs = isSynthed && tag.attrs
            ? Array.prototype.concat(tag.attrs, options.attrs).filter(Boolean)
            : options.attrs || []

    const synthedNode = new SynthedNode()

    let Component: Component

    function render (props: any, ref: any) {
        return useSynthedAudio(Component, props, ref)
    }

    Component = React.forwardRef(render) as unknown as Component
    Component.tags = tags
    Component.attrs = attrs
    Component.config = options
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
