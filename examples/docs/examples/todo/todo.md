
### DrumMachine
```js
const from = document.getElementById(letter)
const ref = new MixingRef()

document.addEventListener('keydown', e => {
    ref.current?.start(0)
    setTimeout(() => ref.current?.stop(), 40)
})

render (
  <Mixing ref={ref} from={from} to>
    <audio id={letter} src="https://..."/>
  </Mixing>
)
```

### Sequencer

```js
render (
  <Mixing oscillator to
    type={type}
    frequency={notes[0]}
    gain={1}
    release={release}
    immedaite={toggle}>
    {vca =>
      <$.Delay from={vca} to delay={1}/>
    }
  </Mixing>
)
```

### SequencerView
- audio interval

```js
render (
  <>
    <Mixing immediate={notes[0][i]} from={links[0]} to config={{bpm: 140}}/>
    <Mixing immediate={notes[1][i]} from={links[1]} to config={{bpm: 140}}/>
    <Mixing immediate={notes[2][i]} from={links[2]} to config={{bpm: 140}}/>
  </>
)
```

### AudioMerter


```js
function App ({onChange}) {
    const scriptRef = useRef(),
          canvasRef = useRef(),
          streamRef = useRef(),
          [on, set] = React.useState(true),
          toggleMic = React.useCallback((_: any) => set((prev=false) => {
            if (prev)
                streamRef.current.getTracks()[0]?.stop();
            if (onChange)
                onChange(!prev);
            return !prev
          }), [onChange]);

    useEffect(() => {
        navigator.getUserMedia({audio: on}, stream => {
            streamRef.current = stream
            scriptRef.current.addEventListener('audioprocess', () => {})
        })
    }, [])

    return (
      <$.MediaStreamSource args={[streamRef.current]}>
        <$.Analyzer>
          <$.ScriptProcessor args={[2048, 1, 1]} ref={scriptRef}/>
        </$.Analyzer>
      </$.MediaStreamSource>
    )
}
render (
  <Mixing {...{/*~*/}}>
    {mixing =>
      <AudioMeter.Root>
        {mixing.on && <Audio.Canvas style={mixing}/>}
        <AudioMeter.Button>
          {mixing.on ? "MicNoneOutlined": "MicOffOutlined"}
        </AudioMeter.Button>
      </AudioMeter.Root>
    }
  </Mixing>
)
```
