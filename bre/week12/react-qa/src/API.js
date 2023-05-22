/* Add the API calls here */

import { Question } from "./QAModels";

const SERVER_URL = "http://localhost:3000"

const API = {};

API.getQuestions = async () => {
  const response = await fetch(SERVER_URL + "/api/questions");

  if (!response.ok) {
    throw new Error();
  }

  const questions = await response.json();
  return questions.map((q) => new Question(q.id, q.text, q.author, q.data));
}

API.getAnswers = async (questionId) => {

}

export default API;