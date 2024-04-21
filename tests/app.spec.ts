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
      request.get(baseUrl + '/cards?usuario=tests_user', function(error, response, body) {
        assert.equal(response.statusCode, 200);

        done();
      });
      
    });
    
    
  });

  // Prueba para la ruta GET /cards con ID de carta
  describe('GET /cards con ID de carta', function() {
    it('Debería devolver la información de la carta solicitada', function(done) {
      request.get(baseUrl + '/cards?usuario=usuario1&Id=1', function(error, response, body) {
        assert.equal(response.statusCode, 200);
        // Agrega aquí más aserciones para verificar el formato o contenido del cuerpo de la respuesta si es necesario
        done();
      });
    });
  });

  // Prueba para la ruta POST /cards
  describe('POST /cards', function() {
    it('Debería agregar una nueva carta al usuario', function(done) {
      const carta = {
        // Agrega aquí la información de una carta para la prueba
      };
      request.post({
        url: baseUrl + '/cards?usuario=usuario1',
        json: carta
      }, function(error, response, body) {
        assert.equal(response.statusCode, 200);
        // Agrega aquí más aserciones para verificar el cuerpo de la respuesta si es necesario
        done();
      });
    });
  });

  // Prueba para la ruta DELETE /cards
  describe('DELETE /cards', function() {
    it('Debería eliminar la carta especificada del usuario', function(done) {
      request.delete(baseUrl + '/cards?usuario=usuario1&Id=1', function(error, response, body) {
        assert.equal(response.statusCode, 200);
        // Agrega aquí más aserciones para verificar el cuerpo de la respuesta si es necesario
        done();
      });
    });
  });

});
