
<h3 align="center"><ruby>
<h3 align="right"><ruby>
<h3 align="left"><ruby>

```ruby
< 👏 >
synthed
audio
```

</ruby></h3>
</ruby></h3>
</ruby></h3>

### Basics

```js
import { synthed } from 'synthed-audio'

const Delay = () => {
    return [
        <Wet />,
        <Delay />
    ]
}
const Wet = synthed.Gain(Delay)
const Dry = synthed.Gain(Delay)
const Delay = synthed(() => [
  <Dry/>,
  <Wet/>,
  <synth.Dest/>,
  <synth.Gain>
    <synth.Dest/>
  </synth.Gain>
])(Dry, Wet)

const Volume = synthed.Gain({value: .5})

const Mixer = synthed.SynthWorklet()

const VCO = synthed.Gain(synthed.Oscillator({start: true})).withAttrs(props => ({
    value: props.on? (props.value || 1): 0,
    frequency: props.glide? props.freq: 0
}))

// [vco] -> mixer -> filter -> volume -> delay -> dest
const App = () => {
  const [toggle, set] = useState(false)
  return (
    <Mixer worklet='./mixer.js'>
      <VCO immediate={toggle} on glide reverse/>
      <VCO immediate={toggle} on glide reverse/>
      <Filter>
        <Volume>
          <Delay/>
        </Volume>
      </Filter>
    </Mixer>
  )
}
```

### TODO: SynthWorklet

```js
import { synthed } from 'synthed-audio'

const noise = synthed(props => ({process (inputs, outputs, parameters) {
    const output = outputs[0];
    for (let channel = 0; channel < output.length; ++channel) {
        const outputChannel = output[channel];
        for (let i = 0; i < outputChannel.length; ++i)
            outputChannel[i] = 2 * (Math.random() - 0.5)
    }
    return true;
}}))

```
