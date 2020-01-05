// JS code from https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj

import React, { useRef, useLayoutEffect } from "react";

export interface IScrollPos {
  x: number;
  y: number;
}

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({
  element,
  useWindow
}: {
  element?: React.MutableRefObject<HTMLElement>;
  useWindow?: boolean;
}) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

export default function useScrollPosition(
  effect: Function,
  deps: [],
  element?: React.MutableRefObject<HTMLElement>,
  useWindow?: boolean,
  wait?: number
) {
  // using the useRef() and not useState(). According to React-Hooks
  // reference guide, useRef() is useful for more than the ref attribute.
  // It’s handy for keeping any mutable value around similar to how you’d
  // use instance fields in classes. A stateful value that won't trigger
  // re-render on each state change.
  const position = useRef(getScrollPosition({ element, useWindow }));

  let throttleTimeout: NodeJS.Timeout | null = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, deps);
}
