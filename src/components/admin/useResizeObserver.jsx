import { useEffect, useRef } from 'react';

const useResizeObserver = (callback) => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new ResizeObserver(entries => {
      entries.forEach(entry => {
        callback(entry);
      });
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback]);

  return {
    observe: (element) => {
      if (observerRef.current && element) {
        observerRef.current.observe(element);
      }
    },
    disconnect: () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  };
};

export default useResizeObserver;
