import {is} from '../../utils'

export type Rule<T = any> = T | T[] | Rule[]

export type RuleSet = Rule[]

export type Interpolate = {}

export function node (
    rules: RuleSet,
    ...interpolates: Interpolate[]
): (ctx: AudioNode) => AudioNode

export function node (rules: any, ...interpolates: any) {
    if (is.len(1, rules))
        rules = rules[0]

    return (ctx: AudioContext) => new GainNode(ctx)
}
