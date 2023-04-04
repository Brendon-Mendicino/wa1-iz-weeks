import { Question } from "./QAModels"
import 'bootstrap/dist/css/bootstrap.css';
import { Answers } from "./AnswersComponent"
import { Container, Row, Col } from "react-bootstrap";

const fakeQuestion = new Question(1, 'Test', 'Bre', '2023-04-04');
fakeQuestion.init();

function App() {
  return (
    <Answers answers={fakeQuestion.getAnswers()}></Answers>
  );
}

export default App
