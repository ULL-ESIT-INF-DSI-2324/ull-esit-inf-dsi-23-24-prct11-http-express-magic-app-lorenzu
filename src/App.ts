import express from 'express';
import { ColecciondeCartas } from './ColecciondeCartas.js';
import { Carta } from './Carta.js';

const app = express();
let Coleccion = new ColecciondeCartas;
/*
const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));
*/
app.use(express.json())

app.get('/cards', (req, res) => {
  const { usuario, Id } = req.query;
  //console.log(req.query)
  if (Id) {
    Coleccion.mostrarcarta(usuario as string, parseInt(Id.toString()), (error, result) => {
      if (error) {
        res.send({ error: error});
      } else {
        res.send({ result: result });
      }
    });
  } else {
      Coleccion.listarcartas(usuario as string, (error, result) => {
          if (error) {
              res.send({ error: error });
          } else {
              res.send({ result: result });
          }
      });
  }
});




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


app.delete('/cards', (req, res) => {
  const { usuario, Id } = req.query;
  if(!Id){
    res.send({error: 'No se ha introducido Id de carta'})
  } else {
  Coleccion.eliminarcarta(usuario as string, parseInt(Id!.toString()) , (error, result) => {
    if(error){
      res.send({error: error})
    } else {
      res.send({result: result})
    }
  })
}
});
  


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});