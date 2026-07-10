# Vercel Edge Middleware - Guia Completa

## Que es Edge Middleware?

Edge Middleware es un **codigo que se ejecuta ANTES de que la pagina se cargue** en el navegador. Corre en los servidores de Vercel, cerca del usuario (en el "edge" o borde de la red).

```
Peticion del usuario
       ↓
┌─────────────────────────┐
│   Edge Middleware        │  ← Aqui corre tu codigo ANTES de todo
│   (puede modificar,      │
│    redirigir, o          │
│    bloquear peticiones)  │
└─────────────────────────┘
       ↓
┌─────────────────────────┐
│   Tu pagina o API        │  ← Luego se ejecuta la ruta normal
└─────────────────────────┘
       ↓
Respuesta al usuario
```

---

## Middleware vs Rewrites vs API Routes

### Donde corre cada uno:

| Tipo | Cuando corre | Para que sirve |
|------|-------------|----------------|
| **Middleware** | ANTES de la ruta | Modificar peticiones, redirigir, autenticar |
| **Rewrites** | Durante el routing | Redirigir URLs sin cambiar la URL visible |
| **API Routes** | Cuando pides `/api/*` | Logica de backend en Vercel |

### Ejemplo comparativo:

```
SIN Middleware:
Usuario → /dashboard → Se carga la pagina directo

CON Middleware:
Usuario → /dashboard → Middleware verifica si esta logueado
    ├── Si esta logueado → Se carga la pagina
    └── Si NO esta logueado → Redirigir a /login
```

---

## Como funciona Edge Middleware

### Ubicacion del archivo

```
frontend/
├── src/
│   ├── pages/
│   ├── components/
│   └── ...
├── middleware.ts          ← Aqui va el Middleware (en la RAIZ)
├── vercel.json
└── package.json
```

**IMPORTANTE:** El archivo `middleware.ts` debe estar en la **raiz** del proyecto, no en `src/`.

### Estructura basica

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Tu codigo aqui
  
  // Ejemplo: redirigir /a a /b
  if (request.nextUrl.pathname === '/a') {
    return NextResponse.redirect(new URL('/b', request.url))
  }
  
  return NextResponse.next() // Continuar normalmente
}

// Que rutas afecta el middleware
export const config = {
  matcher: ['/a', '/b/:path*']
}
```

### Explicacion:

1. **`middleware(request)`** - Funcion que recibe cada peticion
2. **`NextResponse.redirect()`** - Redirigir a otra URL
3. **`NextResponse.next()`** - Dejar pasar la peticion normalmente
4. **`config.matcher`** - Que rutas deben pasar por el middleware

---

## Ejemplo Real: Proxy con Environment Variables

### El problema que resuelve

Con `vercel.json` rewrites, la URL del backend esta **hardcodeada**:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://planto-backend...sslip.io/api/:path*"
    }
  ]
}
```

Si cambias de backend, tienes que editar `vercel.json` y hacer redeploy.

