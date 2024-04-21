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
        res.send({ error: error });
      } else {
        res.send({ result: result });
      }
    });
  } else {
    // Si no se proporciona un ID, se listan todas las cartas del usuario.
    Coleccion.listarcartas(usuario as string, (error, result) => {
      if (error) {
        res.send({ error: error });
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
      res.send({error: error})
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
        res.send({error: error})
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