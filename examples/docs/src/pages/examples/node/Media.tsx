import React from 'react'
import Layout from '@theme/Layout'
import s from 'react-mixing/src'

const mp3URL =
  "https://sp-prod-s3-assets.s3.amazonaws.com/web/video_creatives/vuwalkaround30_16x9_forddemo/assets/PuiBcHcHRJYoHwh8mOsi9.mp3";

export default function App () {
    const ctx = React.useMemo(() => new AudioContext(), [])
    const audio = React.useMemo(() => {
        const audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.controls = true;
        audio.src = mp3URL;
        audio.playbackRate = 1.5;
        audio.defaultPlaybackRate = 1.5
        return audio
    }, [])
    const [toggle, set] = React.useState(false)
    return (
        <Layout title="Gain">
          <h1>Gain</h1>
          <button onClick={() => set((p=true) => !p)}>
            {toggle? 'Stop': 'Start'}
            <s.MediaElementSource args={[audio]} destinate context={ctx}/>
          </button>
        </Layout>
    )
}
