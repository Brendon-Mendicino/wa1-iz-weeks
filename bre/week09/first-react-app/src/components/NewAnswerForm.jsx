import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import "./NewAnswerForm.css";
import dayjs from "dayjs";
import { Answer } from "../QAModels";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function NewAnswerForm(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const editableAnswer = location.state && Answer.deserialize(location.state);

  const [text, setText] = useState(editableAnswer?.text || "");
  const [author, setAuthor] = useState(editableAnswer?.name || "");
  const [date, setDate] = useState(
    editableAnswer?.date?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD")
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    // create new answer
    const answer = new Answer(
      editableAnswer?.id || props.lastId + 1,
      text,
      author,
      date,
      editableAnswer?.score || 0
    );

    if (editableAnswer) {
      // update the answer
      props.updateAnswer(answer);
      navigate("../../..", { relative: "path" });
    } else {
      // add the answer to the "answer" state
      props.addAnswer(answer);
      navigate("../..", { relative: "path" });
    }
  };

  return (
    <Form as={"form"} className="new-answer" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Text</Form.Label>
        <Form.Control
          type="text"
          required={true}
          minLength={6}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          required={true}
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant={editableAnswer ? "success" : "primary"}>
        {editableAnswer ? "Update" : "Add"}
      </Button>
      <Link
        to={editableAnswer ? "../../.." : "../.."}
        relative="path"
        className="btn btn-warning"
      >
        Cancel
      </Link>
    </Form>
  );
}
