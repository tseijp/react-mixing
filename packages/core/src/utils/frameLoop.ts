import { raf } from 'rafz'

export interface OpaqueSynth {
    idle: boolean
    priority: number
    advance(dt: number): void
}

const startQueue = new Set<OpaqueSynth>()
let currentFrame: OpaqueSynth[] = []
let prevFrame: OpaqueSynth[] = []
let priority = 0

export const frameLoop = {
    get idle() {
        return !startQueue.size && !currentFrame.length
    },

    start(audio: OpaqueSynth) {
        if (priority > audio.priority) {
            startQueue.add(audio)
            raf.onStart(() => {
                startQueue.forEach(startSafely)
                startQueue.clear()
                raf(advance)
            })
        } else {
            startSafely(audio)
            raf(advance)
        }
    },

    advance,

    sort(audio: OpaqueSynth) {
        if (priority) {
            raf.onFrame(() => frameLoop.sort(audio))
        } else {
            const prevIndex = currentFrame.indexOf(audio)
            if (~prevIndex) {
                currentFrame.splice(prevIndex, 1)
                startUnsafely(audio)
            }
        }
    },

    clear() {
        currentFrame = []
        startQueue.clear()
    },
}

function advance(dt: number) {
    const nextFrame = prevFrame

    for (let i = 0; i < currentFrame.length; i++) {
        const audio = currentFrame[i]
        priority = audio.priority

        if (!audio.idle) {
            // G.willAdvance(audio)
            audio.advance(dt)
            if (!audio.idle) {
                nextFrame.push(audio)
            }
        }
    }
    priority = 0
    prevFrame = currentFrame
    prevFrame.length = 0
    currentFrame = nextFrame

    return currentFrame.length > 0
}

// util

function startSafely(audio: OpaqueSynth) {
    if (!currentFrame.includes(audio)) startUnsafely(audio)
}

function startUnsafely(audio: OpaqueSynth) {
    const id = findIndex(currentFrame, other => other.priority > audio.priority)
    currentFrame.splice(id, 0, audio)
}

function findIndex<T>(arr: T[], test: (value: T) => boolean) {
    const index = arr.findIndex(test)
    return index < 0 ? arr.length : index
}
