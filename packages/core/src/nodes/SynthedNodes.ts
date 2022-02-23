import {Lookup} from '../types'
import {is, each, eachProp} from '../utils'
import {SynthedNode} from './SynthedNode'
import {Synthed, isSynthed} from './Synthed'

export class SynthedNodes extends Synthed {
    nodes!: SynthedNode[]

    get (synthed?: boolean) {
        const nodes: Lookup = {}
        each(this.nodes, (node, key) => {
            if (isSynthed(nodes))
                (nodes as any)[key] = node.get()
            else if (!synthed)
                nodes[key] = nodes
        })
        return nodes
    }

    set (...args: any[]) {
        this.nodes = is.arr(args[0])
            ? makeFromArray(...args)
            : makeFromObject(args)
        return this
    }

    reset () {
        if (this.nodes)
            each(this.nodes, node => node.reset())
        return this
    }
}

function makeFromArray (...args: any[]): SynthedNode[] {
    const nodeSet = new Set<SynthedNode>()
    if (this.nodes.length == args.length)
        each(args, node => nodeSet.add(node))
    return Array.from(nodeSet)
}

function makeFromObject(args: Lookup[]): SynthedNode[] {
    const nodeSet = new Set<SynthedNode>()
    eachProp(args, (_, arg: any) => {
        const payload = makeFromObject(arg)
        each(payload, node => nodeSet.add(node))
    }, nodeSet)
    return Array.from(nodeSet)
}
