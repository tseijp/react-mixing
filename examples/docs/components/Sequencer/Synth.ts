export default class Synth {
    ctx: any

    constructor() {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    playNotes(notes = [], state: any = {}) {
        const {release, bpm, type, delay} = state
        if (notes.length <= 0) return

        const osc = this.ctx.createOscillator()
        osc.type = type.toLowerCase()
        osc.frequency.value = notes[0]

        const delayNode = this.ctx.createDelay()
        delayNode.delayTime.value = delay ? bpm / 2000 : 0

        // VCA
        const vca = this.ctx.createGain()
        vca.gain.value = 1

        // Connections
        osc.connect(vca)
        vca.connect(delayNode)
        vca.connect(this.ctx.destination)
        delayNode.connect(this.ctx.destination)

        osc.start(0)

        setTimeout(() => {
            vca.gain.setTargetAtTime(0, this.ctx.currentTime, 0.015)
        }, release)
    }
}
