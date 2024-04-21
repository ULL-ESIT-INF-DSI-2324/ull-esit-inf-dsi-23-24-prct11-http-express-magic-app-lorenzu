## Introducción
Express.js es un framework web para Node.js que simplifica el desarrollo de aplicaciones web y APIs. Es minimalista y flexible, permitiendo la creación rápida de servidores HTTP robustos y escalables.


Para comenzar a usar Express y aprovechar su potencial, primero debes instalar las dependencias necesarias. Puedes hacerlo ejecutando el siguiente comando en tu terminal:


`npm install express`

Este comando instalará el paquete express en tu proyecto Node.js y te permitirá utilizarlo en tu código. 
Partiendo de los códigos sobre Cartas Magik de las anteriores prácticas en ésta práctica nos enfocaremos en realizar un servidor Express que proporcione una API REST.

## `App.ts`
```
import express from 'express';
import { ColecciondeCartas } from './ColecciondeCartas.js';
import { Carta } from './Carta.js';

/**
 * Inicialización de la aplicación Express.
 */
const app = express();
let Coleccion = new ColecciondeCartas;

/**
 * Middleware para el manejo de contenido JSON.
 */
app.use(express.json());

/**
 * Ruta para obtener información sobre cartas.
 * @param {string} usuario - Nombre del usuario.
 * @param {number} Id - Identificador de la carta.
 */
app.get('/cards', (req, res) => {
  const { usuario, Id } = req.query;

  // Si se proporciona un ID, se muestra información de una carta específica.
  if (Id) {
    Coleccion.mostrarcarta(usuario as string, parseInt(Id.toString()), (error, result) => {
      if (error) {
        res.status(404).send({ error: error });
      } else {
        res.send({ result: result });
      }
    });
  } else {
    // Si no se proporciona un ID, se listan todas las cartas del usuario.
    Coleccion.listarcartas(usuario as string, (error, result) => {
      if (error) {
        res.status(400).send({ error: error });
      } else {
        res.send({ result: result });
      }
    });
  }
});

/**
 * Ruta para agregar una nueva carta.
 * @param {string} usuario - Nombre del usuario.
 * @param {Carta} carta - Información de la carta a agregar.
 */
app.post('/cards', (req, res) => {
  const { usuario } = req.query;
  const carta: Carta = req.body;

  Coleccion.agregarcarta(usuario as string, carta, (error, result) => {
    if(error){
      res.status(400).send({error: error})
    } else {
      res.send({result: result})
    }
  })
});

/**
 * Ruta para modificar una carta existente.
 * @param {string} usuario - Nombre del usuario.
 * @param {Carta} carta - Información de la carta a agregar.
 */
app.patch('/cards', (req, res) => {
  const { usuario } = req.query;
  const carta: Carta = req.body;

  Coleccion.modificarcarta(usuario as string, carta, (error, result) => {
    if(error){
      res.status(400).send({error: error})
    } else {
      res.send({result: result})
    }
  })
});

/**
 * Ruta para eliminar una carta existente.
 * @param {string} usuario - Nombre del usuario.
 * @param {number} Id - Identificador de la carta a eliminar.
 */
app.delete('/cards', (req, res) => {
  const { usuario, Id } = req.query;

  // Si no se proporciona un ID, se devuelve un error.
  if(!Id){
    res.send({error: 'No se ha introducido Id de carta'})
  } else {
    // Se procede a eliminar la carta con el ID especificado.
    Coleccion.eliminarcarta(usuario as string, parseInt(Id!.toString()) , (error, result) => {
      if(error){
        res.status(400).send({error: error})
      } else {
        res.send({result: result})
      }
    })
  }
});

/**
 * Iniciar el servidor en el puerto 3000.
 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
```

### Inicialización de la Aplicación Express:
  - Se importa el módulo express para crear y configurar la aplicación web.
  - Se instancia un objeto de la aplicación Express.
### Inicialización de la Colección de Cartas:
  - Se instancia un objeto ColecciondeCartas para manejar las operaciones relacionadas con las cartas.
### Middleware para el Manejo de Contenido JSON:
  - Se utiliza el middleware express.json() para permitir que la aplicación maneje contenido JSON en las solicitudes y respuestas.
### Rutas para Obtener Información sobre Cartas:
  - Se define una ruta GET /cards para obtener información sobre las cartas.
  - Si se proporciona un ID de carta en la consulta, se muestra la información de esa carta específica.
  - Si no se proporciona un ID de carta, se listan todas las cartas del usuario.
### Ruta para Agregar una Nueva Carta:
  - Se define una ruta POST /cards para agregar una nueva carta.
  - Se espera que el nombre de usuario esté presente en los parámetros de la consulta y la información de la carta esté en el cuerpo de la solicitud.
  - Se agrega la carta a la colección utilizando el método agregarcarta del objeto ColecciondeCartas.
### Ruta para Modificar una Carta Existente:
  - Se define una ruta PATCH /cards para modificar una carta existente.
  - Se espera que el nombre de usuario esté presente en los parámetros de la consulta y la información de la carta esté en el cuerpo de la solicitud.
  - Se modifica la carta en la colección utilizando el método modificarcarta del objeto ColecciondeCartas.
### Ruta para Eliminar una Carta Existente:
  - Se define una ruta DELETE /cards para eliminar una carta existente.
  - Se espera que el nombre de usuario y el ID de la carta estén presentes en los parámetros de la consulta.
  - Si no se proporciona un ID de carta, se devuelve un error.
  - Se elimina la carta de la colección utilizando el método eliminarcarta del objeto ColecciondeCartas.
### Iniciar el Servidor:
  - Se inicia el servidor en el puerto 3000 utilizando el método listen.
  - Se imprime un mensaje en la consola para indicar que el servidor está en funcionamiento.

## Conclusión
Este código define un servidor Express que proporciona una API RESTful para manejar operaciones relacionadas con cartas, como agregar, modificar, listar y eliminar cartas. Cada ruta está diseñada para recibir datos específicos del cliente y realizar operaciones correspondientes en la colección de cartas.


## Enlace a la modificación de la semana

https://github.com/lorenzu/p12.git