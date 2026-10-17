import { Suspense } from 'react';
import Loader from '@/components/common/Loader.jsx';

/** @param {{ children: import('react').ReactNode }} props */
export default function PageSuspense({ children }) {
  return <Suspense fallback={<Loader label="Загрузка страницы…" />}>{children}</Suspense>;
}
