import { Col, Row, Table } from "react-bootstrap";

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <AnswerTable answers={props.answers}></AnswerTable>
      </Row>
    </>
  );
}

function AnswerTable(props) {
  return (
    <Table striped>
      <thead>
        <th>Date</th>
        <th>Text</th>
        <th>Author</th>
        <th>Score</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {props.answers.map(ans => <AnswersRow answer={ans} key={ans.id}></AnswersRow>)}
      </tbody>
    </Table>
  );
}

function AnswersRow(props) {
  return (
    <tr>
      <td>{props.answer.date.format('YYYY-MM-DD')}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.name}</td>
      <td>{props.answer.score}</td>
      <td>TODO</td>
    </tr>
  );
}

export { Answers }