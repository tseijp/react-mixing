// ref
// https://codesandbox.io/s/sequencer-c9i45
import React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import theme from '@theme/hooks/useThemeContext';

export * from './utils'
export * from './ShapeButton'
export * from './useAudioContext'
export * from './useAudioInterval'
export * from './useAudioSamples'
export * from './useAudioScheduler'

export function SequencerView (props: any) {
    const {children, ...other} = props
    return (
      <SequencerView.Provider>
        <SequencerView.Container>
          {children}
        </SequencerView.Container>
      </SequencerView.Provider>
    )
}
SequencerView.Provider = (props: any) => <ThemeProvider {...props} theme={theme()}/>

SequencerView.Container = styled.div`
    margin: 0 auto;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
`

SequencerView.Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
`

SequencerView.Divider = styled.div`
    align-self: stretch;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
`

SequencerView.TimeSignature = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: end;
`

SequencerView.Tempo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: end;
`

SequencerView.TempoLabels = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > * {
      flex: 1 1 0;
    }
`

SequencerView.Content = styled.div`
    flex: 1;
    display: grid;
    place-items: center;
    grid-auto-rows: minmax(80px, 1fr);
`

SequencerView.NoteLine = styled.div<any>`
    width: 1px;
    align-self: stretch;
    z-index: -10;
    background: #ddd;
    ${({quarter}: any) => quarter?
        `background: #aaa`: ''}
`
