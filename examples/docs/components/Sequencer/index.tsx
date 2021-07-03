import React, {createElement as el} from 'react'
import styled from 'styled-components'
import Synth from './Synth'
import Notes from './Notes'
import Layout from '@theme/Layout'
import {lighten, darken} from 'polished'
import {ThemeProvider} from 'styled-components'
import theme from '@theme/hooks/useThemeContext';

const $dark = lighten(0.02, '#121214')
const $light = darken(0.02, "#ededeb")
const $steps = '10'
const $primary = '#0087ff'
const $controller_size = '600px'
const $radius = '4px'

export function Sequencer (props: any) {
    const {children, ...other} = props
    return (
      <Sequencer.Layout {...other}>
        <Sequencer.Provider>
          <Sequencer.Container>
            {children}
          </Sequencer.Container>
        </Sequencer.Provider>
      </Sequencer.Layout>
    )
}

Sequencer.Layout = styled(Layout)`
    background: ${$dark};
    font-family: 'Helvetica Neue';
    display: flex;
    flex-direction: column;
    text-align: center;
`
Sequencer.Provider = (props: any) => <ThemeProvider {...props} theme={theme()}/>

Sequencer.Container = styled.div`
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    padding: 1em;
    background: ${_ => _.theme?.isDarkTheme
        ? lighten(0.004, $dark)
        : darken(0.004, $light)};
    border-radius: ${$radius};
    h1 {
        margin-top: 0;
        color: white;
        opacity: 0.3;
        font-weight: lighter;
        letter-spacing: 2px;
        font-size: 2em;
        font-family: 'Allan', 'Helvetica Neue';
    }
`

Sequencer.Flex = styled.div`
    display: flex;
    flex-direction: row;
`

Sequencer.NoteSet = styled.ul`
    list-style-type: none;
    position: absolute;
    left: -100px;
    top: 70px;
    text-align: right;
    color: ${_ => _.theme?.isDarkTheme? 'white': 'black'};
    line-height: 60px;
    opacity: 0.3;
`

Sequencer.Buttons = styled.div`
    display: flex;
    padding: 0.35em 0 0.5em;

    button, select, input {
        margin: 5px;
        outline: none;
        background: ${_ => _.theme?.isDarkTheme
            ? lighten(0.1, $dark)
            : darken(0.1, $light)};
        color: ${_ => _.theme?.isDarkTheme? 'white': 'black'};
        padding: 1em;
        font-size: 12px;
        letter-spacing: 1px;
        border-radius: 4px;
        box-shadow: 0 1px 2px 0 rgba(black, 0.2);
        cursor: pointer;
        border: 2px solid transparent;

        .active {
            color: ${$primary};
            border: 2px solid ${$primary};
        }
    }
    select {
        position: relative;
        height: 42px;
        min-width: 50px;
    }
`
Sequencer.SelectWrapper = styled.div`
    position: relative;
    span {
        position: absolute;
        color: ${_ => _.theme?.isDarkTheme? 'white': 'black'};
        top: -10px;
        left: 8px;
        font-size: 9px;
        letter-spacing: 1px;
        opacity: 0.3;
    }
`

Sequencer.Pads = styled.div`
    box-sizing: border-radius;
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
`

Sequencer.Pad = styled.div<any>`
    background: ${_ => _.theme?.isDarkTheme
        ? lighten(0.1, $dark)
        : darken(0.1, $light)};
    border-radius: ${$radius};
    cursor: pointer;
    width: calc(${$controller_size} / ${$steps} - 10px);
    height: calc(${$controller_size} / 10 - 10px);
    margin: 5px;
    box-shadow: 0 1px 3px 0 rgba(black, 0.3);
    transition: background 100ms ease;

    :hover {
        background: ${_ => _.theme?.isDarkTheme
            ? lighten(0.15, $dark)
            : darken(0.15, $light)};
    }

    ${({active=false, theme}: any) => active && `
        background: ${theme?.isDarkTheme
            ? lighten(0.15, $dark)
            : darken(0.15, $light)};
    `}

    ${({light=false}: any) => light && `
        background: ${$primary}!important;
        box-shadow: 0 0 12px 0 rgba(${$primary}, 0.8);
    `}
`

Sequencer.Notes = Notes

Sequencer.Synth = Synth
