import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function ConfirmModal({ open, title = 'Confirm', message, onCancel, onConfirm }) {
  /** Simple confirmation modal with basic focus management. */
  const cancelRef = useRef(null);
  useEffect(() => {
    if (open && cancelRef.current) {
      cancelRef.current.focus();
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <h3>{title}</h3>
        <p style={{ marginTop: 8 }}>{message}</p>
        <div className="modal-actions">
          <button ref={cancelRef} className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
