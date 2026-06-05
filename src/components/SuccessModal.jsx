import { useEffect } from 'react';
import '../styles/SuccessModal.css';

export default function SuccessModal({ isOpen, onClose, title, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="success-modal-icon">
          <div className="success-checkmark">
            <svg viewBox="0 0 52 52" className="success-checkmark-svg">
              <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
        </div>
        
        <h2 className="success-modal-title">{title || 'Success!'}</h2>
        <p className="success-modal-message">{message}</p>
        
        <button className="success-modal-button" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}
