import {param} from './param'
import {RuleSet} from '../utils'

export type Constructor = any

export interface Attrs {} // TODO

export interface Options {} // TODO

export interface Construct extends Function {
    withAttrs (attrs: Attrs): Construct
    withConfig (configs: Options): Construct
}

export function construct <Component = any> (
    constructor: Constructor,
    options: Options,
    ...tags: RuleSet<Component>
): Construct

export function construct (constructor: any, options?: any, ...tags: any[]) {
    const templateFunction: Construct = constructor(options, ...param(...tags))

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
