import React from 'react'
import {AudioSynth} from './AudioSynth'
import {is} from '../../utils'
import {FlatSet} from '../utils'
import {Construct, Options} from '../constructors'

const $node: any = Symbol.for('Synthed:node')

function useSynthedAudio (
    component: Component,
    props: object,
    ref?: React.Ref<Element>,
): null | JSX.Element

function useSynthedAudio (Component: any, props: any, ref: any) {
    const {children, reverce, ...other} = props
    const next = React.useMemo(() => {
        this.connect(other)
        return React.Children.map(children, child => {
            if (child[$node]) {
                if (reverce)
                    child[$node].connect(this[$node])
                else
                    this.connect(child[$node])
            }
            return child
        })
    }, [children])
    return React.createElement(Component, {ref}, next)
}


export interface Component extends Construct {
    attrs: Attr[],
    config: Options,
    audioSynth: AudioSynth,
    displayName?: string | null,
}

export function SynthedAudio (
    tags: FlatSet<Component>,
    options: Options,
    args: FlatSet<Component>,
): Component

export function SynthedAudio (options: any, ...tags: any) {
    const [tag] = tags,
        isSynthed = !is.str(tag) && is.str(tag?.parsedId),
        displayName = getDisplayName(tag) || 'Anonymous',
        attrs = isSynthed && tag.attrs
            ? Array.prototype.concat(tag.attrs, options.attrs).filter(Boolean)
            : options.attrs || []

    const audioSynth = new AudioSynth (
       !isSynthed && tags,
        isSynthed && tag.audioSynth,
    )

    let Component: Component

    function render (props: any, ref: any) {
        return useSynthedAudio(Component, props, ref)
    }

    Component = React.forwardRef(render) as unknown as Component
    Component.attrs = attrs
    Component.config = options
    Component.audioSynth = audioSynth
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
