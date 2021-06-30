import React, {createElement as el} from "react";
import styled from 'styled-components'

export type Shape = "dot" | "circle" | "square" | "triangle";

export function ShapeButton (
    props: {shape: Shape} & React.ComponentProps<'button'>
): null | JSX.Element

export function ShapeButton (props: any) {
    const {shape, ...other} = props
    return el(ShapeButton.Root, other, el(ShapeButton[shape]))
}

ShapeButton.Root = styled.button`
    width: 46px;
    height: 46px;

    display: inline-block;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.2));
    transition: all 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    :hover {
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2)) brightness(1.2);
    }
    :active {
        transform: scale(0.9);
    }
`

ShapeButton.Shape = styled.div`
    display: block;
    border: none;
    width: 100%;
    height: 100%;
    transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    background-color 400ms;
`

ShapeButton.dot = styled(ShapeButton.Shape)`
    background-color: #333;
    border-radius: 50%;
    clip-path: polygon(0 0, 50% 0, 100% 0, 100% 50%, 100% 100%, 0 100%);
    transform: rotate(0) scale(0.4);
`

ShapeButton.circle = styled(ShapeButton.Shape)`
    background-color: #f44b55;
    border-radius: 50%;
    clip-path: polygon(0 0, 50% 0, 100% 0, 100% 50%, 100% 100%, 0 100%);
    transform: rotate(-90deg) scale(1);
`

ShapeButton.square = styled(ShapeButton.Shape)`
    background-color: #008ac6;
    border-radius: 10%;
    clip-path: polygon(0 0, 10% 0, 100% 0, 100% 90%, 100% 100%, 0 100%);
    transform: rotate(-180deg) scale(0.9);
`

ShapeButton.triangle = styled(ShapeButton.Shape)`
    background-color: #daaeea;
    border-radius: 8%;
    clip-path: polygon(0 0, 8% 0, 54% 46%, 100% 92%, 100% 100%, 0 100%);
    transform: rotate(-225deg) skew(-10deg, -10deg) translate(20%, -20%);
`
