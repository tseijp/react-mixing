import React from 'react'
import {
    audioSamples,
    Channel,
    DrumPad,
    DrumMachine
} from '../../../components/DrumMachine'

export default function () {
  const [sampleName, setSampleName] = React.useState("Play a Sample");
  const handleButtonPress = (name='') => void setSampleName(name);
  return (
    <DrumMachine>
      <DrumMachine.TopContainer>
        <DrumMachine.LeftTop>
          <h1 style={{ fontStyle: "italic" }}>SamLand TR-808</h1>
          <DrumMachine.Display id="display">
            Sample: {sampleName}
          </DrumMachine.Display>
        </DrumMachine.LeftTop>
        <DrumMachine.RightTop>
          {audioSamples.map((audioSample, i) =>
            <DrumPad
              id={i}
              key={i}
              filePath={`audio/${audioSample.audio}`}
              keyCode={audioSample.keyNum}
              onButtonPress={() => handleButtonPress(audioSample.name)}
              letter={audioSample.letter}
            />
          )}
        </DrumMachine.RightTop>
      </DrumMachine.TopContainer>
      <DrumMachine.ChannelStrip>
        {audioSamples.map((audioSample, i) => {
          return (
            <Channel
              id={i.toString()}
              key={i.toString()}
              letter={audioSample.letter}
              label={audioSample.name}
            />
          );
        })}
      </DrumMachine.ChannelStrip>
    </DrumMachine>
  );
};
