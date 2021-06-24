import { MixingValue } from 'react-mixing'

describe('MixingValue', () => {
    it('can animate a number', async () => {
        const mixing = new MixingValue(0)
        mixing.start(1)
        // const frames = global.getFrames(mixing)
        expect(frames).toMatchSnapshot()
    })

    it('can animate a string', async () => {
        const mixing = new MixingValue<string>('')
        const promise = mixing.start({
            to: '10px 20px',
            from: '0px 0px',
        })
        // await global.advanceUntilIdle()
        const frames = global.getFrames(mixing)
        expect(frames).toMatchSnapshot()
        // const { finished } = await promise
        // expect(finished).toBeTruthy()
    })

    it('can animate an array of numbers', async () => {
        const onChange = jest.fn()
        const mixing = new MixingValue([1])
        mixing.start({
            to: [10, 20],
            from: [0, 0],
            onChange,
        })
        // expect(global.getFrames(mixing)).toMatchSnapshot()
    })
})
