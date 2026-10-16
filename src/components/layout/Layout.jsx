import { Container } from 'react-bootstrap';
import { Outlet, ScrollRestoration } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
