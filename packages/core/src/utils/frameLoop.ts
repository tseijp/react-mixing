import { raf } from 'rafz'

export interface OpaqueSynthesis {
    idle: boolean
    priority: number
    advance(dt: number): void
}

const startQueue = new Set<OpaqueSynthesis>()
let currentFrame: OpaqueSynthesis[] = []
let prevFrame: OpaqueSynthesis[] = []
let priority = 0

export const frameLoop = {
    get idle() {
        return !startQueue.size && !currentFrame.length
    },

    start(synthesis: OpaqueSynthesis) {
        if (priority > synthesis.priority) {
            startQueue.add(synthesis)
            raf.onStart(() => {
                startQueue.forEach(startSafely)
                startQueue.clear()
                raf(advance)
            })
        } else {
            startSafely(synthesis)
            raf(advance)
        }
    },

    advance,

    sort(synthesis: OpaqueSynthesis) {
        if (priority) {
            raf.onFrame(() => frameLoop.sort(synthesis))
        } else {
            const prevIndex = currentFrame.indexOf(synthesis)
            if (~prevIndex) {
                currentFrame.splice(prevIndex, 1)
                startUnsafely(synthesis)
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
        const synthesis = currentFrame[i]
        priority = synthesis.priority

        if (!synthesis.idle) {
            // G.willAdvance(synthesis)
            synthesis.advance(dt)
            if (!synthesis.idle) {
                nextFrame.push(synthesis)
            }
        }
    }
    priority = 0
    prevFrame = currentFrame
    prevFrame.length = 0
    currentFrame = nextFrame

    return currentFrame.length > 0
}

function startSafely(synthesis: OpaqueSynthesis) {
    if (!currentFrame.includes(synthesis)) startUnsafely(synthesis)
}

function startUnsafely(synthesis: OpaqueSynthesis) {
    const id = findIndex(currentFrame, other => other.priority > synthesis.priority)
    currentFrame.splice(id, 0, synthesis)
}

function findIndex<T>(arr: T[], test: (value: T) => boolean) {
    const index = arr.findIndex(test)
    return index < 0 ? arr.length : index
}
