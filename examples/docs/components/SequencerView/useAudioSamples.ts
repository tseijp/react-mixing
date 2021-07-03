import React from 'react'

export function useAudioSamples (
    urls: string[],
    ctx: any
): undefined | any[]

export function useAudioSamples (urls=[], ctx: any) {
    const [data, setData] = React.useState([])

    React.useEffect(async () => {
        if (!ctx) return
        Promise.all(
            urls.map(url => fetch(url)
                .then(res => res?.arrayBuffer())
                .then(buf => ctx.decodeAudioData(buf))
                .then(buf => setData((p: any) => [...p, buf]))
            )
        )
        return () => setData([])
    }, [urls, ctx])


    return data
}
