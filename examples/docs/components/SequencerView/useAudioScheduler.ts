import React from "react"

const scheduleAheadDuration = 0.5

interface AudioSchedulerParams {
    audioContext: AudioContext
    isPlaying: boolean
    tempo: number
    schedule: (
        noteNumber: number,
        helpers: {
          getNoteTime: (noteNumber: number) => number
          onNote: (noteNumber: number, cb: () => void) => void
        }
    ) => void
}

export function useAudioScheduler(params: AudioSchedulerParams) {
  const { audioContext, isPlaying, tempo, schedule } = params
  const tick = React.useRef(() => {})
  const nextNoteTime = React.useRef(0)
  const nextNoteNumber = React.useRef(0)

    // Update the tick callback.
    React.useEffect(() => {
        tick.current = () => {
            // Schedule all the notes which are about to be played.
            while (
                nextNoteTime.current <
                audioContext.currentTime + scheduleAheadDuration
            ) {
                const noteDuration = 60 / tempo
                const currentNoteTime = nextNoteTime.current
                const currentNoteNumber = nextNoteNumber.current

                // Run `schedule` for current note.
                const getNoteTime = (noteNumber: number) => {
                    const deltaNoteNumber = noteNumber - currentNoteNumber
                    const deltaTime = deltaNoteNumber * noteDuration
                    return currentNoteTime + deltaTime
                }
                const onNote = (noteNumber: number, cb: () => void) => {
                    const noteTime = getNoteTime(noteNumber)
                    const timeFromNow = noteTime - audioContext.currentTime
                    setTimeout(cb, timeFromNow * 1000)
                }
                schedule(currentNoteNumber, { getNoteTime, onNote })

                nextNoteTime.current += noteDuration
                nextNoteNumber.current += 1
            }
        }
    }, [audioContext, schedule, tempo])

    // Setup the ticking interval.
    React.useEffect(() => {
        if (!isPlaying) return

        // Reset current note when anything changes.
        nextNoteNumber.current = 0
        nextNoteTime.current = audioContext.currentTime

        // Run first tick immediately.
        tick.current()

        // Run next ticks as often as possible but not too much.
        const interval = setInterval(() => {
            tick.current()
        }, (scheduleAheadDuration / 2) * 1000)

        return () => void clearInterval(interval) // Stop ticking.
    }, [audioContext, isPlaying])
}
