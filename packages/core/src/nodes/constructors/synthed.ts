import {construct} from './construct'
import {primitives} from '../utils'
import {SynthedAudio} from '../models'

const _synthed = (...tags: any) => construct(SynthedAudio, {}, ...tags)

type BaseStyled = typeof _synthed

const synthed = _synthed as BaseStyled & {
    [key in typeof primitives[number]]: ReturnType<BaseStyled>
}

primitives.forEach(primitive => {
    synthed[primitive] = _synthed(primitive)
})

export { synthed }
