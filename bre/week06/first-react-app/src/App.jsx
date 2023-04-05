import { Question } from "./QAModels"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Answers } from "./components/AnswersComponent"
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { NavbarContent } from "./components/NavbarContent";
import { QuestionAsked } from './components/Question';

const fakeQuestion = new Question(1, 'Test', 'Bre', '2023-04-04');
fakeQuestion.init();

function App() {
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <NavbarContent />
      </Navbar>

      <Container>
        <QuestionAsked question={fakeQuestion}></QuestionAsked>
        <br />
        <Answers answers={fakeQuestion.getAnswers()}></Answers>
      </Container>
    </>
  );
}

export default App
