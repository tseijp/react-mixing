# React Mixing

[![ version ](
    https://img.shields.io/npm/v/react-mixing)](
    https://npmjs.com/package/react-mixing)
[![ Downloads ](
    https://img.shields.io/npm/dm/react-mixing.svg)](
    https://npmjs.com/package/react-mixing)
[![ jsDelivr ](
    https://badgen.net/jsdelivr/hits/npm/react-mixing)](
    https://www.jsdelivr.com/package/npm/react-mixing)
[![ minified size ](
    https://badgen.net/bundlephobia/minzip/react-mixing)](
    https://bundlephobia.com/result?p=react-mixing@latest)
[![ types includes ](
    https://badgen.net/npm/types/react-mixing)](
    https://www.npmjs.com/package/react-mixing)
[![ license ](
    https://badgen.net/npm/license/react-mixing)](
    https://www.npmjs.com/package/react-mixing)

### Installation

```shell
npm install react-mixing
```

### Quick started

```shell
git clone https://github.com/tseijp/react-mixing
cd react-mixing
cd examples
yarn i
yarn start
```

- open browser and visit [localhost:3000](http://localhost:3000)
- Now you can go to our [demo](http://tsei.jp/rmix), and try its usage.


### Documentation and Examples

More info about the project can be found [here](https://tsei.jp/rmix/docs/intro.md).

Examples and tutorials can be found [here](https://tsei.jp/rmix/examples/intro.md).

<br/>
<hr/>
</br/>


### What does it look like?

```js
import React from 'react'
import {synthed, useMixing} from 'react-mixing'

export function App () {
  const ref = React.useRef()

  const [mix, set] = useMixing({high: .6, middle: .3, low: 0}, [])

  return (
    <input onChange={e => set({fader: e.value})}/>
      <audio src="https://..."/>
      <synthed.Oscillator to={mix} />
    </input>
  )
}
```

## Recipes

<details>
<summary>

### Components

</summary>

```js
const [toggle, set] = useState(1)
const handle = () => set(p => Number(!p))
render (
  <synthed.Oscillator>
    <Mixing immediate={toggle}>
      {value =>
        <a.button onClick={handle}>
          {value}
        </a.button>
      }
    </Mixing>
  </synthed.Oscillator>
)
```

</details>



<details>
<summary>

### useMixing

</summary>


```js
import {synthed, useMixing} from 'react-mixing'
```

```js
const [mix, set] = useMixing({high: .6, middle: .3, low: 0}, [])

render (
  <synthed.Oscillator to={mix}>
    <input onChange={e => set({fader: e.value})}/>
  </synthed.Oscillator>
)
```

</details>

<details>
<summary>

### useMixings

</summary>

```js
import {synthed, useMixings} from 'react-mixing'
const [mixs, set] = useMixings(2, i => ({high: i*.6, mid: i*.3, low: i}))

render ({mixs.map(mix =>
  <synthed.Oscillator from={mix}>
)})
```

</details>

<details>
<summary>

### @react-mixing/node

</summary>

```js
import s from 'react-mixing'

const [toggle, set] = useState(false)

render (
  <button onClick={() => set(p => !p)}>
    {toggle? 'Stop': 'Start'}
    <s.Oscillator immediate>
      <s.Filter row={0} mid={.5}/>
        <s.Gain value={toggle} destination>
      </s.Filter>
    </s.Oscillator>
  </button>
)
```

</details>

<details>
<summary>

## @react-mixing/todo

</summary>

### with React Spring

```js
render (
  <synthed.Oscillator>
    <Mixing>
      {value =>
        <animated.div>{value}</animated.div>
      }
    </Mixing>
  </synthed.Oscillator>
)
```

### MixingContext && useMixingContext

```js
function Element (props) {
  const [{value}] = useMixingContext()
  return (
    <animated.div>{value}</animated.div>
  )
}

render (
  <synthed.Oscillator>
    <MixingContext>
      {[...Array(100).keys()].map(key =>
        <Element key={key}/>
      )}
    </MixingContext>
  <synthed.Oscillator>
)
```

### Mixing from Web Speech API

```js
const Input = synthed.Speech`HELLO WORLD`

render (
  <Input lang='ja'>
    {({value}) =>
      <animated.div>{value}</animated.div>
    }
  </Input>
)
```

###  SynthWorklet

```js
const Noise = synthed(props => ({process (inputs, outputs, parameters) {
    const output = outputs[0];
    for (let channel = 0; channel < output.length; ++channel) {
        const outputChannel = output[channel];
        for (let i = 0; i < outputChannel.length; ++i)
            outputChannel[i] = 2 * (Math.random() - 0.5)
    }
    return true;
}}))

render (
  <Noise destination/>
)
```
