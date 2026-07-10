# Vercel Proxy - Guia Completa

## Que es un Proxy?

Un proxy es un **intermediario** entre el cliente (navegador) y el servidor (backend). En lugar de que el navegador hable directamente con el backend, el proxy recibe la peticion, la envia al backend, y devuelve la respuesta.

```
SIN proxy:
Navegador (HTTPS) → Backend (HTTP) ❌ BLOQUEADO (mixed-content)

CON proxy:
Navegador (HTTPS) → Vercel (HTTPS) → Backend (HTTP) ✅ FUNCIONA
```

---

## Por que necesitamos un Proxy?

### El problema: Mixed-Content

Los navegadores **bloquean** peticiones HTTP cuando la pagina se carga por HTTPS.

```
Tu frontend en Vercel:  https://planto.vercel.app  (HTTPS)
Tu backend en Dokploy:  http://planto-backend...sslip.io  (HTTP)

Resultado: ❌ Error "blocked:mixed-content"
```

### La solucion: Proxy en Vercel

Vercel actua como puente. El navegador solo ve HTTPS, y Vercel internamente habla con el backend por HTTP.

```
Navegador → https://planto.vercel.app/api/plants (HTTPS)
                ↓ Vercel reescribe internamente
            http://planto-backend...sslip.io/api/plants (HTTP)
                ↓ Backend responde
            Vercel devuelve la respuesta al navegador (HTTPS)
```

---

## Como funciona en tu proyecto

### Archivo: `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://planto-backend-a6wdgs-0bcd86-163-192-137-59.sslip.io/api/:path*"
    },
    {
      "source": "/((?!assets/).*)",
      "destination": "/index.html"
    }
  ]
}
```

**Explicacion linea por linea:**

**Rewrite 1 - API Proxy:**
- `source` = `/api/:path*` significa "cualquier cosa que empiece con /api/"
- `:path*` = Un comodin que captura todo lo que sigue despues de `/api/`
- `destination` = A donde enviar la peticion (tu backend)

**Rewrite 2 - SPA Catch-all:**
- `source` = `/((?!assets/).*)` significa "cualquier ruta que NO empiece con /assets/"
- `destination` = `/index.html` envia todo a la pagina principal
- **Por que?** React Router maneja las rutas en el navegador. Si haces refresh en `/market`, Vercel no encuentra un archivo `market.html`, asi que envia `index.html` y React Router se encarga

### Ejemplo de como funciona:

```
1. Navegador pide:  https://planto.vercel.app/api/plants
2. Vercel busca:    /api/plants coincide con /api/:path*
3. Vercel envia:    http://planto-backend...sslip.io/api/plants
4. Backend responde con: {"items": [...]}
5. Vercel devuelve: la respuesta al navegador
```

```
1. Navegador pide:  https://planto.vercel.app/api/plants/haworthia
2. Vercel busca:    /api/plants/haworthia coincide con /api/:path*
3. Vercel envia:    http://planto-backend...sslip.io/api/plants/haworthia
4. Backend responde con: {"name": "Haworthia", ...}
5. Vercel devuelve: la respuesta al navegador
```

---

## Desarrollo Local con Vite Proxy

En desarrollo, Vite tiene su propio proxy para que no tengas que configurar CORS.

### Archivo: `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://planto-backend-a6wdgs-0bcd86-163-192-137-59.sslip.io',
    },
  },
})
```

**Explicacion:**

- `server.proxy` = "Cuando el frontend haga peticiones a /api/*, proxyalas al backend"
- `'//api'` = Cualquier peticion que empiece con `/api/`
- `'http://...'` = A donde enviarla

### Ejemplo en desarrollo:

```
1. App React pide:  http://localhost:5173/api/plants  (mismo origen)
2. Vite intercepta: /api/plants coincide con la regla
3. Vite envia:      http://planto-backend...sslip.io/api/plants
4. Backend responde con los datos
5. Vite devuelve:   la respuesta a la app React
```

**Resultado:** En tu codigo React haces `fetch('/api/plants')` y funciona tanto en desarrollo como en produccion, sin importar la URL del backend.

---

## Por que `BASE_URL = ''`?

### Archivo: `src/services/api.ts`

```typescript
const BASE_URL = ''
```

**Antes:**
```typescript
const BASE_URL = 'http://planto-backend...sslip.io'
// fetch(`${BASE_URL}/api/plants`)
// Resultado: http://planto-backend...sslip.io/api/plants
```

**Ahora:**
```typescript
const BASE_URL = ''
// fetch(`${BASE_URL}/api/plants`)
// Resultado: /api/plants (URL relativa)
```

**Por que URL relativa?**

- En desarrollo: `http://localhost:5173/api/plants` → Vite proxy la maneja
- En produccion: `https://planto.vercel.app/api/plants` → Vercel rewrite la maneja

