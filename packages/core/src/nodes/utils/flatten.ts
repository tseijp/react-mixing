import { is } from '../../utils'
import { Node, NodeSet, Rule, RuleSet } from '../constructors'
import { primitives } from './primitives'

const replaceChunkRe = /\s/g

export function flatten <T>(
    chunk: Rule<T>,
    props?: any
): RuleSet<T>

export function flatten (chunk: any, props?: any) {
    if (is.fls(chunk))
        return []

    if (is.arr(chunk)) {
        const ruleSet = []
        for (let i = 0, result: any; i < chunk.length; i++) {
            result = flatten(chunk[i], props)
            ruleSet.push(...Array.prototype.concat(result))
        }
        return ruleSet
    }

    if (is.fun(chunk))
        if (props)
            return flatten(chunk(props), props)
        else return [chunk]

    if (is.str(chunk) && primitives.find(v => v === chunk))
        return [chunk]

    return chunk.toString().replace(replaceChunkRe, '').split('/')
}
