import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';
import { APP_NAME } from '@/config/constants.js';

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const close = () => setExpanded(false);

  return (
    <header className="app-header">
      <Navbar
        expand="md"
        bg="white"
        expanded={expanded}
        onToggle={setExpanded}
        className="border-bottom"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={close} className="fw-semibold">
            {APP_NAME}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" aria-label="Открыть меню" />
          <Navbar.Collapse id="main-nav">
            <Nav as="nav" className="ms-auto" aria-label="Основная навигация">
              <Nav.Link as={NavLink} to="/" end onClick={close}>
                Все рецепты
              </Nav.Link>
              <Nav.Link as={NavLink} to="/recipes/new" onClick={close}>
                Добавить рецепт
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
