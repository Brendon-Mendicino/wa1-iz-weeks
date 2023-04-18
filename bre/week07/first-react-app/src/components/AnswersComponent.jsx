import { Button, Col, Row, Table } from "react-bootstrap";
import "./AnswersComponent.css";
import { NewAnswerForm } from "./NewAnswerForm";
import { useState } from "react";

function Answers(props) {

  const [formHidden, setFormHidden] = useState(false);

  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <AnswerTable answers={props.answers} voteUp={props.voteUp}></AnswerTable>
        <div className="hide-form">
          <Button onClick={() => setFormHidden(hidden => !hidden)}>{formHidden ? "Show Form" : "Hide Form" }</Button>
        </div>
        {formHidden ? "" : <NewAnswerForm />}
      </Row>
    </>
  );
};

function AnswerTable(props) {
  return (
    <Table striped className="answer-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.answers.map(ans => <AnswersRow answer={ans} key={ans.id} voteUp={props.voteUp}></AnswersRow>)}
        <NewAnswerRow />
      </tbody>
    </Table>
  );
};

function AnswersRow(props) {
  return (
    <tr>
      <td>{props.answer.date.format('YYYY-MM-DD')}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.name}</td>
      <td>{props.answer.score}</td>
      <td><VoteButton voteUp={props.voteUp} id={props.answer.id}/></td>
    </tr>
  );
};

function NewAnswerRow(props) {
  return (
    <tr>
      <td><input type="date"></input></td>
      <td><input type="text"></input></td>
      <td><input type="text"></input></td>
      <td><input type="number"></input></td>
      <td><Button>Submit</Button></td>
    </tr>
  );
};

function VoteButton(props) {
  return (
    <Button onClick={() => props.voteUp(props.id)}>
      Vote Up
    </Button>
  );
};


export { Answers }