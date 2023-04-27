import { ListGroup, ListGroupItem } from "react-bootstrap";
import { filterType } from "../App";

export function Sidebar(props) {
  const filters = Object.values(filterType)
  let key = 0;

  return (
    <ListGroup variant="flush">
      {filters.map((f) => (
        <ListGroupItem
          key={key++}
          active={props.filter === f}
          action
          variant="secondary"
          onClick={() => props.setFilter(f)}
        >
          {f}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
