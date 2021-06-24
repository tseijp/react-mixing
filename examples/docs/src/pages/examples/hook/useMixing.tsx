import React from 'react'
import Layout from '@theme/Layout'
// import {useMixings} from 'react-mixing/src'

export default function App () {
    if (typeof window === 'undefined')
        return null
    return (
        <Layout title="useMixing">
          <h1>useMixing</h1>
        </Layout>
    )
}
