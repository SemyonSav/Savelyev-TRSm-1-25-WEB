import { Container } from 'react-bootstrap';

const REPOSITORY_URL = 'https://github.com/SemyonSav/Savelyev-TRSm-1-25-WEB';

export default function Footer() {
  return (
    <footer className="app-footer border-top bg-white">
      <Container className="d-flex flex-column flex-sm-row justify-content-between gap-2 py-3 small text-body-secondary">
        <span>© {new Date().getFullYear()} Савельев С., ТРСм-1-25</span>
        <span>
          Данные:{' '}
          <a href="https://dummyjson.com/docs/recipes" target="_blank" rel="noreferrer">
            DummyJSON
          </a>{' '}
          ·{' '}
          <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </Container>
    </footer>
  );
}