Si usaras URL absoluta (`http://backend...`), el proxy no funcionaria porque la peticion iria directamente al backend, saltandose a Vercel.

---

## CORS - Por que el proxy tambien lo resuelve

### Que es CORS?

CORS (Cross-Origin Resource Sharing) es una seguridad del navegador que **bloquea** peticiones a un servidor diferente al que cargo la pagina.

```
Pagina cargo de:    https://planto.vercel.app
Peticion va a:      http://planto-backend...sslip.io
Origen diferente:   ❌ CORS BLOQUEADO
```

### Como el proxy resuelve CORS

```
Sin proxy:
https://planto.vercel.app → http://backend ❌ CORS

Con proxy:
https://planto.vercel.app → https://planto.vercel.app (mismo origen) ✅
    Vercel internamente → http://backend (no hay CORS porque no es el navegador)
```

El navegador solo ve que la peticion va al **mismo dominio** (planto.vercel.app), asi que no hay problema de CORS.

---

## Flujo Completo: Desarrollo vs Produccion

### Desarrollo (local)

```
┌─────────────────┐     ┌──────────┐     ┌─────────────────┐
│  React (Vite)   │ ──→ │   Vite   │ ──→ │    Backend      │
│ localhost:5173  │     │  Proxy   │     │ sslip.io:8000   │
│                 │ ←── │          │ ←── │                 │
└─────────────────┘     └──────────┘     └─────────────────┘

URL que ve React:  /api/plants (relativa)
URL que usa Vite:  http://backend/api/plants (proxy interno)
```

### Produccion (Vercel)

```
┌─────────────────┐     ┌──────────┐     ┌─────────────────┐
│  React (Vite)   │ ──→ │  Vercel  │ ──→ │    Backend      │
│  tu-app.vercel  │     │ Rewrite  │     │ sslip.io:8000   │
│                 │ ←── │          │ ←── │                 │
└─────────────────┘     └──────────┘     └─────────────────┘

URL que ve React:  /api/plants (relativa)
URL que usa Vercel: http://backend/api/plants (rewrite interno)
```

---

## Resumen de Archivos

| Archivo | Que hace | Ejemplo |
|---------|----------|---------|
| `vercel.json` | Proxy en produccion (Vercel) | Redirige `/api/*` al backend |
| `vite.config.ts` | Proxy en desarrollo (local) | Redirige `/api/*` al backend |
| `src/services/api.ts` | URL base vacia | `BASE_URL = ''` para URLs relativas |
| `.env` | Variables de entorno | `VITE_API_URL` ya no se necesita |

---

## Cuando cambiar la URL del Backend

Si cambias la URL de tu backend, solo necesitas editar **UN** archivo:

- **Produccion:** `vercel.json` → cambia la `destination`
- **Desarrollo:** `vite.config.ts` → cambia la URL en `proxy`

---

## Glossario

- **HTTPS** = HTTP Secure. Protocolo encriptado (el candado verde en el navegador)
- **HTTP** = Protocolo sin encriptar (menos seguro)
- **Mixed-Content** = Error cuando una pagina HTTPS hace peticiones HTTP
- **CORS** = Cross-Origin Resource Sharing. Seguridad que bloquea peticiones a otros dominios
- **Proxy** = Intermediario que redirige peticiones
- **Rewrite** = Regla que reescribe URLs sin cambiar la barra de direccion del navegador
- **sslip.io** = Servicio DNS que resuelve IPs en URLs amigables
- **Vite** = Herramienta de desarrollo que incluye proxy integrado
