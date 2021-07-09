import {is, each} from '../utils'
import {Synthed, setSynthed} from './Synthed'

export class SynthedValue<T = any> extends Synthed<AudioNode> {
    _ctx?: AudioContext
    _node?: AudioNode
    done = false
    parents = new Set<SynthedValue<T>>()

    constructor () {
        super()
        setSynthed(this, this)
    }

    get () {
        // todo get current value
        return this._node
    }

    set (tag: any, ...args: any[]) {
        if (is.str(tag)) this._node = (this._ctx as any || {})[`create${tag}`](...args)
        if (is.fun(tag)) this._node = tag(...args)
        if (this._node) each(this.parents, p => p._node?.connect(this._node!))
        return this
    }

    reset () {
        if (this._node)
            each(this.parents, p => p._node?.disconnect(this._node!))
        return this
    }

    get context () {
        return this._ctx || Array.from(this.parents).find(p => p.context)
    }

    set context (ctx: any) {
        this._ctx = ctx || this.context || new AudioContext()
    }

    destinate (destination: boolean) {
        const {_node, _ctx} = this
        if (!_node || !_ctx || !destination) return
        _node.connect(_ctx.destination)
        return () => _node.disconnect(_ctx.destination)
    }

    immediate (immediate: boolean) {
        const {_node, _ctx} = this
        if (_ctx && _ctx.state !== 'running')
            _ctx.resume();
        (_node as any || {})[immediate?'start': 'stop']?.()
    }
}
