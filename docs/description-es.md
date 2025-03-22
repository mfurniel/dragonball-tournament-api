# 🐉🔥 Backend - NestJS + TypeScript 🔥🐉

## 📍 Descripción
Eres un desarrollador backend en la **Corporación Cápsula** y Bulma te ha pedido que desarrolles un sistema para gestionar **torneos de artes marciales** 🏆. La API permitirá a los guerreros del universo **registrarse, crear torneos y unirse a batallas épicas**.

## 🚀 Requisitos del Proyecto

### **1️⃣ Alcance del Proyecto**
Debes construir un sistema de torneos con las siguientes entidades:

- **Guerreros** 🥋 (Usuarios): Se registran e inician sesión.
- **Torneos** 🏆: Los organizan los guerreros y pueden tener múltiples participantes.
- **Peleas** ⚔️: Los guerreros luchan en los torneos y se registra el ganador.
- **Notificaciones** 📢: Se notificará cuando un guerrero se una a un torneo o gane una pelea.

---

### **2️⃣ Requerimientos Funcionales**
- **Autenticación y autorización**
  - Los guerreros deben poder **registrarse** e **iniciar sesión**.
  - Se debe implementar autenticación con **JWT**.
  - Solo el creador de un torneo puede **editarlo o eliminarlo**.

- **Gestión de torneos**
  - Un guerrero autenticado puede **crear, editar y eliminar torneos**.
  - Cualquier guerrero autenticado puede ver la **lista de torneos disponibles**.
  - Un guerrero puede **unirse a un torneo**.

- **Peleas y ganadores**
  - Un torneo puede tener **múltiples peleas**.
  - Se debe poder registrar el **ganador de cada pelea**.
  - Cuando un guerrero gana una pelea, se enviará una **notificación**.

- **Testing**
  - Se deben incluir **pruebas unitarias y de integración** con Jest.

- **Documentación**
  - La API debe estar documentada con **Swagger**.

---

## 🔧 Requisitos Técnicos

### **1️⃣ Tecnologías**
- **NestJS** ⚡
- **TypeScript** 🟦
- **PostgreSQL o MongoDB** (puede usarse **Docker**)
- **TypeORM o Prisma** (si usas PostgreSQL)
- **Mongoose** (si usas MongoDB)
- **JWT para autenticación**
- **Jest para testing**
- **Swagger para documentación**
- **Docker (opcional)**

### **2️⃣ Buenas Prácticas Esperadas**
- Arquitectura modular en **NestJS**.
- Uso de **DTOs y validadores** con `class-validator`.
- **Inyección de dependencias** correctamente aplicada.
- **Control de errores** y manejo adecuado de excepciones.
- **Pruebas unitarias y de integración** con Jest.
- Uso de **Environment Variables** con `@nestjs/config`.
- **CI/CD básico** (workflow de GitHub Actions para correr los tests).

---

## 📅 Plazo y Entrega
- **Tiempo estimado**: **7 días**.
- **Entrega**: Repositorio público en **GitHub** con un `README.md` explicando cómo correr el proyecto.
- **Criterios de Evaluación**:
  - ✅ Código limpio y buenas prácticas.
  - ✅ Correcta implementación de NestJS.
  - ✅ Uso de DTOs, servicios y módulos.
  - ✅ Seguridad en la API.
  - ✅ Cobertura de tests.
  - ✅ Documentación clara en Swagger.

---

### 🔥 Bonus (Opcional pero suma puntos)
- Implementar **WebSockets** para notificaciones en tiempo real.
- Crear un **workflow de CI/CD** con **GitHub Actions**.
- Desplegar en **Railway/Vercel/Render**.

---

## 📖 Ejemplo de Endpoints Esperados

### **Autenticación**
```
POST /auth/register  # Registro de guerreros
POST /auth/login  # Inicio de sesión
```

### **Torneos**
```
POST /torneos  # Crear torneo
GET /torneos  # Ver torneos disponibles
GET /torneos/:id  # Ver detalles de un torneo
PUT /torneos/:id  # Editar torneo (solo creador)
DELETE /torneos/:id  # Eliminar torneo (solo creador)
```

### **Participación en Torneos**
```
POST /torneos/:id/unirse  # Un guerrero se une a un torneo
GET /torneos/:id/guerreros  # Ver guerreros inscritos en un torneo
```

### **Peleas**
```
POST /torneos/:id/peleas  # Registrar una pelea
POST /torneos/:id/peleas/:id/ganador  # Registrar el ganador de una pelea
GET /torneos/:id/peleas  # Ver peleas de un torneo
```

---

## 🛠 Ejemplo de Modelo

```ts
export class Guerrero {
  id: string;
  nombre: string; // Ejemplo: "Goku"
  raza: string; // Ejemplo: "Saiyajin"
  nivel_poder: number; // Ejemplo: 9001
  createdAt: Date;
}
```

```ts
export class Torneo {
  id: string;
  nombre: string; // Ejemplo: "Torneo de las Artes Marciales"
  creadorId: string;
  participantes: string[];
  peleas: Pelea[];
}
```

```ts
export class Pelea {
  id: string;
  torneoId: string;
  guerrero1Id: string;
  guerrero2Id: string;
  ganadorId?: string;
}
```

---

¡Que la pelea comience! 🐉🔥🏆
