import {useMixing, UseMixingProps} from './hooks'
import {MixingValues, UnknownProps, MixingChain, MixingToFn, NoInfer} from './types'

export type MixingComponentProps<
    State extends object = UnknownProps
> = unknown &
    UseMixingProps<State> & {
        children: (values: MixingValues<State>) => JSX.Element | null
    }


export function Mixing<State extends object>(
    props: {
        from: State
        to?: MixingChain<NoInfer<State>> | MixingToFn<NoInfer<State>>
    } & Omit<MixingComponentProps<NoInfer<State>>, 'from' | 'to'>
): JSX.Element | null

export function Mixing<State extends object>(
    props: { to: State } & Omit<MixingComponentProps<NoInfer<State>>, 'to'>
): JSX.Element | null

export function Mixing({ children, ...props }: any) {
    return children(useMixing(props))
}
