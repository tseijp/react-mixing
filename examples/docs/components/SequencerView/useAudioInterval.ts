import React from 'react'
import {range} from './utils'
import {useInterval} from './useInterval'

export function useAudioInterval (audioDestination: any, options) {
    const {
        notes,
        samples,
        isPlaying=false,
        notesCount,
        noteDuration,
        samplesCount,
    } = options
    const contentRef = React.useRef<HTMLDivElement>(null);
    const nextNoteIdx = React.useRef(0);
    const nextNoteTime = React.useRef(Infinity);
    const audioContext = audioDestination?.context;

    useInterval(() => {
        if (audioContext == null || audioDestination == null) return;
        while (nextNoteTime.current < audioContext.currentTime + 0.5) {
            const noteIdx = nextNoteIdx.current % notesCount;
            if (samples != null) {
                for (const sampleIdx of range(samplesCount)) {
                    if (notes[sampleIdx][noteIdx]) {
                        const bufferSource = audioContext.createBufferSource();
                        bufferSource.buffer = samples[sampleIdx];
                        bufferSource.connect(audioDestination);
                        bufferSource.start(nextNoteTime.current);
                    }
                }
            }

            // Schedule animations.
            const timeUntilNote = nextNoteTime.current - audioContext.currentTime;
            contentRef.current
              ?.querySelectorAll(`[data-note="${noteIdx}"]`)
              .forEach((noteElement: any) =>
                noteElement.animate(
                  [
                    { transform: "scale(1.3)" },
                    { transform: "scale(1.3)" },
                    { transform: "scale(1)" }
                  ],
                  {
                    delay: timeUntilNote * 1000,
                    duration: 400,
                    easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    composite: "accumulate"
                  }
                )
              );

            nextNoteIdx.current += 1;
            nextNoteTime.current += noteDuration;
        }
    }, isPlaying ? 400 : null)


    React.useEffect(() => {
        if (isPlaying) {
            nextNoteIdx.current = 0;
            nextNoteTime.current = audioContext?.currentTime ?? 0;
        }
    }, [audioContext, isPlaying]);

    return contentRef
}