### La solucion con Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Si la peticion empieza con /api/, redirigir al backend
  if (request.nextUrl.pathname.startsWith('/api')) {
    const backendUrl = process.env.BACKEND_URL || 'http://planto-backend...sslip.io'
    
    // Construir la nueva URL
    const apiUrl = new URL(request.nextUrl.pathname, backendUrl)
    apiUrl.search = request.nextUrl.search
    
    // Redirigir al backend
    return NextResponse.rewrite(apiUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
```

### Variables de entorno en Vercel

En el dashboard de Vercel → Settings → Environment Variables:

```
BACKEND_URL = http://planto-backend...sslip.io
```

Ahora si cambias de backend, solo cambias la variable en Vercel, sin tocar codigo.

---

## Ejemplo: Autenticacion con Middleware

### Proteger rutas privadas

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const isLoginPage = request.nextUrl.pathname === '/login'
  
  // Si no tiene token y no esta en login, redirigir a login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Si tiene token y esta en login, redirigir al dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/settings', '/login']
}
```

---

## Ejemplo: Geolocalizacion

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Obtener pais del usuario
  const country = request.geo?.country || 'US'
  
  // Redirigir segun pais
  if (country === 'MX') {
    return NextResponse.rewrite(new URL('/es', request.url))
  }
  
  return NextResponse.rewrite(new URL('/en', request.url))
}
```

---

## Edge Runtime vs Node.js Runtime

### Que es Edge Runtime?

Edge Runtime es un **entorno de ejecucion limitado** pero **muy rapido** que corre en los servidores de Vercel cerca del usuario.

### Comparacion:

| Caracteristica | Edge Runtime | Node.js Runtime |
|---------------|--------------|-----------------|
| **Velocidad** | ⚡ Muy rapido | 🐢 Mas lento |
| **Ubicacion** | Cerca del usuario (edge) | Servidor central |
| **Memoria** | 128 MB max | 1024 MB+ |
| **Tiempo** | 30 seg max | 10 min max |
| **Librerias** | Limitadas (no npm completo) | Cualquier libreria |
| **Archivos** | No puede leer archivos | Puede leer archivos |
| **Base de datos** | Solo via HTTP/API | Directa (Redis, Postgres, etc.) |

### Cuando usar Edge:

```
✅ Edge:
- Redirecciones simples
- Autenticacion basica (verificar cookies/headers)
- Geolocalizacion
- A/B testing
- Modificar headers
- Proxy/rewrites dinamicos

❌ Node.js:
- Consultas directas a base de datos
- Procesamiento pesado de archivos
- Integraciones con librerias que usan Node APIs
- Logica compleja que necesita filesystem
```

---

## Como funciona en tu proyecto actual

### Tu setup actual: `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://planto-backend...sslip.io/api/:path*"
    }
  ]
}
```

**Funciona pero:**
- URL hardcodeada en el archivo
- Si cambias de backend, toca editar y redeploy
- No puedes usar variables de entorno

### Tu setup futuro: `middleware.ts`

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const backendUrl = process.env.BACKEND_URL
    const apiUrl = new URL(request.nextUrl.pathname, backendUrl)
    apiUrl.search = request.nextUrl.search
    return NextResponse.rewrite(apiUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
```

**Ventajas:**
- URL en variable de entorno (no hardcodeada)
- Cambias backend sin tocar codigo
- Puedes agregar logica (rate limiting, auth, etc.)
- Mas flexible y mantenible

---

## Cuando migrar a Middleware

### Migrar cuando tengas:

1. **Dominio propio** (ej: `planto.com`)
   - Necesitas configurar DNS, SSL, etc.
   - Middleware te da mas control

2. **Multiples entornos** (dev, staging, production)
   - Cada entorno puede tener diferente `BACKEND_URL`
   - Configuras en Vercel dashboard por entorno

3. **Autenticacion server-side**
   - Verificar JWT tokens antes de cargar paginas
   - Redirigir usuarios no autenticados

4. **Rate limiting**
   - Limitar peticiones por usuario/IP
   - Proteger contra abuso

5. **A/B testing**
   - Mostrar diferentes versiones a diferentes usuarios
   - Sin cambiar la URL visible

### NO migrar si:

- Solo tienes un entorno simple
- No necesitas logica antes de cargar paginas
- `vercel.json` rewrites te alcanzan

---

## Paso a paso: Migrar de Rewrites a Middleware

### Paso 1: Crear `middleware.ts` en la raiz

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const backendUrl = process.env.BACKEND_URL
    if (!backendUrl) {
      return NextResponse.next()
    }
    const apiUrl = new URL(request.nextUrl.pathname, backendUrl)
    apiUrl.search = request.nextUrl.search
    return NextResponse.rewrite(apiUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
```

### Paso 2: Agregar variable de entorno en Vercel

```
BACKEND_URL = http://planto-backend...sslip.io
```

### Paso 3: Eliminar rewrites de `vercel.json`

```json
{
  "rewrites": []
}
```

O eliminar el archivo `vercel.json` si no tienes nada mas.

### Paso 4: Probar

- Desarrollo local: `middleware.ts` no corre en `vite dev`, usa `vite.config.ts` proxy
- Produccion: `middleware.ts` corre en Vercel

---

## Glossario

- **Edge** = El "borde" de la red, cerca del usuario final
- **Middleware** = Codigo que se ejecuta entre la peticion y la respuesta
- **Rewrite** = Reescribir la URL sin cambiar la barra de direccion del navegador
- **Matcher** = Patron que define que rutas afecta el middleware
- **Runtime** = Entorno de ejecucion (Edge vs Node.js)
- **Environment Variables** = Variables de entorno configurables en Vercel
- **JWT** = JSON Web Token, formato de tokens de autenticacion
- **A/B Testing** = Mostrar diferentes variantes a diferentes usuarios
- **Rate Limiting** = Limitar la cantidad de peticiones por tiempo
- **Geolocalizacion** = Determinar la ubicacion del usuario por su IP
