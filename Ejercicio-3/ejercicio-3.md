### Ejercicio 3

Guardar el JWT en el local storage no es seguro porque es vulnerable a ataques de XSS. Tome la decision de hacerlo de esta manera, porque no tengo forma de saber como esta implementada la API

En caso de que tuviera control sobre la API, usaria una estrategia de Access tokens y Refresh tokens
La estrategia de usar access token y refresh token permite tener tokens de corta duración para las operaciones del usuario, mientras el refresh token se usa solo para obtener nuevos access tokens.
Los access tokens tienen un tiempo de expiracion corto (por ejemplo de 15 minutos). Si solo usas un JWT a largo plazo almacenado en el local storage, el token puede ser usado por un atacante, incluso si el usuario cerro la sesion
En cambio, los refresh tokens tienen tiempo de expiracion mas largo, pero pueden guardarse en una cookie segura con atributos como HttpOnly y Secure, lo que significa que no son accesibles desde JavaScript y solo se envían en solicitudes HTTP hacia el servidor.



