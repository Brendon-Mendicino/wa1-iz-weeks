import { Answer, Question } from "./QAModels";
const SERVER_URL = "http://localhost:3001";

const getQuestions = async () => {
  const response = await fetch(SERVER_URL + "/api/questions");
  if (response.ok) {
    const questionsJson = await response.json();
    return questionsJson.map(
      (q) => new Question(q.id, q.text, q.author, q.date)
    );
  } else throw new Error("Internal server error");
};

const getAnswers = async (questionId) => {
  const response = await fetch(
    SERVER_URL + `/api/questions/${questionId}/answers`
  );
  const answersJson = await response.json();
  if (response.ok) {
    return answersJson.map(
      (ans) => new Answer(ans.id, ans.text, ans.author, ans.date, ans.score)
    );
  } else throw answersJson;
};

const vote = async (answerId) => {
  const res = await fetch(`${SERVER_URL}/api/answers/${answerId}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vote: "upvote" }),
  });

  if (!response.ok) {
    const err = await res.json();
    throw err;
  }

  return null;
};

const API = { vote, getQuestions, getAnswers };
export default API;
