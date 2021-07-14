import {is, each} from '../utils'
import {SynthedValues} from './SynthedValues'
import {Synthed, getSynthed, setSynthed} from './Synthed'


export class SynthedValue<T = any> extends Synthed<AudioNode> {
    private _ctx?: AudioContext
    private _node?: AudioNode
    done = false
    parents = new Set<SynthedValue<T>>()

    constructor () {
        super()
        setSynthed(this, this)
    }

    get () {
        return this._node
    }

    set (node: AudioNode) {
        this._node = node
        each(this.parents, node => node._node?.connect(this._node!))
        return this
    }

    reset () {
        if (!this._node) return this
        each(this.parents, node => node._node?.disconnect(this._node!))
        return this
    }

    get context () {
        return this._ctx || Array.from(this.parents).find(p => p.context)
    }

    set context (ctx: any) {
        this._ctx = ctx || this.context || new AudioContext()
    }

    destinate (destination=true) {
        const {_node, _ctx} = this
        if (!_node || !_ctx || !destination) return
        _node.connect(_ctx.destination)
        return () => _node.disconnect(_ctx.destination)
    }

    immediate (immediate=true) {
        const {_node, _ctx} = this
        if (_ctx && _ctx.state !== 'running')
            _ctx.resume();
        (_node as any || {})[immediate?'start': 'stop']?.()
    }
}

export const getSynthedType = (value: any) => {
    const parentNode = getSynthed(value)
    return parentNode
        ? (parentNode.constructor as any)
        : is.arr(value) || is.obj(value)
        ? SynthedValues
        : SynthedValue
}
