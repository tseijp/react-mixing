import {is} from '../../utils'
import {
    flatten,
    interleave,
    FlatSet,
    RuleSet
} from '../utils'

export function param <T = any> (...rules: RuleSet): FlatSet<T>

export function param <T = any> (
    rules: string[],
    ...interpolations: any[]
): FlatSet<T>

export function param (rules?: any, ...interpolations: any) {
    if (is.fun(rules) || is.obj(rules))
        return flatten(interleave([], [rules, ...interpolations]))

    if (is.len(0, interpolations)) {
        if (is.str(rules))
            return flatten(rules)
        if (is.len(1, rules) && is.str((rules as any)[0]))
            return rules
    }

    return flatten(interleave(rules, interpolations))
}
