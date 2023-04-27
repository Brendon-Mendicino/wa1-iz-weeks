import { Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Film } from "../films";
import './FilmList.css';

export function FilmList(props) {
  return (
    <div className="list-containter">
      <p>{props.filter}</p>
      <ListGroup className="film-list" variant="flush">
        {props.films.map((f) => (
          <ListGroupItem key={f.id}>
            <Row>
              <Col className="col-3">{f.title}</Col>
              <Col className="col-3 text-end">
                <input type="checkbox" checked={f.isFavourite} />
                Favoutite
              </Col>
              <Col className="col-3 text-end">
                {f.watchDate?.format("DD MMM YYYY")}
              </Col>
              <Col className="col-3 text-end">
                <Rating rating={f.rating} id={f.id} />
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

function Rating(props) {
  return (
    <Form className="rating">
      {[1, 2, 3, 4, 5].map((label) => (
        <Form.Check
          as="input"
          inline
          label={'☆'}
          value={label}
          defaultChecked={label === props.rating}
          type="radio"
          id={`${props.id}-rating`}
        />
      ))}
    </Form>
  );
}
