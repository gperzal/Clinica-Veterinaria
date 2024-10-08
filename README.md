# 🐾 Plataforma Web Veterinaria

Este proyecto es una plataforma integral para la gestión de una clínica veterinaria, desarrollada utilizando tecnologías modernas. El frontend está construido en **React** con **Vite** y utiliza **Chakra UI** para el diseño de la interfaz de usuario, mientras que el backend está desarrollado en **Express**. El sistema permite la gestión de citas, historiales médicos, usuarios y otros aspectos esenciales para el funcionamiento de la clínica.

## 🛠️ Tecnologías Utilizadas

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## 📁 Estructura del Proyecto

El proyecto está dividido en dos partes principales:

1. **📱 Client-app (Frontend)**: 
   - Framework: **React** con **Vite**
   - UI: **Chakra UI**
   - Objetivo: Proporcionar una interfaz de usuario moderna y responsiva para la gestión de la clínica.

2. **🖥️ Server-app (Backend)**:
   - Framework: **Express.js**
   - Base de Datos: MongoDB o PostgreSQL (dependiendo de la configuración del ambiente)
   - Objetivo: Proveer la API para la gestión de datos, autenticación y seguridad del sistema.

### 📂 Estructura de Carpetas

- **client-app/**: Contiene todo el código relacionado con el frontend.
- **server-app/**: Contiene el código para el backend y la API.
- **documentacion/**: Aquí se almacena toda la documentación técnica y funcional del proyecto.

## 🚀 Instalación y Ejecución

### Requisitos del Sistema

Para ejecutar este proyecto en un entorno local, asegúrate de tener las siguientes herramientas instaladas:

- **Node.js**: Versión 14.x o superior.
- **npm** o **yarn**: Gestor de paquetes.
- **MongoDB** o **PostgreSQL**: Dependiendo del tipo de base de datos configurado.

### Pasos de Instalación

1. **Clonar el Repositorio**
   ```
   git clone https://your-repository-url.git
   ```

2. **Instalar Dependencias**

   Frontend (client-app):
   ```
   cd client-app
   npm install
   ```

   Backend (server-app):
   ```
   cd server-app
   npm install
   ```

3. **Configurar Variables de Entorno**

   Crea un archivo `.env` en la carpeta `server-app/` con las siguientes variables:

   ```
   # Server Variables
   PORT=5000
   DB_URI=mongodb://localhost:27017/clinicadb
   JWT_SECRET=your_jwt_secret
   ```

   En `client-app/`, crea un archivo `.env`:

   ```
   # Client Variables 
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Ejecutar el Proyecto**

   Frontend:
   ```
   cd client-app
   npm run dev
   ```

   Backend:
   ```
   cd server-app
   npm run start
   ```

## 🔑 API Endpoints

### Autentificación (Login / Register)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/api/auth/login` | Iniciar sesión en el sistema |
| POST   | `/api/auth/register` | Registrar una nueva cuenta en el sistema |
| POST   | `/api/auth/forgot-password` | Enviar correo para restablecer la contraseña |
| POST   | `/api/auth/reset-password` | Restablecer la contraseña mediante un token |

### Dashboard - Perfil de Usuario

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/api/dashboard/profile` | Obtener la información del perfil del usuario autenticado |
| PUT    | `/api/dashboard/profile` | Actualizar la información del perfil del usuario |
| PUT    | `/api/dashboard/password` | Cambiar la contraseña del usuario autenticado |

### Dashboard - Gestión de Mascotas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/api/dashboard/pets` | Obtener todas las mascotas del usuario |
| POST   | `/api/dashboard/pets` | Agregar una nueva mascota |
| PUT    | `/api/dashboard/pets/:petId` | Actualizar la información de una mascota específica |
| DELETE | `/api/dashboard/pets/:petId` | Eliminar una mascota específica |

### Middleware (Roles y Auth)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | Cualquier endpoint protegido | Verificar que el usuario autenticado tenga uno de los roles permitidos (Cliente, Administrativo, Veterinario, Administrador) |
| GET    | Cualquier endpoint protegido | Verificar que el usuario autenticado tenga un token JWT válido |

## 🌐 Despliegue

El proyecto se encuentra desplegado en Vercel. Puedes acceder a él a través del siguiente enlace:

[![Pawmart](https://img.shields.io/badge/Pawmart-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://pawmart.vercel.app/)

