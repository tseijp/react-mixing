import {param} from '../constructors'
import {FlatSet, RuleSet} from '../utils'

export class AudioSynth {
    tags?: FlatSet
    args?: FlatSet

    constructor (tags: FlatSet, ...args: RuleSet)

    constructor (tags: any, ...args: any[]) {
        this.tags = tags || undefined
        this.args = param(args)
    }

    create () {
        return null
    }
}
