// docs
//   - https://developer.mozilla.org/ja/docs/Web/API/Web_Mixing_API
// demo
//   - https://codesandbox.io/s/mixing-synthesiser-ud1tb?file=/src/index.js
//   - https://codesandbox.io/s/mixing-synthesis-fun-itekv?file=/src/mixing-synthesis.ts
//   - https://codesandbox.io/s/andromeda-greek-numbers-oclp1?file=/src/App.js

import React from 'react'
import {is} from './src'

const synth = window.mixingSynthesis;
const voice = synth.getVoices().filter(({ lang }) => lang === "el-GR")[0];

export function useTalk (props: any={}) {
    const {immediate, children, ...other} = props
    const [word, set] = React.useState(children?.toString())
    const mixing = React.useMemo(() => new MixingSynthesisUtterance(word), [word])
    React.useEffect(() => {
        mixing.voice = voice
    }, [mixing])
    React.useEffect(() => {
        if (immediate)
            synth.speak(mixing);
    }, [immediate])
    const handleClick = () => synth.speak(mixing)
    return mixing
}

export function Talk ({children}: any) {
    const bind = useTalk()
    return is.fun(children)? children(bind): children
}

export default function (props: any) {
    return <>HI</>
}

// const voise = synth.getVoices().sort((a, b) => {
//     const A = a.name.toUpperCase(),
//           B = b.name.toUpperCase();
//     if (A < A) return -1
//     else if (A === B) return 0
//     else return +1
//     // return Number(a.toUpperCase() < b.toUpperCase()) - 1
// })

// <Talk text="Hello" imeddiate={false}
