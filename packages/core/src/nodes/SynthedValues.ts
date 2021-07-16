import {Lookup} from '../types'
import {is, each, eachProp} from '../utils'
import {SynthedValue} from './SynthedValue'
import {Synthed, isSynthed} from './Synthed'

export class SynthedValues extends Synthed {
    values!: SynthedValue[]

    get (synthed?: boolean) {
        const values: Lookup = {}
        each(this.values, (node, key) => {
            if (isSynthed(values))
                (values as any)[key] = node.get()
            else if (!synthed)
                values[key] = values
        })
        return values
    }

    set (...args: any[]) {
        this.values = is.arr(args[0])
            ? makeFromArray(...args)
            : makeFromObject(...args)
        return this
    }

    reset () {
        if (this.values)
            each(this.values, node => node.reset())
        return this
    }
}

function makeFromArray (...args: any[]): SynthedValue[] {
    const nodeSet = new Set<SynthedValue>()
    if (this.values.length == args.length)
        each(args, node => nodeSet.add(node))
    return Array.from(nodeSet)
}

function makeFromObject(...args: Lookup[]): SynthedValue[] {
    const nodeSet = new Set<SynthedValue>()
    eachProp(args, (_, arg: any) => {
        const payload = makeFromObject(arg)
        each(payload, node => nodeSet.add(node))
    }, nodeSet)
    return Array.from(nodeSet)
}
