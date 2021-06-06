import React from 'react'
import {SynthedNode} from './SynthedNode'
import {is, each} from '../utils'
import {Tag, Construct, Options} from './constructors'

const concat = Array.prototype.concat

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
    const {args, from, to, immediate, destination, context, children, ...other} = props
    const {tags, attrs, synthedNode} = Component

    const propsForElement = { ...other, ref }
    const elementToBeMade = attrs.as || props.as || 'div'

    const audioContext = props.context || synthedNode.parent.context // TODO || new AudioContext()
    const nextChildren = React.useMemo(() => {
        synthedNode.set(audioContext, tags, args)
        if (is.fun(children))
            return children(synthedNode)
        if (from)
            synthedNode.parent = concat(synthedNode.parent, from)
        each(concat(children, to), child => {
            child.type.synthedNode.parent = synthedNode
        })
        return children
    }, [context, synthedNode, audioContext, children])
    /**
     * destination
     */
    React.useEffect(() => {
        if (!destination) return
        synthedNode.connect(audioContext.destination)
        return () => synthedNode.disconnect(audioContext.destination)
    }, [synthedNode, audioContext, destination])
    /**
     * todo delete
     */
    React.useEffect(() => {
        // audioContext.resume()
        if (immediate)
            synthedNode.start()
        else
            synthedNode.stop()
    }, [synthedNode, immediate])

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
