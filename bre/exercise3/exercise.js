'use strict';

const { Dayjs } = require('dayjs');
const dayjs = require('dayjs');

function Answer(text, name, date, score=0) {
  this.text = text;
  this.name = name;
  this.score = score;
  this.date = date;
}

function Question(text, name, date) {
  this.text = text;
  this.name = name;
  this.date = date;
  this.answers = [];

  this.add = (answer) => this.answers.push(answer);

  this.findAll = (name) => this.answers.filter(a => a.name === name);

  this.afterDate = (d) => this.answers.filter(a => a.isAfter(d));

  this.listByDate = () => [...this.answers].sort((a, b) => a.date.isAfter(b.date) ? 1 : -1);

  this.listByScore = () => [...this.answers].sort((a, b) => b.score - a.score);
}


const a = dayjs();

console.log(a);

const quest = new Question('ok', 'ok', dayjs());
quest.answers.push([
  new Answer('bro1', 'k', dayjs()),
  new Answer('bro2', 'k', dayjs()),
  new Answer('bro3', 'k', dayjs()),
  new Answer('bro4', 'k', dayjs())
]);
