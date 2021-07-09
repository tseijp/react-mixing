import React, { useState } from "react";
import styled from "styled-components";

export function DrumPad(props: {
    id: string|number;
    filePath: string;
    letter: string;
    keyCode: number;
    onButtonPress: () => void;
}): null | JSX.Element

export function DrumPad (props: any) {
    const {
        id,
        filePath,
        letter,
        keyCode,
        onButtonPress
    } = props

    const [active, setActive] = useState(false);

    const sound: any = document.getElementById(letter)

    const handleButtonPress = () => {
        onButtonPress();
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
        setActive(true);
        setTimeout(() => setActive(false), 200);
    };

    document.addEventListener("keydown", (e: any) => {
        if (!sound || e.which !== keyCode) return
        sound.currentTime = 0;
        sound.play();
        onButtonPress();
        setActive(true);
        setTimeout(() => setActive(false), 200);
    });

    return (
        <DrumPad.Button onClick={handleButtonPress}>
          <audio className="clip" id={letter} src={filePath}/>
          <DrumPad.Light active={active}/>
          <DrumPad.Letter children={letter}/>
        </DrumPad.Button>
    );
};

DrumPad.Button = styled.button`
    padding: 3%;
    width: 30%;
    height: 30%;
    margin: 1%;
    border: none;
    border-radius: 0.1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.grey};
    border: 0.2em groove ${({ theme }) => theme.colors.black};
`;

DrumPad.Light = styled.div<any>`
  padding: 0.5vmin;
  border-radius: 0.5vmin;
  color: #252525;
  background-color: ${_ => _.active? "red": "darkred"};
`

DrumPad.Letter = styled.p`
    margin-block-end: 0vmin;
    font-size: 2vmin;
`
