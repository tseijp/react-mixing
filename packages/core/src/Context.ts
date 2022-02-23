import {is} from './utils'

export class Context {
    audioContext: AudioContext

    constructor (ctx?: AudioContext) {
        this.audioContext = ctx || new AudioContext()
    }

    set onstatechange (onstatechange: any) {
        this.audioContext.onstatechange = onstatechange
    }

    createNode (...args: any[]) {
        return createNode(this, ...args)
    }

    get baseLatency () {return this.audioContext.baseLatency}

    get outputLatency () {return this.audioContext.outputLatency}

    get audioWorklet () {return this.audioContext.audioWorklet}

    get currentTime () {return this.audioContext.currentTime}

    get destination () {return this.audioContext.destination}

    get listener () {return this.audioContext.listener}

    get sampleRate () {return this.audioContext.sampleRate}

    get state () {return this.audioContext.state}
}

function createNode (ctx: any, target?: any) {
    const constructor = createNodeConstructor(ctx, target)
    if (is.fun(constructor))
        return constructor()
    return null
}

function createNodeConstructor (ctx: any, target: any) {
    if (is.str(target))
        return ctx.AudioContext[`create${target}`]

    if (is.fun(target))
        return () => target(ctx.AudioContext)

    return null
}
