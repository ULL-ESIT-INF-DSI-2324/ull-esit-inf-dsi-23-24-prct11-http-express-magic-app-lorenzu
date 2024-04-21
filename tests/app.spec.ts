import 'mocha'
import { expect } from 'chai';
import { Carta, Tipo, Color, Rareza } from '../src/Carta.js';
import { ColecciondeCartas } from '../src/ColecciondeCartas.js';
import request from 'request'
import { assert } from 'chai'

// URL base del servidor
const baseUrl = 'http://localhost:3000';

// Descripción de las pruebas
describe('API de Cartas', function() {
  
  // Prueba para la ruta GET /cards sin ID de carta
  describe('GET /cards sin ID de carta', function() {
    it('Debería devolver todas las cartas del usuario', function(done) {
      request.get(baseUrl + '/cards?usuario=test_user', function(error, response, body) {
        assert.equal(response.statusCode, 200);

        done();
      });
      
    });
    
    
  });

  // Prueba para la ruta GET /cards con ID de carta
  describe('GET /cards con ID de carta', function() {
    it('Debería devolver la información de la carta solicitada', function(done) {
      request.get(baseUrl + '/cards?usuario=loren&Id=1', function(error, response, body) {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    describe('GET /cards con ID de carta', function() {
      it('Debería devolver un error', function(done) {
        request.get(baseUrl + '/cards?usuario=lor&Id=1', function(error, response, body) {
          assert.equal(response.statusCode, 404);
          done();
        });
      });
      });
  });

  // Prueba para la ruta POST /cards
  describe('POST /cards', function() {
    it('Debería agregar una nueva carta al usuario', function(done) {
      const nuevacarta: Carta = {
          id: 2,
          nombre: "Lightning Bolt",
          mana: 1,
          color: "Rojo" as Color,
          tipo: "Conjuro" as Tipo,
          rareza: "Común" as Rareza,
          reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
          valor_mercado: 1
      };
      request.post({
        url: baseUrl + '/cards?usuario=test_user',
        json: true,
        body: nuevacarta
      }, function(error, response, body) {
        if(error){
          done(error)
        } else {
          assert.equal(response.statusCode, 200);
          done();
        }

      });
    });
  });

  describe('PATCH /cards', function() {
    it('Debería modificar una carta al usuario', function(done) {
      const nuevacarta: Carta = {
          id: 2,
          nombre: "PEPE",
          mana: 1,
          color: "Rojo" as Color,
          tipo: "Conjuro" as Tipo,
          rareza: "Común" as Rareza,
          reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
          valor_mercado: 1
      };
      request.patch({
        url: baseUrl + '/cards?usuario=test_user',
        json: true,
        body: nuevacarta
      }, function(error, response, body) {
        if(error){
          done(error)
        } else {
          assert.equal(response.statusCode, 200);
          done();
        }

      });
    });
  });

  // Prueba para la ruta DELETE /cards
  describe('DELETE /cards', function() {
    it('Debería dar error al eliminar la carta especificada del usuario', function(done) {
      request.delete(baseUrl + '/cards?usuario=test_user&Id=2', function(error, response, body) {
        assert.equal(response.statusCode, 200);
        done();
      });

      it('Debería eliminar la carta especificada del usuario', function(done) {
        request.delete(baseUrl + '/cards?usuario=test_user&Id=8', function(error, response, body) {
          assert.equal(response.statusCode, 200);
          done();
        });
      });

    });
  });

});
