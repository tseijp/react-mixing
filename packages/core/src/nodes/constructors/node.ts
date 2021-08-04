import {is} from '../../utils'
import {
    interleave,
    flatten,
    primitives
} from '../utils'

export type Rule<T = any> = T | T[] | Rule[]

export type RuleSet<T = any> = Rule<T>[]

export function node <T = any>(
    rules: string[],
    ...interpolations: RuleSet<T>
): RuleSet<T>

// TODO
// export function node (rules: any, ...interpolations: any[]) {
//     if (rules.length == 1)
//         rules = rules[0]
//
//     // if (is.str(tags))
//     //     return (this._ctx as any || {})[`create${tags}`](...args)
//
//     // if (is.fun(tags))
//     //     return tags(...args)
//
//     if (is.str(rules) && interpolations.length == 0)
//         return flatten(rules)
//
//     return flatten(interleave(rules, interpolations))
// }

export function node (...args: any[]) {
    return Array.prototype.concat([], args)
}
