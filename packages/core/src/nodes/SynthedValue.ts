import {is, each} from '../utils'
import {node} from './constructors'
import {SynthedValues} from './SynthedValues'
import {Synthed, getSynthed, setSynthed} from './Synthed'

export class SynthedValue<T = any> extends Synthed<AudioNode> {
    private _node?: AudioNode | {(ctx: AudioContext): AudioNode};
    private _parents = new Set<SynthedValue<T>>();

    done = false
    finalized = false;
    initialized = false;

    constructor (value?: any) {
        super();
        if (value) this.set(value)
        setSynthed(this, this);
    }

    get (synthed=true) {
        if (synthed)
            return undefined
        return this.node;
    }

    set (value: any) {
        this.node = value;
        return this;
    }

    reset () {
        this._finalize();
        this._initialize();
        return this;
    }

    get node () {
        return this._node; // node(this._node);
    }

    set node (value: any) {
        this._node = value; // todo value ctx => ...
    }

    get context () {
        return this.node?.context
    }

    effect (on: any, to: any) {
        if (is.bol(on)) this.on(on);
        else each(node(on), n => this._parents.add(n));
        if (is.bol(to)) this.to(to)
        else each(node(to), n => n._parents.add(this));
        return this
    }

    on (immediate=true) {
        const {node} = this;
        if (immediate)
            this._initialize();
        else this._finalize();
        (node as any || {})[immediate? 'start': 'stop']?.();
        return this
    }

    to (detinate=true) {
        const {node} = this;
        if (!node) return this;
        if (detinate) {
            this._initialize(detinate);
            node.connect(node.context.destination);
        } else {
            this._finalize(detinate);
            node.disconnect(node.context.destination);
        };
        return this;
    }

    _initialize (...args: any) {
        if (!this.initialized)
            this.initialized = true;
        else return;
        each(this._parents, p => p.node.connect(this._node!));
        each(this._parents, p => p._initialize(...args));
        this.initialized = true;
    }

    _finalize (...args: any) {
        if (!this.finalized)
            this.finalized = true;
        else return;
        each(this._parents, p => p.node.disconnect(this._node));
        each(this._parents, p => p._finalize(...args));
        if (this.node.buffer)
            this.node.buffer = null;
    }
}

export const getSynthedType = (value: any) => {
    const parentNode = getSynthed(value);
    return parentNode
        ? (parentNode.constructor as any)
        : is.arr(value) || is.obj(value)
        ? SynthedValues
        : SynthedValue;
}
