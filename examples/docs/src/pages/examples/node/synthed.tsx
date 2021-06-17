import React from 'react'
import Layout from '@theme/Layout'
import s from 'react-mixing/src'

export default function App () {
    const ctx = React.useMemo(() => new AudioContext(), [])
    const [toggle, set] = React.useState(false)
    return (
        <Layout title="Gain">
          <h1>Gain</h1>
          <button onClick={() => set((p=true) => !p)}>
            {toggle? 'Stop': 'Start'}
            <s.Oscillator immediate={toggle} destinate context={ctx}/>
          </button>
        </Layout>
    )
}
