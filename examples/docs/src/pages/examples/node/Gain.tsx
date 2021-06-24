import React from 'react'
import Layout from '@theme/Layout'
// import s from 'react-mixing/src'

// const [resume, suspend] = useAudioContext(ctx => [ctx.resume, ctx.suspend])
// const [mixing, set] = useMixing({frequency: 1, detune: 1, type: 1})
//
// render (
//   <s.Oscillator param={mixing}>
//     <s.Gain setValueAtTime={ctx => [.2, ctx.currentTime]}>
//     </s.Gain>
//   </s.Oscillator>
// )

export default function App () {
    if (typeof window === 'undefined')
        return null
    const ctx = React.useMemo(() => new AudioContext(), [])
    const [toggle, set] = React.useState(false)
    return (
        <Layout title="Gain">
          <h1>Gain</h1>
          <button onClick={() => set((p=true) => !p)}>
            {toggle? 'Stop': 'Start'}
            {/*
            <s.Oscillator immediate context={ctx}>
              {(from: any) =>
                <s.Gain from={from} value={Number(toggle)} destinate/>
              }
            </s.Oscillator>
            */}
          </button>
        </Layout>
    )//setValueAtTime={[.2, ctx.currentTime]}
}

// ref https://codesandbox.io/s/web-audio-playground-5d9vp?file=/src/components/Osc.js
/*
let actx = new AudioContext();
let out = actx.destinate;
actx.suspend();

let osc = actx.createOscillator();
let gain = actx.createGain();
let analyser = actx.createAnalyser();

gain.gain.setValueAtTime(0.2, actx.currentTime);
gain.connect(out);
osc.connect(gain);
osc.connect(analyser);
osc.start();

const Osc = () => {
  //Setting the state
  const [oscSettings, setOscSettings] = useState({
    frequency: osc.frequency.value,
    detune: osc.detune.value,
    type: osc.type
  });
  //Functions
  const checkFreqInput = (e) => {
    let { value } = e.target;
    if (isNaN(value)) e.target.value = oscSettings.frequency;
    else if (value > 2000) e.target.value = 2000;
    else if (value < 20) e.target.value = 20;
  };
  const changeSetting = (e) => {
    let { value, id } = e.target;
    setOscSettings({ ...oscSettings, [id]: value });
    osc[id].value = value;
  };
  const changeType = (e) => {
    let { id } = e.target;
    setOscSettings({ ...oscSettings, type: id });
    osc.type = id;
  };

  return (
    <div className="control">
      <h2>Oscillator</h2>
      <div>
        <button onClick={() => actx.resume()}>Play</button>
        <button onClick={() => actx.suspend()}>Stop</button>
      </div>
      <Canvas analyser={analyser} type="frequency" />
      <div className="param">
        <h3>Frequency</h3>
        <input
          onChange={changeSetting}
          type="text"
          id="frequency"
          value={oscSettings.frequency}
          onInput={checkFreqInput}
        />
        <input
          onChange={changeSetting}
          type="range"
          id="frequency"
          max="2000"
          min="20"
          value={oscSettings.frequency}
        />
      </div>
      <div className="param">
        <h3>Detune</h3>
        <input
          onChange={changeSetting}
          type="range"
          id="detune"
          max="100"
          min="-100"
          value={oscSettings.detune}
        />
      </div>
      <div className="param">
        <h3>Wave</h3>
        <button
          id="sine"
          onClick={changeType}
          className={`${oscSettings.type === "sine" && "active"}`}
        >
          Sine
        </button>
        <button
          id="triangle"
          onClick={changeType}
          className={`${oscSettings.type === "triangle" && "active"}`}
        >
          Triangle
        </button>
        <button
          id="square"
          onClick={changeType}
          className={`${oscSettings.type === "square" && "active"}`}
        >
          Square
        </button>
        <button
          id="sawtooth"
          onClick={changeType}
          className={`${oscSettings.type === "sawtooth" && "active"}`}
        >
          Sawtooth
        </button>
      </div>
    </div>
  );
};

export default Osc;

*/
