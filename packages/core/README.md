# @react-mixing/core

### Components

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

```js
const [toggle, set] = useState(false)
render (
  <synthed.Oscillator>
    {from =>
      <Mixing
        high={{toggle? 1:.6}}
         mid={{toggle? 1:.3}}
         low={{toggle? 1: 0}}/>
    }
  </synthed.Ocsillator>
)
```

<br/><br/><hr/><br/><br/>

# @react-mixing/hook

### useMixing

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

### useMixings

```js
import {synthed, useMixings} from 'react-mixing'
const [mixs, set] = useMixings(2, i => ({high: i*.6, mid: i*.3, low: i}))

render ({mixs.map(mix =>
  <synthed.Oscillator from={mix}>
)})
```

<br/><br/><hr/><br/><br/>

# @react-mixing/node

```js
// -> Delay(<-> feedback) -> [dry, wet] ->
const Delay  = ({value}) => (
  <synthed.Delay from={value}>
    <synthed.Gain from={value} destination/>
    <synthed.Gain from={value} destination/>
    <synthed.Gain from={value} feedback/>
  </synthed.Delay>
)

const Filter = ({to, children}) => (
  <synthed.BiquadFilter type="lowpass">
    {children}
  </synthed.BiquadFilter>
)

// [vco] -> mixer -> filter -> volume -> delay -> dest
const App = () => {
const [toggle, set] = useState(false)

render (
  <synthed.Oscillator immediate={toggle}/>
    {from =>
      <synthed.Oscillator immediate={toggle}/>
        {to =>
          <Mixing from={from} to={to}> // ???
            {mixing =>
              <Filter from={mixing}>
                <synthed.Gain value={.5}>
                  {value =>  <Delay value={value}/>}
                </synthed.Gain>
              </Filter>
            }
          </Mixing>
        }
      </synthed.Oscillator>
    }
  </synthed.Oscillator>
)
}
```

<br/><br/><hr/><br/><br/>

# @react-mixing/todo

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
