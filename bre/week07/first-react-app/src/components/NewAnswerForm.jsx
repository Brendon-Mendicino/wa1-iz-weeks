import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import "./NewAnswerForm.css"
import dayjs from "dayjs";

export function NewAnswerForm(props) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <Form as={"form"} className="new-answer">
      <Form.Group>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" required={true} minLength={10} value={text} onChange={event => setText(event.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" required={true} value={author} onChange={(event) => setAuthor(event.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Score</Form.Label>
        <Form.Control type="number" />
      </Form.Group>
      <Button type="submit" variant="primary">Add</Button>
      <Button type="submit" variant="warning">Cancel</Button>
    </Form>
  );
};