import {useMixings} from './useMixings'
import {ControllerUpdate, MixingValues} from '../types'
import {MixingRef} from '../MixingRef'
import {MixingValue} from '../MixingValue'

export type UseMixingProps<Props extends object = any> = unknown & ControllerUpdate<Props>

export function useMixing <Props extends object> (
    props: () => (Props & UseMixingProps)
): [MixingValue<Props>, MixingRef<Props>]

export function useMixing <Props extends object> (
    props: Props & UseMixingProps<Props>
): MixingValues<Props>

export function useMixing (props: any) {
    const isFn = typeof props === 'function'
    const [[values], ref] = useMixings(1, isFn? props: [props])
    return isFn || arguments.length == 2 ? [values, ref] : values
}
