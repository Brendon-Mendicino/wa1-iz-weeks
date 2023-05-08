'use strict';

/* Same of week 09, but 1) with require() instead of import and 2) without any internal methods */

const dayjs = require('dayjs');

function Answer(id, text, name, date, questionId, score=0) {
  this.id = id;
  this.text = text;
  this.name = name;
  this.score = score;
  this.questionId = questionId;
  this.date = dayjs(date);
}

function Question(id, text, author, date) {
  this.id = id;
  this.text = text;
  this.author = author;
  this.date = dayjs(date);
}

module.exports = { Question, Answer };