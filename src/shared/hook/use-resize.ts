'use client';

import { useEffect } from 'react';

export default function useResize(cb: EventListenerOrEventListenerObject) {
  useEffect(() => {
    window.addEventListener('resize', cb);
    return () => {
      window.removeEventListener('resize', cb);
    };
  }, [cb]);
}
