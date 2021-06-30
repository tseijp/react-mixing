import React, {useEffect, useState, useRef, useCallback as call} from 'react'
import {Sequencer} from '../../../components/Sequencer'
import styled from 'styled-components'

const getNotesForOctave = (octave: any) =>
    Object.keys(Sequencer.Notes).reduce((state, note) => {
        if (note.split('').pop() === String(octave))
            state[note] = Sequencer.Notes[note]
        return state
    }, {})

const defaultPads = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0]
]

export default function () {
    const synth = useRef(null as any),
        interval = useRef(null as any),
        [bpm, setBpm] = useState(150),
       [step, setStep] = useState(0),
      [steps,_setSteps] = useState(8),
     [octave, setOctave] = useState(4),
    [release, setRelease] = useState(100),
    [playing, setPlaying] = useState(false),
      [delay, setDelay] = useState(false),
       [type, setTypes] = useState('sine'),
      [notes, setNotes] = useState(getNotesForOctave(4)),
       [pads, setPads] = useState(defaultPads)


    const changeBPM = call((bpm) => {
        if (60 < bpm && bpm < 300) return
        setBpm(() => bpm)
    }, [])

   const changeOctave = call((octave) => {
        setOctave(Number(octave))
        setNotes(getNotesForOctave(Number(octave)))
    }, [])

    const play = call(() => {
        synth.current = new Sequencer.Synth()
        const notesArray = Object.keys(notes).map(key => notes[key])
        setPlaying(true)
        interval.current = setInterval(() => {
            setStep(step => step < steps - 1? step + 1 : 0)
            const next = pads[step]
                .map((pad, i) => (pad === 1 ? notesArray[i] : null))
                .filter(x => x)
              synth.current?.playNotes(next, {release, bpm, type, delay})
        }, (60 * 1000) / bpm / 2)
    }, [bpm, notes, type, release, delay])

    const pause = call(() => {
        setStep(0)
        setPlaying(false)
        clearInterval(interval.current)
    }, [])

    const togglePad = call((group, pad) => {
        setPads(pads => {
            const clonedPads = pads.slice(0)
            const padState = clonedPads[group][pad]
            clonedPads[group] = [0, 0, 0, 0, 0, 0, 0, 0]
            clonedPads[group][pad] = padState === 1 ? 0 : 1
            return clonedPads
        })
    }, [])

    useEffect(() => {
        pause()
        if (playing) play()
    }, [pause, play, bpm, type, octave, playing, delay, release])

    return (
      <Sequencer>
        <Sequencer.Buttons>
          <button
            type="button"
            className={playing ? 'active' : ''}
            onClick={() => {
              if (playing) pause()
              else play()
            }}
          >
            {playing? 'Pause': 'Play'}
          </button>

          <Sequencer.SelectWrapper>
            <span>BPM</span>
            <input
              type="number"
              min="80"
              max="300"
              step="1"
              defaultValue={bpm}
              onChange={e => changeBPM(e.target.value)}
            />
          </Sequencer.SelectWrapper>

          <Sequencer.SelectWrapper>
            <span>Wave</span>
            <select
              value={type}
              data-label="wave"
              className="wave"
              onChange={e => setTypes(e.target.value)}
            >
              <option>Sine</option>
              <option>Square</option>
              <option>Sawtooth</option>
              <option>Triangle</option>
            </select>
          </Sequencer.SelectWrapper>

          <Sequencer.SelectWrapper>
            <span>Octave</span>
            <select
              value={octave}
              data-label="octave"
              className="octave"
              onChange={e => changeOctave(e.target.value)}
            >

              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </Sequencer.SelectWrapper>

          <Sequencer.SelectWrapper>
            <span>Release</span>
            <input
              type="number"
              min="0"
              max="400"
              step="1"
              defaultValue={release}
              onChange={e => setRelease(Number(e.target.value))}
            />
          </Sequencer.SelectWrapper>

          <button
            type="button"
            className={delay? 'active': ''}
            onClick={() => setDelay(delay => !delay)}
          >
            Delay
          </button>
        </Sequencer.Buttons>

        <Sequencer.NoteSet>
          {Object.keys(notes)
            .slice(0, 8)
            .reverse()
            .map(note => (
              <li key={`note-${note}`}>
                {note.slice(0, note.length - 1)}
              </li>
            ))}
        </Sequencer.NoteSet>

        <Sequencer.Flex>
          {pads.map((group, j) => (
            <Sequencer.Pads key={`pad-${j}`}>
              {group.map((pad, i) => (
                <Sequencer.Pad
                  key={`pad-group-${i}`}
                  light={pad === 1}
                  active={j === step}
                  onClick={() => {
                    togglePad(j, i)
                  }}
                >
                </Sequencer.Pad>
              ))}
            </Sequencer.Pads>
          ))}
        </Sequencer.Flex>
      </Sequencer>
    )
}
