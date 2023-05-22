import { ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { filterType } from "../App";
import { Link } from "react-router-dom";

export function Sidebar(props) {
  const filters = Object.entries(filterType);
  let key = 0;

  return (
    <Nav className="flex-column">
      {filters.map((f) => (
        <Nav.Item key={key++}>
          <Link className="nav-link" to={`../${f[0]}`} relative="path">
            {f[1]}
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
