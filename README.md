# City-events

This is the page of "City events", this webpage ["Kas vyksta Kaune"](https://renginiai.kasvyksta.lt/kaunas) serves as a template.

This page has public and private areas:

- public area is seen for everybody
- private area is seen only for authorized users

<!-- ============================================================= -->

## Roles

There are two types of authorized users of this page:

- **admin** has permission to:

  - enter, update and delete category
  - block user
  - confirm or delete event

- **simple user** has a permission to:
  - enter, update and delete event that user owns
  - filter events owned by the logged-in user
  - filter logged-in user's favorites events
  - filter events according category and time
  - search for an event when a word or word fragment is entered in the input field

## Run application

In the "backend" directory open new terminal and run

```
npm i
npx nodemon
```

<!-- ============================================================= -->

## Test application end-points

### Register user

- **Method**: POST
- **End-point**: http://localhost:5000/api/users/
- **Messsage in body e.g.**:

```
{
"name": "Jonas",
"email": "jonas@gmail.com",
"password": "jonas",
"role": "simple"
}
```

- **Response e.g.**:

```
{
"_id": "6403943e135ad0adaf4fb9cd",
"name": "Jonas",
"email": "jonas@gmail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDM5NDNlMTM1YWQwYWRhZjRmYjljZCIsImlhdCI6MTY3Nzk1NjE1OCwiZXhwIjoxNjgwNTQ4MTU4fQ.d-Kz6CLM34xoaovtnFj9ivDppce_FreUd5PxACyUgIw",
"role": "simple"
}
```

- **Token**: after response, take "token" for further testing purposes and use it in Headers

## <!-- ============================================================= -->

### Login user

- **Method**: POST
- **End-point**: http://localhost:5000/api/users/login
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Messsage in body e.g.**:

```
{
"email": "jonas@gmail.com",
"password": "jonas"
}
```

- **Response e.g.**:

```
{
"_id": "6403943e135ad0adaf4fb9cd",
"name": "Jonas",
"email": "jonas@gmail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDM5NDNlMTM1YWQwYWRhZjRmYjljZCIsImlhdCI6MTY3Nzk1NjQ2MSwiZXhwIjoxNjgwNTQ4NDYxfQ.esEoMWpAEaR241jJBiJ4Yp0gEi4mD0mA-viS1cVw4SI",
"role": "simple"
}
```

## <!-- ============================================================= -->

### Post event

- **Method**: POST
- **End-point**: http://localhost:5000/api/events/
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Messsage in body e.g.**:

```
{
    "title": "Scorpions",
    "category": "concert",
    "place": "Žalgiris arena",
    "time": "2023-06-19",
    "photo": "https://i.ytimg.com/vi/syNDdIfKbkw/maxresdefault.jpg"
}
```

- **Response e.g.**:

```
{
    "user": "6403943e135ad0adaf4fb9cd",
    "title": "Scorpions",
    "category": "concert",
    "place": "Žalgiris arena",
    "time": "2023-06-19",
    "photo": "https://i.ytimg.com/vi/syNDdIfKbkw/maxresdefault.jpg",
    "_id": "64039e2acd33c9d4d5866aef",
    "createdAt": "2023-03-04T19:38:18.037Z",
    "updatedAt": "2023-03-04T19:38:18.037Z",
    "__v": 0
}
```

## <!-- ============================================================= -->

### Get all logged in user's events

- **Method**: GET
- **End-point**: http://localhost:5000/api/events/
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Response e.g.**:

```
[
    {
        "_id": "64039e2acd33c9d4d5866aef",
        "user": "6403943e135ad0adaf4fb9cd",
        "title": "Scorpions",
        "category": "concert",
        "place": "Žalgiris arena",
        "time": "2023-06-19",
        "photo": "https://i.ytimg.com/vi/syNDdIfKbkw/maxresdefault.jpg",
        "createdAt": "2023-03-04T19:38:18.037Z",
        "updatedAt": "2023-03-04T19:38:18.037Z",
        "__v": 0
    },
    {
        "_id": "6403a006cd33c9d4d5866af2",
        "user": "6403943e135ad0adaf4fb9cd",
        "title": "Photography in routine",
        "category": "exhibition",
        "place": "M.K.Čiurlionis gallery",
        "time": "2023-03-25",
        "photo": "https://cdn.londonandpartners.com/assets/attractions/culture/59919-640x360-photographers-gallery-2012-640.jpg",
        "createdAt": "2023-03-04T19:46:14.960Z",
        "updatedAt": "2023-03-04T19:46:14.960Z",
        "__v": 0
    }
  ]
```

## <!-- ============================================================= -->

### Get specific logged in user's event

- **Method**: GET
- **End-point**: http://localhost:5000/api/events/:id
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Response e.g.**:

```
  {
    "_id": "64039e2acd33c9d4d5866aef",
    "user": "6403943e135ad0adaf4fb9cd",
    "title": "Scorpions",
    "category": "concert",
    "place": "Žalgiris arena",
    "time": "2023-06-19",
    "photo": "https://i.ytimg.com/vi/syNDdIfKbkw/maxresdefault.jpg",
    "createdAt": "2023-03-04T19:38:18.037Z",
    "updatedAt": "2023-03-04T19:38:18.037Z",
    "__v": 0
  }
```

## <!-- ============================================================= -->

### Get logged in user's info

- **Method**: GET
- **End-point**: http://localhost:5000/api/users/user
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Response e.g.**:

```
{
    "_id": "6403943e135ad0adaf4fb9cd",
    "name": "Petras",
    "email": "petras@gmail.com",
    "role": "simple",
    "createdAt": "2023-03-04T18:55:58.138Z",
    "updatedAt": "2023-03-04T18:55:58.138Z",
    "__v": 0
}
```

## <!-- ============================================================= -->

### Get all users info- AS ADMIN

- **Method**: GET
- **End-point**: http://localhost:5000/api/users/list
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Response e.g.**:

```
[
    {
        "_id": "64038fafffafa94e8162e40e",
        "name": "admin",
        "email": "admin@gmail.com",
        "role": "admin",
        "events": []
    },
    {
        "_id": "6403943e135ad0adaf4fb9cd",
        "name": "Petras",
        "email": "petras@gmail.com",
        "role": "simple",
        "events": [
            {
                "_id": "64039e2acd33c9d4d5866aef",
                "user": "6403943e135ad0adaf4fb9cd",
                "title": "Scorpions",
                "category": "concert",
                "place": "Žalgiris arena",
                "time": "2023-06-19",
                "photo": "https://i.ytimg.com/vi/syNDdIfKbkw/maxresdefault.jpg"
            },
            {
                "_id": "6403a006cd33c9d4d5866af2",
                "user": "6403943e135ad0adaf4fb9cd",
                "title": "Photography in routine",
                "category": "exhibition",
                "place": "M.K.Čiurlionis gallery",
                "time": "2023-03-25",
                "photo": "https://cdn.londonandpartners.com/assets/attractions/culture/59919-640x360-photographers-gallery-2012-640.jpg"
            }
        ]
    }
]
```

## <!-- ============================================================= -->

### Get and update event

- **Method**: PUT
- **End-point**: http://localhost:5000/api/events/:id
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Messsage in body e.g.**:

```
{
    "title": "Photography in daily routine",
    "category": "exhibition",
    "place": "M.K.Čiurlionis gallery",
    "time": "2023-03-25",
    "photo": "https://cdn.londonandpartners.com/assets/attractions/culture/59919-640x360-photographers-gallery-2012-640.jpg"
}
```

- **Response e.g.**:

```
{
    "_id": "6403a006cd33c9d4d5866af2",
    "user": "6403943e135ad0adaf4fb9cd",
    "title": "Photography in daily routine",
    "category": "exhibition",
    "place": "M.K.Čiurlionis gallery",
    "time": "2023-03-25",
    "photo": "https://cdn.londonandpartners.com/assets/attractions/culture/59919-640x360-photographers-gallery-2012-640.jpg",
    "createdAt": "2023-03-04T19:46:14.960Z",
    "updatedAt": "2023-03-05T08:24:25.886Z",
    "__v": 0
}
```

## <!-- ============================================================= -->

### Get and delete event

- **Method**: DELETE
- **End-point**: http://localhost:5000/api/events/:id
- **Headers**:

```
key: authorization
value: Bearer <token>
```

- **Response e.g.**:

```
{
    "id": "6403a006cd33c9d4d5866af2"
}
```
