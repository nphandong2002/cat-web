'use client';

import { useEffect, useRef } from 'react';

export default function useResize(cb: EventListenerOrEventListenerObject) {
  useEffect(() => {
    window.addEventListener('resize', cb);
    return () => {
      window.removeEventListener('resize', cb);
    };
  }, []);
}
