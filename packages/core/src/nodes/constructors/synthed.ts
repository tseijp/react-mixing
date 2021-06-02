import {construct} from './construct'
import {SynthedAudio} from '../models'

const synthed = (...tags: any) => construct(SynthedAudio, {}, ...tags)

synthed.Analyser = synthed(AnalyserNode)

synthed.BiquadFilter = synthed(BiquadFilterNode)

synthed.Buffer = synthed(AudioBuffer)

synthed.BufferSource = synthed(AudioBufferSourceNode)

synthed.ConstantSource = synthed(ConstantSourceNode)

synthed.ChannelMerger = synthed(ChannelMergerNode)

synthed.ChannelSplitter = synthed(ChannelSplitterNode)

synthed.Convolver = synthed(ConvolverNode)

synthed.Delay = synthed(DelayNode)

synthed.DynamicsCompressor = synthed(DynamicsCompressorNode)

synthed.Gain = synthed(GainNode)

synthed.IIRFilter = synthed(IIRFilterNode)

synthed.Oscillator = synthed(OscillatorNode)

synthed.Panner = synthed(PannerNode)

synthed.PeriodicWave = synthed(PeriodicWave)

synthed.ScriptProcessor = synthed(ScriptProcessorNode)

synthed.StereoPanner = synthed(StereoPannerNode)

synthed.waveShaper = synthed(WaveShaperNode)

export { synthed }
