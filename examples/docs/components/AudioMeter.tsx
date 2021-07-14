import React from "react";
import styled from 'styled-components'

export function AudioMeter () {
    return (
        <></>
    )
}

AudioMeter.Root = styled.div`
    display: flex;
    width: 48px;
    height: 48px;
    padding: 50px;
`

AudioMeter.Canvas = styled.canvas`
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    borderRadius: 50%;
`

AudioMeter.Button = styled.div`
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
`
