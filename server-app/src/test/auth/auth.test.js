import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Importar el middleware y validaciones
import authMiddleware from '../../middleware/auth/authMiddleware.js';
import { validatePassword, validateName, validateEmail } from '../../utils/auth/validations.js';

// Configurar dotenv
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
describe('Auth System Tests', () => {
  let app;

  // Función para generar un token válido
  const generateValidToken = () => {
    const payload = {
      user: {
        id: '6738faf9f920f85e14df527a',
        role: 'Administrador'
      }
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  };

  beforeAll(() => {
    // Sobreescribir la variable de entorno
    process.env.JWT_SECRET = JWT_SECRET;

    // Configurar express
    app = express();
    app.use(express.json());

    // Agregar ruta de prueba protegida
    app.get('/api/test-protected', authMiddleware, (req, res) => {
      res.json({
        success: true,
        user: {
          id: req.userId,
          role: req.userRole
        }
      });
    });
  });

  // Tus tests originales de middleware
  describe('Token Validation Tests', () => {
    test('debería permitir acceso con token válido', async () => {
      const validToken = generateValidToken();
      const response = await request(app)
        .get('/api/test-protected')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.user).toHaveProperty('role', 'Administrador');
    });

    test('debería denegar acceso sin token', async () => {
      const response = await request(app)
        .get('/api/test-protected');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Acceso denegado. No hay token proporcionado.');
    });

    test('debería denegar acceso con token inválido', async () => {
      const response = await request(app)
        .get('/api/test-protected')
        .set('Authorization', 'Bearer invalid_token');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Token inválido o ha expirado');
    });

    test('debería validar rol de administrador', async () => {
      const validToken = generateValidToken();

      const response = await request(app)
        .get('/api/test-protected')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.user.role).toBe('Administrador');
    });

    test('debería incluir el ID de usuario correcto', async () => {
      const validToken = generateValidToken();

      const response = await request(app)
        .get('/api/test-protected')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.user.id).toBe('6738faf9f920f85e14df527a');
    });
  });

  // Nuevos tests para las validaciones
  describe('Validation Functions', () => {
    describe('Password Validation', () => {
      test('debería aceptar una contraseña válida', () => {
        const errors = validatePassword('Test123!@#');
        expect(errors).toHaveLength(0);
      });

      test('debería rechazar una contraseña sin mayúsculas', () => {
        const errors = validatePassword('test123!@#');
        expect(errors).toContain('La contraseña debe contener al menos una mayúscula');
      });

      test('debería rechazar una contraseña sin minúsculas', () => {
        const errors = validatePassword('TEST123!@#');
        expect(errors).toContain('La contraseña debe contener al menos una minúscula');
      });

      test('debería rechazar una contraseña sin números', () => {
        const errors = validatePassword('TestABC!@#');
        expect(errors).toContain('La contraseña debe contener al menos un número');
      });

      test('debería rechazar una contraseña sin caracteres especiales', () => {
        const errors = validatePassword('TestABC123');
        expect(errors).toContain('La contraseña debe contener al menos un carácter especial');
      });

      test('debería rechazar una contraseña corta', () => {
        const errors = validatePassword('Te1!');
        expect(errors).toContain('La contraseña debe tener al menos 8 caracteres');
      });
    });

    describe('Name Validation', () => {
      test('debería aceptar un nombre válido', () => {
        const errors = validateName('John Doe');
        expect(errors).toHaveLength(0);
      });

      test('debería rechazar un nombre con números', () => {
        const errors = validateName('John123');
        expect(errors).toContain('El nombre solo puede contener letras y espacios');
      });

      test('debería rechazar un nombre muy corto', () => {
        const errors = validateName('Jo');
        expect(errors).toContain('El nombre debe tener al menos 3 caracteres');
      });

      test('debería rechazar un nombre muy largo', () => {
        const errors = validateName('a'.repeat(51));
        expect(errors).toContain('El nombre no puede exceder los 50 caracteres');
      });

      test('debería aceptar nombres con acentos y ñ', () => {
        const errors = validateName('José Núñez');
        expect(errors).toHaveLength(0);
      });
    });

    describe('Email Validation', () => {
      test('debería aceptar un email válido', () => {
        const errors = validateEmail('test@example.com');
        expect(errors).toHaveLength(0);
      });

      test('debería rechazar un email sin @', () => {
        const errors = validateEmail('testexample.com');
        expect(errors).toContain('Email inválido');
      });

      test('debería rechazar un email sin dominio', () => {
        const errors = validateEmail('test@');
        expect(errors).toContain('Email inválido');
      });

      test('debería rechazar un email vacío', () => {
        const errors = validateEmail('');
        expect(errors).toContain('El email es requerido');
      });

      test('debería rechazar un email muy largo', () => {
        const errors = validateEmail('a'.repeat(45) + '@example.com');
        expect(errors).toContain('El email no puede exceder los 50 caracteres');
      });
    });
  });
});