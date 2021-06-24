import React from 'react'
import Layout from '@theme/Layout'
// import {useMixing} from 'react-mixing/src'

export default function App () {
    if (typeof window === 'undefined')
        return null
    return (
        <Layout title="useMixing">
          <h1>useMixing</h1>
        </Layout>
    )
}
