import * as React from "react";

export function useInterval(
  callback: () => void,
  delay?: number | null
): void

export function useInterval (callback: any, delay?: any) {
    const lastCallback = React.useRef(() => {});

    // Remember the latest callback.
    React.useEffect(() => {
        lastCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
        if (delay == null) return;
        lastCallback.current();
        const id = setInterval(() => {
            lastCallback.current();
        }, delay);
        return () => {
            clearInterval(id);
        };
    }, [delay]);
}
