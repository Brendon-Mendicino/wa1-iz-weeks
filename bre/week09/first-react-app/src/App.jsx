import { Answer, Question } from "./QAModels";
import "bootstrap/dist/css/bootstrap.min.css";
import { Answers } from "./components/AnswersComponent";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { NavbarContent } from "./components/NavbarContent";
import { SignleQuestion } from "./components/Question";
import { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { NewAnswerForm } from "./components/NewAnswerForm";
import Page404Component from "./components/Page404Component";

const fakeQuestion = new Question(1, "Test", "Bre", "2023-04-04");
fakeQuestion.init();

function App() {
  const [answers, setAnswers] = useState(fakeQuestion.getAnswers());

  function voteUp(id) {
    setAnswers((answers) => {
      return answers.map((answer) => {
        if (answer.id === id) {
          return new Answer(
            answer.id,
            answer.text,
            answer.name,
            answer.date,
            answer.score ? answer.score + 1 : 1
          );
        } else {
          return answer;
        }
      });
    });
  }

  const addAnswer = (answer) => {
    setAnswers((oldAns) => {
      return [...oldAns, answer];
    });
  };

  const updateAnswer = (answer) => {
    setAnswers((oldAns) => {
      return oldAns.map((a) => (a.id === answer.id ? answer : a));
    });
  };

  const lastId = answers.map((a) => a.id).reduce((a, b) => (a > b ? a : b), 1);

  return (
    <BrowserRouter>
      <Routes>
        {/* 
          - / (index) -> all the questions
          - /questions/:questionId -> question with it's info
          - /questions/:questionId/answers/add -> page to add answer
          - /questions/:questionId/answers/edit/:answerId -> 
           */}
        <Route
          element={
            <>
              <Navbar sticky="top" bg="dark" variant="dark">
                <NavbarContent />
              </Navbar>

              <Container>
                <Outlet />
              </Container>
            </>
          }
        >
          <Route
            path="/questions/:questionId"
            element={
              <SignleQuestion
                fakeQuestion={fakeQuestion}
                answers={answers}
                voteUp={voteUp}
                addAnswer={addAnswer}
                updateAnswer={updateAnswer}
              />
            }
          />
          <Route
            path="/questions/:questionId/answers/add"
            element={<NewAnswerForm lastId={lastId} addAnswer={addAnswer} />}
          />
          <Route
            path="/questions/:questionId/answers/edit/:answerId"
            element={<NewAnswerForm updateAnswer={updateAnswer} />}
          />
          <Route path="*" element={<Page404Component />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
