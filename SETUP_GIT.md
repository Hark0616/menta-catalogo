# Configuración de Git para menta-catalogo

El repositorio Git ya está inicializado y el remoto apunta a:
`https://github.com/Hark0616/menta-catalogo.git`

## Traer el código por primera vez

En esta carpeta (`menta`), abre una terminal y ejecuta:

```powershell
git fetch origin
git checkout -b master origin/master
```

Si la rama en GitHub se llama `main` en lugar de `master`:

```powershell
git fetch origin
git checkout -b main origin/main
```

Con eso tendrás todo el código del catálogo en tu carpeta.

## Después de modificar: subir cambios

```powershell
git add .
git status
git commit -m "Descripción de tus cambios"
git push origin master
```

(Sustituye `master` por `main` si esa es la rama por defecto en GitHub.)

## Resumen

| Ya hecho | Pendiente (en tu PC, con conexión) |
|----------|------------------------------------|
| `git init` | `git fetch origin` y `git checkout -b master origin/master` |
| `git remote add origin` | Luego `npm install`, crear `.env.local` y `npm run dev` |

Vercel seguirá desplegando en cada `git push` al repo conectado.
