# Nodepop API


## How to start

Clonar repositorio
```
https://github.com/elemikelo/Nodepop
```

1) Enter to the folder of the project:

```
$ cd Nodepop
```

2) Install Dependencies:

```
$ npm install
```

3) Run scripts 'Install_db' for add users and advertisements. (Note: Run Mongo DB previously):

```
$ node /db/install_db.js
```


4) Start with the project:
```
$ npm start
```

## API advertisements

Endpoint
```
(GET) List advertisements: http://localhost:3000/apiv1/anuncios
```

filters parameters : filter(price, name, tags), sort and limit.

## API Users

Endpoint Register

```
(POST) List advertisements: http://localhost:3000/apiv1/users/register
```
Parameters:
```
username: String
password: String
email: String
```
Endpoint login

```
(POST) List advertisements: http://localhost:3000/apiv1/users/login
```

Parameters:
```
username: String
password: String
```
