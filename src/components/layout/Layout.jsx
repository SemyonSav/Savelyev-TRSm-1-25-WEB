import { Container } from 'react-bootstrap';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import ErrorBoundary from '@/components/common/ErrorBoundary.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Container className="py-4">
          {/* key сбрасывает состояние ошибки при переходе на другую страницу */}
          <ErrorBoundary key={pathname}>
            <Outlet />
          </ErrorBoundary>
        </Container>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
