import { Answer, Question } from "./QAModels"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Answers } from "./components/AnswersComponent"
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { NavbarContent } from "./components/NavbarContent";
import { QuestionAsked } from './components/Question';
import { useState } from "react";

const fakeQuestion = new Question(1, 'Test', 'Bre', '2023-04-04');
fakeQuestion.init();

function App() {
  const [answers, setAnswers] = useState(fakeQuestion.getAnswers());

  function voteUp(id) {
    setAnswers(answers => {
      return answers.map(answer => {
        if (answer.id === id) {
          return new Answer(answer.id, answer.text, answer.name, answer.date, answer.score ? answer.score + 1 : 1);
        } else {
          return answer;
        }
      });
    });
  };

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <NavbarContent />
      </Navbar>

      <Container>
        <QuestionAsked question={fakeQuestion}></QuestionAsked>
        <br />
        <Answers answers={answers} voteUp={voteUp}></Answers>
      </Container>
    </>
  );
}

export default App
