import {param} from './param'
import {RuleSet} from '../utils'

export type Constructor = any

export interface Options {}

export interface Attrs {}

export interface Construct extends Function {
    withAttrs (attrs: Attrs): Construct
    withConfig (configs: Options): Construct
}

export function construct (
    constructor: Constructor,
    options: Options,
    ...tags: RuleSet
): Construct

export function construct (constructor: any, options?: any, ...tags: any[]) {
    const templateFunction: Construct = (...args: any[]) =>
        constructor(param(...tags), options, param(...args))

    templateFunction.withAttrs = (attrs) =>
        construct(constructor, {
            ...options,
            attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
        }, ...tags)

    templateFunction.withConfig = (configs) =>
        construct(constructor, {
            ...options,
            ...configs
        }, ...tags)

    return templateFunction
}
