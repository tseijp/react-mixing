import React from 'react'
import {AudioSynth} from './AudioSynth'
import {
    construct,
    Attrs,
    Options,
    Construct,
} from '../constructors'
import {resolveAttrs, FlatSet} from '../utils'
import {is} from '../../utils'

export interface SynthedAudio extends Construct {
    attrs: Attr[],
    config: Options,
    audioNode: any,
    audioSynth: AudioSynth,
}

function useSynthedAudio (
    component: SynthedAudio,
    props: object,
    ref: React.Ref<Element>,
): React.ReactNode

function useSynthedAudio (component: any, props: any, ref: any) {
    const {children} = props
    // this.connect(other)
    // if (children[node]) {
    //   if (reverce)
    //     children[node].connect(this[node])
    //   else
    //     this.connect(children[node])
    // }
    const wrappedChildren = React.useMemo(() => {
        return []
    }, [children])

    return React.createElement()
}

export function SynthedAudio (
    tags: FlatSet,
    options: Options,
    args: FlatSet,
): SynthedAudio

// tag: main
// arg: input

export function SynthedAudio (tags: any, options: any, args: any) {
    const [tag] = tags, [arg] = args,
        isTagSynthedAudio = !is.str(tag) && is.str(tag?.parsedId),
        isArgSynthedAudio = !is.str(arg) && is.str(arg?.parsedId),
        attrs = isTagSynthedAudio && tag.attrs
            ? Array.prototype.concat(tag.attrs, options.attrs).filter(Boolean)
            : options.attrs || []

    const audioSynth = new AudioSynth (
       !isTagSynthedAudio && tags,
        isTagSynthedAudio && tag.audioSynth,
        isArgSynthedAudio && arg.audioSynth,
       !isArgSynthedAudio && args
    )

    const audioNode = new AudioNode()

    let SynthedAudio: SynthedAudio

    function render (props: any, ref: any) {
        return useSynthedAudio(SynthedAudio, props, ref)
    }

    SynthedAudio = React.forwardRef(render) as SynthedAudio

    SynthedAudio.attrs = attrs
    SynthedAudio.config = options
    SynthedAudio.audioNode = audioNode
    SynthedAudio.audioSynth = audioSynth

    SynthedAudio.withAttrs = (attrs: Attrs) =>
        construct(SynthedAudio, options, args).withAttrs(attrs)

    SynthedAudio.withConfig = (configs: Options) =>
        construct(SynthedAudio, options, args).withConfig(configs)

    return SynthedAudio
}
