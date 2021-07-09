export type Constructor = any

export type Tag<T = any> = string | T // TODO

export interface Attrs {} // TODO

export interface Config {} // TODO

export interface Construct extends Function {
    withAttrs (attrs: Attrs): Construct
    withConfig (configs: Config): Construct
}

export function construct <Component = any> (
    constructor: Constructor,
    config: Config,
    ...tags: Tag[]
): Construct

export function construct (constructor: any, config: any={}, ...tags: any[]) {
    const templateFunction: Construct = constructor(config, tags)

    templateFunction.withAttrs = (attrs) =>
        construct(constructor, {
            ...config,
            attrs: Array.prototype.concat(config.attrs, attrs).filter(Boolean)
        }, ...tags)

    templateFunction.withConfig = (configs) =>
        construct(constructor, {
            ...config,
            ...configs
        }, ...tags)

    return templateFunction
}
