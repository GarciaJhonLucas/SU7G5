# Proyecto Unidad 7 - Grupo 5
API REST creando con las tecnologias mostradas

## Tecnologias
- Node
- Prisma
- Typescript
- NodeJs
- Express

## Modo de uso

- Cambiar la el nombre del archivo env a .env
- Luego ejecutar los siguientes comandos en su terminal

```bash
npm install
```
```bash
npx prisma db push
```
```bash
npx prisma db seed
```
```bash
npm run dev
```


## Users API
```
Method: GET
URL: http://localhost:5000/api/v1/users
URL: http://localhost:5000/api/v1/users/Id

Method: POST
URL: http://localhost:5000/api/v1/users

Method: PUT
URL: http://localhost:5000/api/v1/users/Id

Method: DELETE
URL: http://localhost:5000/api/v1/users/Id
```

```json
// Example Json to POST and PUT
{
  "name": "username",
  "email": "user@mail.com",
  "password": "password",
  "date_born": "yyyy-mm-dd"
}
```


## Songs API
```
Method: GET
URL: http://localhost:5000/api/v1/songs
URL: http://localhost:5000/api/v1/songs/Id

Method: POST
URL: http://localhost:5000/api/v1/songs

Method: PUT
URL: http://localhost:5000/api/v1/songs/Id

Method: DELETE
URL: http://localhost:5000/api/v1/songs/Id
```

```json
// Example Json to POST and PUT
{
  "name": "music name",
  "artist": "artist name",
  "album": "album name",
  "year": 2023,
  "genre": "genre name",
  "duration": 100,
  "isPublic": true
}
```


## Integrantes
- [Jhon Lucas Garcia](https://github.com/GarciaJhonLucas)
- [Elizabeth Ortiz]()
- [Carlos Falcon]()