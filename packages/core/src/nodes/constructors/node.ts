import {is} from '../../utils'
import {
    interleave,
    primitives
} from '../utils'

export type Rule<T = any> = T | T[] | Rule[]

export type RuleSet = Rule[]

export function node (
    rules: string[],
    ...interpolates: RuleSet
): (ctx: AudioNode) => AudioNode

export function node (rules: any, ...interpolates: any[]) {
    if (!is.len(0, interpolates))
        rules = interleave(rules, interpolates)

    if (is.len(1, rules))
        rules = rules[0]

    return (ctx: AudioContext) => new GainNode(ctx)
}
