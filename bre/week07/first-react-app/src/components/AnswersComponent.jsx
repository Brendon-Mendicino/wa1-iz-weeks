import { Button, Col, Row, Table } from "react-bootstrap";
import "./AnswersComponent.css";
import { NewAnswerForm } from "./NewAnswerForm";
import { useState } from "react";

const sortIcon =
  < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-numeric-down" viewBox="0 0 16 16" >
    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
    <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
  </svg >;

const upIcon =
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
  </svg>;

const editIcon =
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg>;


function Answers(props) {
  const [formHidden, setFormHidden] = useState(true);
  const [editableAnswer, setEditableAnswer] = useState();

  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <AnswerTable answers={props.answers} voteUp={props.voteUp}
          setEditableAnswer={ans => {
            setEditableAnswer(ans);
            setFormHidden(false);
          }}></AnswerTable>
        {
          formHidden ?
            <AddAnswerButton onClick={() => setFormHidden(false)} /> :
            <NewAnswerForm
              cancel={() => {
                setFormHidden(true);
                setEditableAnswer(null);
              }}
              updateAnswer={ans => {
                props.updateAnswer(ans);
                setFormHidden(true);
                setEditableAnswer(null);
              }}
              addAnswer={ans => {
                props.addAnswer(ans);
                setFormHidden(true);
                setEditableAnswer(null);
              }}
              editableAnswer={editableAnswer}
              key={editableAnswer?.id}
              lastId={props.answers.map(a => a.id).reduce((p, c) => p > c ? p : c)} />
        }
      </Row>
    </>
  );
};

function AddAnswerButton(props) {
  return (
    <div className="hide-form">
      <Button onClick={props.onClick}>Add answer</Button>
    </div>
  );
}

const sortOrder = {
  desc: 'desc',
  asc: 'asc'
};

function AnswerTable(props) {
  const [sortedBy, setSortedBy] = useState('none');

  const sortedAnswers = [...props.answers];
  if (sortedBy === sortOrder.desc) {
    sortedAnswers.sort((a, b) => a.score - b.score);
  } else {
    sortedAnswers.sort((a, b) => b.score - a.score);
  }

  const sortByScore = () => {
    setSortedBy(ord => (ord === sortOrder.asc) ? sortOrder.desc : sortOrder.asc);
  }

  return (
    <Table striped className="answer-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score <Button variant="link" onClick={sortByScore}>{sortIcon}</Button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedAnswers.map(ans => <AnswersRow answer={ans} key={ans.id} voteUp={props.voteUp} setEditableAnswer={props.setEditableAnswer}></AnswersRow>)}
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
      <td><AnswerActions answer={props.answer} voteUp={props.voteUp} setEditableAnswer={props.setEditableAnswer} /></td>
    </tr>
  );
};

function AnswerActions(props) {
  return (
    <>
      <Button variant="primary" onClick={() => props.voteUp(props.answer.id)}>{upIcon}</Button>
      <Button variant="success" onClick={() => props.setEditableAnswer(props.answer)}>{editIcon}</Button>
    </>
  );
};


export { Answers }