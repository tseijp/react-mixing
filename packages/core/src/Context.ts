import {is} from './utils'

const G = {} as any // TODO global value

export class Context {
    readonly _context: AudioContext

    constructor (ctx?: AudioContext) {
        this._context = ctx || G.context || new AudioContext()
    }

    set onstatechange (onstatechange: any) {
        this._context.onstatechange = onstatechange
    }

    createNode (...args: any[]) {
        return createNode(this, ...args)
    }

    get baseLatency () {return this._context.baseLatency}

    get outputLatency () {return this._context.outputLatency}

    get audioWorklet () {return this._context.audioWorklet}

    get currentTime () {return this._context.currentTime}

    get destination () {return this._context.destination}

    get listener () {return this._context.listener}

    get sampleRate () {return this._context.sampleRate}

    get state () {return this._context.state}
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
