# Paso a paso: subir cambios a Git (y aprender)

Sigue estos pasos en una terminal (PowerShell o CMD) desde la carpeta del proyecto.

---

## 1. Ir a la carpeta del proyecto

```powershell
cd "c:\Users\ivan.fuentes\Documents\Code\menta"
```

Siempre que trabajes con Git en este proyecto, empieza aquí.

---

## 2. Ver el estado del repositorio

```powershell
git status
```

**Qué verás:**

- **"On branch master"** – Estás en la rama `master`.
- **"Your branch is ahead of 'origin/master' by X commit(s)"** – Tienes commits locales que aún no están en GitHub. Más adelante los subirás con `git push`.
- **"Changes not staged for commit"** – Archivos que modificaste pero aún no has añadido al área de preparación (staging).
- **"Untracked files"** – Archivos nuevos que Git aún no sigue.
- **"nothing to commit, working tree clean"** – No hay cambios pendientes; todo está guardado en commits.

Usa `git status` siempre que quieras saber qué ha cambiado.

---

## 3. Añadir los archivos que quieres subir

Tienes dos opciones:

**Opción A: Añadir todo lo que haya cambiado**

```powershell
git add .
```

El punto (`.`) significa “todos los archivos modificados o nuevos en esta carpeta”. Es lo más habitual cuando quieres subir todo.

**Opción B: Añadir archivos uno por uno**

```powershell
git add components/admin/CategoryForm.tsx
git add RENDIMIENTO_INP.md
```

Solo se subirán los archivos que indiques.

**Comprobar qué está preparado:**

```powershell
git status
```

Los archivos que aparecen en verde bajo "Changes to be committed" son los que se incluirán en el siguiente commit.

---

## 4. Hacer el commit (guardar el “paquete” de cambios)

```powershell
git commit -m "Tu mensaje aquí"
```

**Ejemplos de mensajes:**

- `git commit -m "Mejora INP: eliminar categoría sin bloquear el clic"`
- `git commit -m "Optimización rendimiento Navbar y CategoryForm"`
- `git commit -m "Prueba: dos menús Natura y NovaVenta"`

**Regla práctica:** el mensaje debe describir en una frase qué cambiaste o para qué es el commit.

**Comprobar que el commit se creó:**

```powershell
git log -1 --oneline
```

Verás algo como: `a1b2c3d Mejora INP: eliminar categoría...`. Ese es tu último commit.

---

## 5. Subir los commits a GitHub (push)

```powershell
git push origin master
```

- **origin** – Nombre del remoto (tu repo en GitHub).
- **master** – Rama a la que subes.

Si en GitHub tu rama se llama **main** en lugar de **master**:

```powershell
git push origin main
```

**La primera vez** puede pedirte usuario y contraseña (o token) de GitHub. Si usas HTTPS, en lugar de contraseña suelen pedir un **Personal Access Token**. Si usas GitHub Desktop o tienes credenciales guardadas, puede no preguntar.

Cuando termine sin error, tus commits estarán en GitHub y, si tienes Vercel conectado al repo, se desplegará automáticamente.

---

## Resumen rápido (copiar y pegar)

Cuando hayas terminado de hacer cambios y quieras subirlos:

```powershell
cd "c:\Users\ivan.fuentes\Documents\Code\menta"
git status
git add .
git commit -m "Descripción clara de lo que cambiaste"
git push origin master
```

(Sustituye el mensaje del commit y `master` por `main` si aplica.)

---

## Comandos útiles para seguir aprendiendo

| Comando | Qué hace |
|--------|-----------|
| `git status` | Ver qué está modificado, preparado o sin seguimiento |
| `git add .` | Preparar todos los cambios para el commit |
| `git add archivo.tsx` | Preparar solo un archivo |
| `git commit -m "mensaje"` | Crear un commit con los archivos preparados |
| `git push origin master` | Enviar tus commits al repo en GitHub |
| `git log -3 --oneline` | Ver los últimos 3 commits en una línea |
| `git diff` | Ver las diferencias de los archivos aún no preparados |

---

## Si algo sale mal

**"Nothing to commit, working tree clean"**  
No hay cambios que commitear. Si creías haber modificado algo, revisa que guardaste los archivos en el editor.

**"Your branch is ahead of 'origin/master' by 1 commit"**  
Tienes 1 commit local que no está en GitHub. Ejecuta `git push origin master` para subirlo.

**Error de conexión al hacer push**  
Revisa internet y, si usas VPN o proxy, que no esté bloqueando GitHub. Prueba de nuevo más tarde.

**"Permission denied" o "Authentication failed"**  
Git no puede autenticarse con GitHub. En Windows suele usar el Administrador de credenciales. Puedes crear un Personal Access Token en GitHub (Settings → Developer settings → Personal access tokens) y usarlo como contraseña al hacer push.
