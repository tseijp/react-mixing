import React from "react"

function defaultInitContext(audioContext: AudioContext) {
  return audioContext.destination
}

export function useAudioContext (
    initContext?: (
        audioContext: AudioContext
    ) => Promise<AudioNode> | AudioNode
): AudioNode | undefined

export function useAudioContext (initContext=defaultInitContext) {
    const [audioNode, setAudioNode] = React.useState<AudioNode>()

    React.useEffect(() => {
        const context = new AudioContext()
        Promise.resolve(initContext(context))
               .then((node) => setAudioNode(node))
        return () => void context.close()
    }, [initContext])

    return audioNode
}
