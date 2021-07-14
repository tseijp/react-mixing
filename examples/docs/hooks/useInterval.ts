import * as React from "react";

export function useInterval(
  callback: () => void,
  delay?: number | null
): void

export function useInterval (callback: any, delay: any=null) {
    const lastCallback = React.useRef(() => {});

    React.useEffect(() => void (lastCallback.current = callback), [callback]);

    React.useEffect(() => {
        if (delay == null) return;
        lastCallback.current();
        const id = setInterval(() => void lastCallback.current(), delay);
        return () => void clearInterval(id);
    }, [delay]);
}
