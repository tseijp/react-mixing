import {is, each, eachProp} from '../utils'
import {SynthedValues} from './SynthedValues'
import {Synthed, getSynthed, setSynthed} from './Synthed'


export class SynthedValue<T = any> extends Synthed<AudioNode> {
    private _node?: AudioNode
    private _context?: AudioContext

    done = false
    parents = new Set<SynthedValue<T>>()

    constructor () {
        super()
        setSynthed(this, this)
    }


    get () {
        return this._node
    }


    set (value: AudioNode | AudioContext) {
        if (value instanceof AudioNode)
            this.node = value
        if (value instanceof AudioContext)
            this.context = value
        return this
    }

    reset () {
        if (!this._node)
            return this
        each(this.parents, node => node._node?.disconnect(this._node!))
        return this
    }

    get node () {
        return this._node
    }

    set node (node: any) {
        this._node = node
        this._context = node.context
        each(this.parents, node => node._node?.connect(this._node!))
    }


    get context () {
        return this._context || Array.from(this.parents).find(p => p.context)
    }

    set context (context: any) {
        this._context = context || new AudioContext()
    }

    destinate (destination=true) {
        const {_node, _context} = this
        if (!_node || !_context) return
        if (destination)
            _node.connect(_context.destination)
        else _node.disconnect(_context.destination)
    }

    immediate (immediate=true) {
        const {_node, _context} = this
        if (_context && _context.state !== 'running')
            _context.resume();
        (_node as any || {})[immediate? 'start': 'stop']?.()
        console.log(_node)
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
