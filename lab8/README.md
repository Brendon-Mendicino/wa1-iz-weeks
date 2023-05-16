

## All films

`GET /api/films`

Get all films

Req Body: none

Res Body: `[film1, ...]`

Err Body: none


## Get film by filter

`GET /api/films/filter/:filterType`

```TypeScript
const filterType: 
    "all" | 
    "best" | 
    "favorite" |
    "lastmonth" |
    "unseen"
```

Get all films

Req Body: none

Res Body:
```json
[
    {
        "id": 1,
        "title": "Pacific Rim",
        "favorite": true,
        "watchdate": "2020-01-01",
        "rating": 5
    },
    ...
]
```

Err Body: none

## Get film with id

`GET /api/films/:id`

Get film with a specific id if exists

Req Body: none

Res Body: `{ film: film }`

Err Body: `404 Not Found`

## Remove a film given his id

`DELETE /api/films/:id`

Delete film if id exists

Req Body: none

Res Body: `200 OK`

Err Body: `404 Not Found`

## Add a film

`PUT /api/films`

Add a new film to the db

Req Body: 
```json
{
    "title": "Pacific Rim",
    "favorite": true,
    "watchdate": "2020-01-01",
    "rating": 5
}
```

Res Body: `201 Created`

Err Body: `404 Not Found`

## Update a film

`POST /api/films`

Update an existing film

Req Body: 
```json
{
    "id": 1,
    "title": "Pacific Rim",
    "favorite": true,
    "watchdate": "2020-01-01",
    "rating": 5
}
```

Res Body: `201 Created`

Err Body: `404 Not Found`

## Update a rating

`POST /api/films/:id/rating`

Update an existing film

Req Body: 
```json
{
    "rating": 5
}
```

Res Body: `201 Created`

Err Body: `404 Not Found`


## Update favorite

`POST /api/films/:id/favorite`

Update an existing film

Req Body: 
```json
{
    "favorite": true
}
```

Res Body: `201 Created`

Err Body: `404 Not Found`

