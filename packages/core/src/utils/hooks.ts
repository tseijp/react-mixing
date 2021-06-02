import React, {useEffect, useState, useRef} from 'react'

export function useForceUpdate() {
    const update = useState({})[1]
    const mounted = useState(() => ({
        current: true,
        unmount: () => () => {mounted.current = false},
    }))[0]
    useOnce(mounted.unmount)
    return () => {
        if (mounted.current)
            update({})
    }
}

declare const window: any
export const useLayoutEffect =
    typeof window !== 'undefined' && window.document?.createElement
        ? React.useLayoutEffect
        : React.useEffect

const emptyDeps: any[] = []
export function useOnce (effect: React.EffectCallback) {
    return useEffect(effect, emptyDeps)
}

export function usePrev<T=any>(value: T): T | undefined {
    const prevRef = useRef<any>()
    useEffect(() => void (prevRef.current = value))
    return prevRef.current
}
