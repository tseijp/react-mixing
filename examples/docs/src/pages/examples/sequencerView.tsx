import * as React from "react";
import {
    range,
    ShapeButton,
    SequencerView,
    useAudioSamples,
    useAudioInterval,
    useAudioContext,
} from '../../../components/SequencerView'

const sampleUrls = [
    "https://halodzwieki.s3.eu-west-3.amazonaws.com/sounds/rytm/e/kick.mp3",
    "https://halodzwieki.s3.eu-west-3.amazonaws.com/sounds/rytm/e/sd.mp3",
    "https://halodzwieki.s3.eu-west-3.amazonaws.com/sounds/rytm/e/hh.mp3"
];
const NOTE = 8; // eight-note

const SHAPES = ["circle", "square", "triangle"] as const;

const NOTES = {
    house: [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],],
    dubstep: [
        [1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0 ,0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],],
    drumbass: [
        [1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 0, 1],],
    reggaeton: [
        [1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],]
}


export default function () {
    const [bpm, setBpm] = React.useState(128);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [[beatsPerBar, beatNote], setTimeSignature] = React.useState([4, 4]);
    const [notes, setNotes] = React.useState<number[][]>([[], [], []]);


    const audioDestination = useAudioContext();
    const audioContext = audioDestination?.context;
    const samples = useAudioSamples(sampleUrls, audioContext)

    const notesCount = (beatsPerBar * NOTE) / beatNote;
    const samplesCount = sampleUrls.length;
    const noteDuration = (60 / bpm) * (beatNote / NOTE);

    const contentRef = useAudioInterval(
        audioDestination,
        {notes, samples, isPlaying, notesCount, noteDuration, samplesCount}
    )

    return (
        <SequencerView.Root>
          <SequencerView.Controls>
            <SequencerView.TimeSignature>
              <h4>Time signature</h4>
              <div>
                <button onClick={() => setTimeSignature([4, 4])}>4 / 4</button>{" "}
                <button onClick={() => setTimeSignature([3, 4])}>3 / 4</button>
              </div>
              <p>{beatsPerBar} / {beatNote}</p>
            </SequencerView.TimeSignature>

            <SequencerView.Divider />

            <SequencerView.Tempo>
              <h4>Tempo</h4>
              <SequencerView.TempoLabels>
                <span>Lento</span>
                <span>Andante</span>
                <span>Allegro</span>
              </SequencerView.TempoLabels>
              <input
                type="range"
                min={80}
                max={200}
                step={4}
                value={bpm}
                onChange={(ev) => setBpm(Number(ev.target.value))}
              />
              <p>{bpm}</p>
            </SequencerView.Tempo>
          </SequencerView.Controls>

          <SequencerView.Divider />

          <SequencerView.Content ref={contentRef}>
            {range(samplesCount).map((sampleIdx) =>
                range(notesCount).map((noteIdx) => (
                    <ShapeButton
                        data-note={noteIdx}
                        key={`note_${noteIdx}_${sampleIdx}`}
                        style={{ gridColumn: noteIdx + 1, gridRow: sampleIdx + 1 }}
                        shape={
                            notes[sampleIdx][noteIdx]
                              ? SHAPES[sampleIdx % SHAPES.length]
                              : "dot"
                        }
                        onClick={() => {
                            setNotes(notes => {
                                notes[sampleIdx][noteIdx] ^= 1
                                return notes
                            });
                        }}
                    />
                ))
            )}

            {range(notesCount).map((i) => (
                <SequencerView.NoteLine
                    key={`line_${i}`}
                    quarter={(i / NOTE) % 0.25 === 0}
                    style={{
                        gridRowStart: 1,
                        gridColumn: i + 1,
                        gridRowEnd: sampleUrls.length + 1
                    }}
                />
            ))}
          </SequencerView.Content>

          <SequencerView.Divider />

          <p>
            <button
              style={{fontSize: 30}}
              disabled={samples == null}
              onClick={() => setIsPlaying((is) => !is)}
            >
              {isPlaying ? "STOP" : "PLAY"}
            </button>
          </p>

          <div>
            <button
              onClick={() => {
                setNotes(NOTES.house);
                setBpm(128);
                setTimeSignature([4, 4]);
              }}
            >
              House
            </button>{" "}
            <button
              onClick={() => {
                setNotes(NOTES.dubstep)
                setBpm(140);
                setTimeSignature([4, 4]);
              }}
            >
              Dubstep
            </button>{" "}
            <button
              onClick={() => {
                setNotes(NOTES.drumbass)
                setBpm(176);
                setTimeSignature([4, 4]);
              }}
            >
              Drum&amp;Bass
            </button>{" "}
            <button
              onClick={() => {
                setNotes(NOTES.reggaeton)
                setBpm(180);
                setTimeSignature([4, 4]);
              }}
            >
              Reggaeton
            </button>
          </div>
        </SequencerView.Root>
    );
}
