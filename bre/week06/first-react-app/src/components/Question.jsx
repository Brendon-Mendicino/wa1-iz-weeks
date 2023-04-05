import { Badge, Col, Row } from 'react-bootstrap';
import './Question.css'
import { Question } from '../QAModels';

const q = new Question();

export function QuestionAsked(props) {
  return (
    <>
      <Row className="question">
        <Col><h2>Question:</h2></Col>
        <Col>
          Asked by:{' '}<Badge pill bg="primary">{props.question.author}</Badge>
        </Col>
      </Row>
      <Row>
        <p><em>{props.question.text}</em></p>
      </Row>
    </>
  );
};
