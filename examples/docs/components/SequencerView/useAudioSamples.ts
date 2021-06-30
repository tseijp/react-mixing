import React from 'react'

export function useAudioSamples (
    urls: string[],
    ctx: any
): undefined | any[]

export function useAudioSamples (urls=[], ctx: any) {
    const ref = React.useRef([] as any[])
    const [data, setData] = React.useState([] as any[])

    if (!ctx) return undefined
    React.useEffect(() => {
        Promise.all(
            urls.map(url => fetch(url)
                .then(res => res?.arrayBuffer())
                .then(buf => ctx.decodeAudioData(buf))
                .then(buf => ref.current.push(buf))
            )
        )
        setData(ref.current.splice(0, ref.current.length))
    }, [urls, ctx])

    return data
}

/** The array of loaded sample data as AudioBuffers. */
// const samples = useQuery(
//   [sampleUrls] as const,
//   (urls: string[]) => {
//     if (audioContext == null) return undefined;
//     return Promise.all(
//       urls.map((url) =>
//         fetch(url)
//           .then((res) => res.arrayBuffer())
//           .then((buffer) => audioContext.decodeAudioData(buffer))
//       )
//     );
//   },
//   { enabled: audioContext != null }
// ).data;
