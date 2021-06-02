# @react-mixing/core

## API

### Components
```js
const [toggle, set] = useState(false)
render (
  <>
    <Mixing audio={audio}
      immediate={toggle}
      to={{volume: 0}}>
      {mixing => mixing.to(v => v)}
    </Mixing>
    <button onClick={set(p => !p)}/>
  </>
)
```

```js
const [toggle, set] = useState(false)
render (
  <Mixing
    high={{toggle? 1: .6}}
     mid={{toggle? 1: .3}}
     low={{toggle? 1: 0}}/>
)
```

### Hooks

```js
import {node, useMixing} from 'react-mixing'

const [mix, set] = useMixing({high: .6, middle: .3, low: 0}, [])
render (
  <>
    <node.audio style={mix}/>
    <input onChange={e => set({fader: e.value})}/>
  </>
)
```

```js
import {node, useMixings} from 'react-mixing'
const [[mix0, mix1], set] = useMixings(2, i => ({high: i*.6, mid: i*3, low: i}))

render (
  <>
    <node.audio style={mix0}/>
    <audio style={mix1}/>
  </>
)
```

<!-- ```js
const [hello, setHello] = useState(true)
const [world, setWorld] = useState(false)
const mixing = useMixing({hello, world})

const handleClick = () => {
    setHello(p => !p && mixing !== 'hello')
    setWorld(p => !p && mixing !== 'world')
}

return (
    <button onClick={handleClick}>{mixing}</buttom>
)
``` -->
