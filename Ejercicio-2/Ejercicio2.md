### Ejercicio 2

#### 1)

Por una cuestion de simplicidad puse todo el codigo en un solo archivo


```javascript

import React, { useReducer, useEffect } from 'react';
import { booksData, usersData, authorsData } from './data'; // Importamos los datos


const initialState = {
  books: {},
  authors: {},
  users: {},
};


function reducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKS':
      const books = action.payload.reduce((acc, book) => {
        acc[book.id] = book;
        return acc;
      }, {});
      return { ...state, books };

    case 'SET_AUTHORS':
      const authors = action.payload.reduce((acc, author) => {
        acc[author.id] = author; 
        return acc;
      }, {});
      return { ...state, authors };

    case 'SET_USERS':
      const users = action.payload.reduce((acc, user) => {
        acc[user.id] = {
          ...user,
          favorite_books: user.favorite_books.map(fav => ({
            bookId: fav.bookId,
            favorited_at: fav.favorited_at,
          })),
        };
        return acc;
      }, {});
      return { ...state, users };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // En lugar de hacer el fetch, usamos los datos importados
    dispatch({ type: 'SET_BOOKS', payload: booksData });
    dispatch({ type: 'SET_USERS', payload: usersData });
    dispatch({ type: 'SET_AUTHORS', payload: authorsData });
  }, []);


  //Ejemplo muy sencillo de como se podrian listar los usuarios junto con sus libros favoritos
  return (
    <div>
      <h1>Users and Favorite Books</h1>
      {Object.values(state.users).map((user) => (
        <div key={user.id}>
          <h2>{user.nickname} ({user.email})</h2>
          <h3>Favorite Books:</h3>
          <ul>
            {user.favorite_books.map((fav) => {
              const book = state.books[fav.bookId];
              const author = state.authors[book.authorId];
              return (
                <li key={fav.bookId}>
                  {book?.title} by {author?.name}
                  <br />
                  Favorited on: {fav.favorited_at}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;

```

#### 2)

```javascript
{
  "books": {
    "1": {
      "id": 1,
      "title": "Clean Code",
      "authorId": 1
    },
    "2": {
      "id": 2,
      "title": "Clean Architecture",
      "authorId": 1
    }
  },
  "authors": {
    "1": {
      "id": 1,
      "name": "Uncle Bob"
    }
  },
  "users": {
    "1": {
      "id": 1,
      "email": "chano@amalgama.co",
      "nickname": "Chano",
      "favorite_books": [
        {
          "bookId": 1,
          "favorited_at": "2024-01-01"
        }
      ]
    },
    "2": {
      "id": 2,
      "email": "sebastian@amalgama.co",
      "nickname": "Biche",
      "favorite_books": [
        {
          "bookId": 1,
          "favorited_at": "2024-06-30"
        },
        {
          "bookId": 2,
          "favorited_at": "2024-12-31"
        }
      ]
    }
  }
}

```


#### 3)


**Aclaracion** <br />
Asumi que un libro solo puede estar escrito por un unico autor, si un libro puede estar escrito por uno o mas autores, seria una relacion N:N y deberia cambiar la estructura de lo planteado

La estrategia que utilice tiene algunas ventajas, 

Evitamos duplicar información. Por ejemplo, si varios libros tienen el mismo autor, solo guardamos los datos del autor una vez y lo referenciamos con su authorId. Esto ahorra espacio y hace que los datos sean más ordenados. Lo mismo con los libros favoritos de los usuarios, solo guardamos el id del libro y la fecha en que se dio like a ese libro. 

Cuando necesitas cambiar algo, como el nombre de un autor, solo lo modificas en un lugar (en el slice de autores), y eso se refleja automáticamente en todos los libros o usuarios que lo usen. No hace falta actualizar cada libro por separado.

Tambien puedo decir que esta solucion tiene una desventaja, el acceso a los datos, ya que hay que hacer "busquedas" por id. Por eso se decidio usar el id como clave en los objetos ya que se acceden de manera mas rapida, "nombreDelObjeto[id]", si fuera un arreglo, tendria que recorrerlo hasta encontrar ese id. La estructura tambien depende de como vayamos a usar esos datos, si necesitamos acceder frecuentemente a esos datos, es una buena opcion tener el id como clave del objeto, pero si necesitamos tener el orden de los datos por alguna razon, un arreglo es una mejor solucion



