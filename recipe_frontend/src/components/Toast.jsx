import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function Toast({ message, onHide, duration = 2400 }) {
  /** Snackbar/Toast with auto-hide and focus management for screen readers. */
  const ref = useRef(null);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (typeof onHide === 'function') {
        onHide();
      }
    }, duration);
    if (ref.current) {
      try {
        ref.current.focus();
      } catch (e) {
        // ignore focus errors
      }
    }
    return () => clearTimeout(timer);
  }, [message, duration, onHide]);

  if (!message) return null;

  return (
    <div
      className="toast"
      role="status"
      aria-live="polite"
      tabIndex={-1}
      ref={ref}
    >
      {message}
    </div>
  );
}
