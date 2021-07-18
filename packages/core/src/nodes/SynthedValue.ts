import {is, each, eachProp} from '../utils'
import {SynthedValues} from './SynthedValues'
import {Synthed, getSynthed, setSynthed} from './Synthed'

export class SynthedValue<T = any> extends Synthed<AudioNode> {
    private _node?: AudioNode;

    done = false;
    parents = new Set<SynthedValue<T>>();
    finalized = false;
    initialized = false;

    constructor () {
        super();
        setSynthed(this, this);
    }

    get () {
        return this._node;
    }

    set (value: any) {
        this.node = value;
        return this;
    }

    reset () {
        this.finalize();
        this.initialize();
        return this;
    }

    resume (...values: SynthedValue[]) {
        each(values, v => v && this.parents.add(v))
        return this
    }

    resumed(...values: SynthedValue[]) {
        each(values, v => v && v.parents.add(this))
        return this
    }

    get node () {
        return this._node; // todo node(this._node);
    }

    set node (value: any) {
        this._node = value; // todo value is ctx => ...
    }

    get context () {
        return this._node?.context
    }

    // immediate
    on (value=true) {
        const {node} = this;
        if (value)
            this.initialize();
        else this.finalize();
        (node as any || {})[value? 'start': 'stop']?.();
        return this
    }

    // detinate
    to (value=true) {
        const {node} = this;
        if (!node) return this;
        if (value) {
            this.initialize(value);
            node.connect(node.context.destination);
        } else {
            this.finalize(value);
            node.disconnect(node.context.destination);
        }; // elif
        return this
    }

    initialize (...args: any) {
        if (!this.initialized)
            this.initialized = true;
        else return;
        each(this.parents, p => p.node.connect(this._node!));
        each(this.parents, p => p.initialize(...args));
        this.initialized = true;
    }

    finalize (...args: any) {
        if (!this.finalized)
            this.finalized = true;
        else return;
        each(this.parents, p => p.node.disconnect(this._node));
        each(this.parents, p => p.finalize(...args));
        if (this.node.buffer)
            this.node.buffer = null
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
