import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import "./NewAnswerForm.css"
import dayjs from "dayjs";
import { Answer } from "../QAModels";



export function NewAnswerForm(props) {
  const [text, setText] = useState(props.editableAnswer?.text || '');
  const [author, setAuthor] = useState(props.editableAnswer?.name || '');
  const [date, setDate] = useState(props.editableAnswer?.date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'));

  const handleSubmit = (event) => {
    event.preventDefault();

    // create new answer
    const answer = new Answer(props.editableAnswer?.id || (props.lastId + 1), text, author, date, props.editableAnswer?.score || 0);

    if (props.editableAnswer) {
      // update the answer
      props.updateAnswer(answer);
    } else {
      // add the answer to the "answer" state
      props.addAnswer(answer);
    }
  };

  return (
    <Form as={"form"} className="new-answer" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" required={true} minLength={6} value={text} onChange={event => setText(event.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" required={true} value={author} onChange={(event) => setAuthor(event.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </Form.Group>
      <Button type="submit" variant={props.editableAnswer ? "success" : "primary"}>{props.editableAnswer ? "Update" : "Add"}</Button>
      <Button type="button" variant="warning" onClick={props.cancel}>Cancel</Button>
    </Form>
  );
};