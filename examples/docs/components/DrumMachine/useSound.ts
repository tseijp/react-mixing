import { useCallback } from "react";

export const useSound = (filePath: string) => {
    const audio = new Audio(filePath);

    const setVolume = useCallback((volume: number) => {
        const value = volume / 11;
        audio.volume = Math.pow(value, 2) / (2 - value);
    }, [audio]);

    const playSound = useCallback(() => {
        audio.currentTime = 0;
        audio.play();
    }, [audio]);

    return { playSound, setVolume };
};
