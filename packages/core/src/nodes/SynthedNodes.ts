import {Lookup} from '../types'
import {is, each, eachProp} from '../utils'
import {SynthedNode} from './SynthedNode'
import {Synthed, isSynthed } from './Synthed'

export class SynthedNodes extends Synthed {
    nodes!: SynthedNode[]

    constructor () {
        super()
        this.get = this.get.bind(this)
        this.set = this.set.bind(this)
        this.reset = this.reset.bind(this)
    }

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

    set (ctx: any, nodes: any[]) {
        this.nodes = is.arr(nodes[0])
            ? makeFromArray(ctx, nodes)
            : makeFromObject(ctx, nodes)
        return this
    }

    reset() {
        if (this.nodes)
            each(this.nodes, node => node.reset())
        return this
    }
}

function makeFromArray (_ctx: any, nodes: any[]): SynthedNode[] {
    const nodeSet = new Set<SynthedNode>()
    if (this.nodes.length == nodes.length)
        each(nodes, node => nodeSet.add(node))
    return Array.from(nodeSet)
}

function makeFromObject(ctx: any, nodes: Lookup[]): SynthedNode[] {
    const nodeSet = new Set<SynthedNode>()
    eachProp(nodes, (_, node: any) => {
        const payload = makeFromObject(ctx, node)
        each(payload, node => nodeSet.add(node))
    }, nodeSet)
    return Array.from(nodeSet)
}
