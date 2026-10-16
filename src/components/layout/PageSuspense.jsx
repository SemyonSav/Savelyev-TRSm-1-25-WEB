import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

/** @param {{ children: import('react').ReactNode }} props */
export default function PageSuspense({ children }) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
