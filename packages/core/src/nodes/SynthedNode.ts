import {is, each} from '../utils'
import {Synthed} from './Synthed'
export class SynthedNode<T = any> extends Synthed<T> {
    node?: AudioNode
    context?: AudioContext
    parents: SynthedNode<T>[] = []
    calledStop: boolean = false
    calledStart: boolean = false

    done = true
    elapsedTime = 0
    lastPosition = 0
    durationProgress = 0

    constructor () {
        super()
        this.get = this.get.bind(this)
        this.set = this.set.bind(this)
        this.reset = this.reset.bind(this)
    }

    get () {
        return this.node as any
    }

    set (ctx: any, ...tags: any[]) {
        const [tag, ...args] = tags
        if (ctx || this.parents.length)
            this.context = ctx || this.parents?.find(parent => parent.context)
        if (is.str(tag) && is.fun(ctx[`create${tag}`]))
            this.node = ctx[`create${tag}`]()
        if (is.fun(tag))
            this.node = tag(...args)
        if (this.parents && this.node)
            each(this.parents, parent => parent.node?.connect(this.node!))
        return this
    }

    reset () {
        this.done = false
        if (is.num(this.node)) {
            this.elapsedTime = 0
            this.durationProgress = 0
            this.lastPosition = this.node
        }
        return this
    }

    start () {
        if (!this.calledStop && is.fun((this.node as any)?.start)) {
            (this.node as any)?.start()
            this.calledStart = true
        }
        return this
    }

    stop () {
        if (this.calledStart && is.fun((this.node as any)?.stop)) {
            (this.node as any)?.stop()
            this.calledStop = true
        }
        return this
    }
}
