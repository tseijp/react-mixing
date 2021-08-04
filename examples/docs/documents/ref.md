### TODO
```ts
SynthedValue('osc'): {
    _node: AudioNode,
    _parents: Set<SynthedValue<T>>,
    effect (on, to): () => void,
    
    on: () => void,
    to: () => void
}

MixingValue (node='osc'): {get: () => value, advance: dt => {}, synth: Synthesis (): {
    onValues: node[], // number[],
    toValues: node[], // number[]
    values: SynthedValue[], // AnimatedValue[]
    on: SynthedValue<T>, // T | FluidValue<T>
    to: SynthedValue<T>, // T | FluidValue<T>
    config: new Config(),
}

<Mixing
    on={{x: 'osc', y: MixingValue('gain')}} as {[string]: OnMixingValue}
    to={{x: mixing => mixing.y} as {[string]: ToMixingValue}}
>
{mixing => <a.div style={mixing}></a.div>}
</Mixing>
```


### Track

```
[o] ... Artwork
~~~ ... Track Title
KEY SYNC
Semitone Down/Up
Current key
Key variation
Beat Sync
Sync Master
```

### Select

```
HOT CUE
PAD FX
SLICER
BEAT JUMP
BEAT LOOP
KEYBOARD
KEY SHIFT
SEQ. CALL
ACT. CENSR
MEMORY CUE
```

### Top
```
 1 ... Auto Beat loop
< > ... Halve/Double the loop


CUE
PLAY/PAUSE


- ... Adjust the playing speed
132 ... Deck Bpm Display
0.0% ... Playing speed display
WIDE ... Tempo Range
+
SLIP
Q
```


### Grid Edit

```
1.1BAS ... set to the nearest Beatgrid point
|
<<< ||| ... shift the whole BeatGrid left
< |||
||| >
|||| >>>

n ... auto gain knob
132 ... a BPM value
>> ||| << ... Shrink Beat intervals
> ||| <
< ||| > ... expand
<< ||| >>

TAP ... BPM with the tapping interval
||| x2 ... double BPM value
||| x1/2 ... halve BPM value
||| | ||| ... make an adjustment on the whole track
|||  ||| ... make an adjustment from the current position
```
