'use strict';



// Exercise 1.

const scores = [20, 30, -5, -1, 100, -3, 50]

const no_negative_scores = scores.filter((value) => value > 0)

console.log(scores)
console.log(no_negative_scores)

const NN = scores.length - no_negative_scores.length

let minScore = Math.min(...no_negative_scores)
no_negative_scores.splice(no_negative_scores.indexOf(minScore), 1)

minScore = Math.min(...no_negative_scores)
no_negative_scores.splice(no_negative_scores.indexOf(minScore), 1)

console.log(no_negative_scores)


const sum = no_negative_scores.reduce((prev, curr) => prev + curr)
const avg = Math.round(sum / no_negative_scores.length)

for (let i = 0; i < NN + 2; i++) {
    no_negative_scores.push(avg)
}


console.log(scores)
console.log(no_negative_scores)

