import { Spinner } from 'react-bootstrap';

/**
 * @param {{ label?: string, className?: string }} props
 */
export default function Loader({ label = 'Загрузка…', className = '' }) {
  return (
    <div className={`loader ${className}`} role="status" aria-live="polite">
      <Spinner animation="border" variant="primary" aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  );
}
