import {MixingRef} from '../MixingRef'
import {UseMixingProps} from './useMixing'
import {useMemo, useRef} from 'react'
// import {detachRefs, replaceRef} from '../utils'
import {Controller, getMixings, setMixings, ControllerFlushFn} from '../Controller'
import {is, each, flush, usePrev, useOnce, useForceUpdate, useLayoutEffect} from '../utils'
import {
    ControllerUpdate,
    MixingValues,
    PickSynthed,
    Lookup
} from '../types'

export type UseMixingsProps<State extends Lookup = Lookup> = unknown &
    ControllerUpdate<State> & {
        ref?: MixingRef<State>
    }

export function useMixings<Props extends UseMixingProps>(
    length: number,
    props: (i: number, ctrl: Controller) => Props,
): PickSynthed<Props> extends infer State
    ? [MixingValues<State>[], MixingRef<State>]
    : never

export function useMixings<Props extends UseMixingsProps>(
  length: number,
  props: Props[] & UseMixingsProps<PickSynthed<Props>>[]
): MixingValues<PickSynthed<Props>>[]

export function useMixings(
  length: number,
  props: any[] | ((i: number, ctrl: Controller) => any),
): any {
    const propsFn = is.fun(props) && props
    const ref = useMemo(() => (propsFn? void 0: void 0), [propsFn])//MixingRef() : void 0), [])
    const layoutId = useRef(0)
    const forceUpdate = useForceUpdate()
    interface State {
        ctrls: Controller[]
        queue: Array<() => void>
        // flush: ControllerFlushFn
    }
    const state = useMemo(
        (): State => ({
            ctrls: [],
            queue: [],
            // flush(ctrl, updates) {
            //     const mixings = getMixings(ctrl, updates)
            //     const canFlushSync =
            //         layoutId.current > 0 &&
            //         !state.queue.length &&
            //         !Object.keys(mixings).some(key => !ctrl.mixings[key])
            //     return canFlushSync
            //         ? flushUpdateQueue(ctrl, updates)
            //         : new Promise<any>(resolve => {
            //             setMixings(ctrl, mixings)
            //             state.queue.push(() => {
            //                 resolve(flushUpdateQueue(ctrl, updates))
            //             })
            //             forceUpdate()
            //         })
            // },
        }),
        []
    )

    const ctrls = useRef([...state.ctrls])
    const updates: any[] = []

    const prevLength = usePrev(length) || 0
    const oldCtrls = ctrls.current.slice(length, prevLength)

    // useLayoutEffect(() => {
    //     layoutId.current++
    //
    //     state.ctrls = ctrls.current
    //     const { queue } = state
    //     if (queue.length) {
    //         state.queue = []
    //         each(queue, cb => cb())
    //     }
    //
    //     each(oldCtrls, ctrl => {
    //         detachRefs(ctrl, ref)
    //         ctrl.stop(true)
    //     })
    //
    //     each(ctrls.current, (ctrl, i) => {
    //         ref?.add(ctrl)
    //         const update = updates[i]
    //         if (update) {
    //             replaceRef(ctrl, update.ref)
    //             if (ctrl.ref)
    //                 ctrl.queue.push(update)
    //             else
    //                 ctrl.start(update)
    //         }
    //     })
    // })
    //
    // useOnce(() => () => {
    //     each(state.ctrls, ctrl => ctrl.stop(true))
    // })

    const mixings = ctrls.current.map((ctrl, i) => getMixings(ctrl, updates[i]))
    const values = mixings.map(x => ({ ...x }))

    return ref ? [values, ref] : values
}
