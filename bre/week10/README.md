# `react-qa-server`

The `react-qa-server` is the server-side app companion of HeapOverrun (i.e., `react-qa`). It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### List all questions

URL: `/api/questions`

HTTP Method: GET.

Description: Get all the available questions.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error)

Response body:

```
[
  {
    "id": 1,
    "text": "Is javascript better than python",
    "author": "Luigi De Russis",
    "date": "2023-02-07"
  }:w
  ,
  ...
]
```

### Get single question

URL: `/api/questions/<id>`

HTTP Method: GET.

Description: Get all the available questions.

Response: `200 OK` (success) or `404 Not Found` (wrong id), `500 Internal Server Error` (generic error)

Response body:

```
{
  "id": 1,
  "text": "aldskjads",
  "author": "adsf",
  "date": "KJLasdf"
}
```

### List all the answers of a given question

URL: `/api/questions/<id>/answers`

HTTP Method: GET.

Description: Get all the available answers given a question.

Response: `200 OK` (success) or `404 Not Found` (wrong id), `500 Internal Server Error` (generic error)

Response body:

```
[
  {
    "id": 1,
    "author": "Luca Mannella",
    "text": "Yes",
    "score": -10,
    "date": "2023-02-15"
  },
  ...
]
```

### Add a new answers for a given question

URL: `/api/questions/<id>/answers`

HTTP Method: POST.

Description: Added a new answer for a given question.

Request body: A JSON object representing a new answer.

```
{
  "author": "Enrico Masala",
  "text": "The Italian course has around 340 first-time students",
  "score": 0,
  "date": "2023-02-15"
}
```

Response: `201 Created` (success), `503 Service Unavailable` (generic error), if the request body is not valid, `422 Uprocessable Entity` (validation error).

### Update an existing answer

URL: `/api/answers/<id>`

HTTP Method: PUT.

Description: Update an answer identified by `<id>`.

Request body: A JSON object representing a new answer.

```
{
  "author": "Enrico Masala",
  "text": "The Italian course has around 340 first-time students",
  "score": 0,
  "date": "2023-02-15"
}
```

Response: `200 OK` (success), `404 Not Found` (wrong id), `503 Service Unavailable` (generic error), if the request body is not valid, `422 Uprocessable Entity` (validation error).

### Vote for an answer

URL: `/api/answers/<id>`

HTTP Method: POST.

Description: Updvote or downvote an existing answer identified by his `<id>`.

Request body: A JSON object representing the action.

```
{
  "change": "upvote"
}
```

Response: `200 OK` (success), `404 Not Found` (wrong id), `503 Service Unavailable` (generic error), if the request body is not valid, `422 Uprocessable Entity` (validation error).
