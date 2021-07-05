import React from "react";
import styled from "styled-components";

export function Channel (props: {
    id: string;
    letter: string;
    label: string;
}): null | JSX.Element

export function Channel ({ id, letter, label }: any) {
    const sound: any = document.getElementById(letter);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (sound)
            sound.volume = parseInt(e.target.value, 10) / 10;
    };

    return (
        <Channel.Div>
          <Channel.Input
            id={"chan-strip-volume" + id}
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
