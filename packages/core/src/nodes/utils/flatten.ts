/**
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/flatten.js
 */
import { is } from '../../utils'
import {Falsy} from '../../types'

export type Flat<T=any> = T | Flat<T>[]

export type Rule<T=any> = Falsy | Rule<T>[]

export type RuleSet<T=any> = Rule<T>[]

export type FlatSet<T=any> = Flat<T>[]

export function flatten (
    chunk: Falsy | string,
    props?: any,
): string

export function flatten (
    chunk: Rule,
    props?: any
): Flat

export function flatten (
    chunk: RuleSet,
    props?: any
): FlatSet

export function flatten (chunk: any, props?: any) {
    if (is.fls(chunk))
        return ''

    if (is.arr(chunk)) {
        const ruleSet = []
        for (let i = 0, len = chunk.length, result: any; i < len; i += 1) {
            result = flatten(chunk[i], props)
            if (result === '') continue
            if (is.arr(result)) ruleSet.push(...result)
            else ruleSet.push(result)
        }
        return ruleSet
    }

    if (is.fun(chunk))
        if (props)
            return flatten(chunk(props), props)
        else return chunk

    return chunk
}
