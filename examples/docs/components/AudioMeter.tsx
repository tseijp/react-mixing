import React from "react";
import styled from 'styled-components'

export function AudioMeter () {
    return (
        <></>
    )
}

AudioMeter.Root = styled.div`
    display: flex;
    width: 48px;
    height: 48px;
    padding: 50px;
`

AudioMeter.Canvas = styled.canvas`
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    borderRadius: 50%;
`

AudioMeter.Button = styled.div`
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
`


export function useAudioMeter (canvasRef: any, streamRef: any, onChange?: any) {
    const [on, set] = React.useState(true),
          toggleMic = React.useCallback((_: any) => set((prev=false) => {
        if (prev)
            streamRef.current.getTracks()[0]?.stop();
        if (onChange)
            onChange(!prev);
        return !prev;
    }), [onChange]);

    React.useEffect(() => {
        navigator.getUserMedia =
            (navigator as any).getUserMedia ||
            (navigator as any).webkitGetUserMedia ||
            (navigator as any).mozGetUserMedia;

        if (!on || !navigator.getUserMedia) return
        navigator.getUserMedia({audio: on}, stream => {
            streamRef.current = stream;

            const ctx = new AudioContext();
            const analyser = ctx.createAnalyser();
            const microphone = ctx.createMediaStreamSource(stream);
            const javascriptNode = ctx.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(ctx.destination);

            const canvasContext = canvasRef.current?.getContext?.("2d");

            javascriptNode.addEventListener("audioprocess", () => {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                let values = 0;

                for (let i = 0; i < array.length; i++)
                    values += array[i];

                const average = values / array.length;
                const range = Math.max(0, Math.min(48 - average * (48 / 100), 48));
                if (!canvasContext) return
                canvasContext.clearRect(0, 0, 48, 48);
                canvasContext.fillStyle = "#BadA55";
                canvasContext.fillRect(0, range, 48, 48);
            });
        }, err => console.log(err)); // end fn stream
    }, [on, canvasRef]); // end useEffect
    return [on, toggleMic]
}
