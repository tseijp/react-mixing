import React, {createElement as el} from 'react'
import styled from 'styled-components'
// import {lighten, darken} from 'polished'
import theme from '@theme/hooks/useThemeContext';
import Layout from '@theme/Layout'
import {ThemeProvider} from 'styled-components'

export * from './Channel'
export * from './DrumPad'
export * from './AudioSamples'

const colors = {
    red: "#E72E2E",
    orange: "#F8A125",
    yellow: "#F1F827",
    black: "#252525",
    darkGrey: "#5c5c5c",
    grey: "#f5f5e6",
    white: "#FFFFFF",
    border: "#cecece",
    background: "#F5F8FA",
};

export function DrumMachine (props: any) {
    const {children, ...other} = props
    return (
      <DrumMachine.Layout {...other}>
        <DrumMachine.Provider>
          <DrumMachine.Container>
            {children}
          </DrumMachine.Container>
        </DrumMachine.Provider>
      </DrumMachine.Layout>
    )
}

DrumMachine.Layout = styled(Layout)``

DrumMachine.Provider = (props: any) => <ThemeProvider {...props} theme={{...theme(), colors}}/>

DrumMachine.Container = styled.div`
    position: relative;
    width: 50vh;
    height: 50vh;
    margin: 100px 0px 100px 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: ${_ => _.theme.colors.black};
    background: radial-gradient(
        ellipse at top,
        ${_ => _.theme.colors.darkGrey} 0%,
        ${_ => _.theme.colors.black} 60%
    );
    border-left: 0.2em ridge ${_ => _.theme.colors.border};
    border-right: 0.2em groove ${_ => _.theme.colors.border};
`;

DrumMachine.TopContainer = styled.div`
    flex: 1;
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

DrumMachine.ChannelStrip = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    width: 95%;
    height: 100%;
`;

DrumMachine.LeftTop = styled.div`
    margin: 3em 1.5em;
    width: 50%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5em;
    box-sizing: border-box;
`;

DrumMachine.RightTop = styled.div`
    height: 90%;
    width: 50%;
    margin: 0em 1.5em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

DrumMachine.Display = styled.p`
    color: ${_ => _.theme.colors.white};
    padding: 5px;
    font-size: 1em;
`;
