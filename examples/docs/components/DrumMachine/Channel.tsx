import React from "react";
import styled from "styled-components";
import {useOnce} from 'react-mixing/src'

export function Channel (props: {
    id: string;
    letter: string;
    label: string;
}): null | JSX.Element

export function Channel (props: any) {
    const { id, letter, label } = props;

    const [sound, setSound]: any = React.useState(null);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (sound)
            sound.volume = parseInt(e.target.value, 10) / 10;
    };

    useOnce(() => void setSound(document.getElementById(letter)))

    return (
        <Channel.Div>
          <Channel.Input
            id={id}
            type="range"
            min="0"
            max="10"
            onChange={handleVolumeChange}
          />
          <Channel.Label>{label}</Channel.Label>
        </Channel.Div>
    );
};

Channel.Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    margin: 2px;
    overflow: hidden;
`;

Channel.Input = styled.input`
    transform: rotate(-90deg) translate(50%, 0%);
    -webkit-appearance: none;
    height: 0.5vmin;
    width: 20vmin;
    background: black;
    position: relative;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 3.5vmin;
      height: 4vmin;
      background-color: rgb(255, 255, 255);
    }
`;

Channel.Label = styled.p`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.grey};
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    font-weight: 100;
    font-style: italic;
    white-space: nowrap;
`;
