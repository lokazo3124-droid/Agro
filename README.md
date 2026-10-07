# Agro Fusagasugá — versión Laravel

Migración del sistema original en PHP plano (XAMPP) a **Laravel 11 + Inertia + React**.

La base de datos, los nombres de tablas y columnas, los pesos del motor MIESA y las
reglas de permisos son **idénticos** al sistema original: tus datos actuales se
importan sin modificaciones.

---

## 1. Instalación

Requisitos: PHP 8.2+, Composer, Node 18+, MySQL/MariaDB (el mismo de XAMPP sirve).

```bash
# 1. Dependencias
composer install
npm install

# 2. Configuración
cp .env.example .env
php artisan key:generate
```

Abre `.env` y ajusta la conexión a tu MySQL de XAMPP (por defecto ya apunta a
`fincas_agroturisticas_fgg`, usuario `root`, sin contraseña):

```
DB_DATABASE=fincas_agroturisticas_fgg
DB_USERNAME=root
DB_PASSWORD=
```

```bash
# 3. Crear las tablas (27 tablas + 1 vista)
php artisan migrate

# 4. Importar TUS datos originales
mysql -u root fincas_agroturisticas_fgg < database/data.sql
```

> Si prefieres arrancar con una base vacía y solo un admin de prueba:
> `php artisan db:seed` (crea `admin@agrofusagasuga.test` / `password`).
> No lo corras si ya importaste `data.sql`.

```bash
# 5. Levantar el proyecto (dos terminales)
php artisan serve     # http://localhost:8000
npm run dev
```

### Nota sobre las contraseñas existentes

El sistema original ya usaba `password_hash()` de PHP, que es el mismo bcrypt que usa
Laravel. **Tus usuarios pueden entrar con su contraseña de siempre**, no hay que
resetear nada.

---

## 2. Qué se migró y dónde quedó cada cosa

| Sistema original | Ahora en Laravel |
|---|---|
| `conexion.php` | `config/database.php` + `.env` |
| `login.php`, `logout.php` | `app/Http/Controllers/Auth/AuthenticatedSessionController.php` |
| `registro.php` | `app/Http/Controllers/Auth/RegisteredUserController.php` |
| `permisos_helper.php` | `app/Services/PermisosService.php` |
| `rangos_helper.php` | `app/Services/RangosClasificacionService.php` |
| `plantilla_helper.php` | `app/Services/PlantillaService.php` |
| `componentes_sidebar.php` | `app/Services/MenuService.php` + `resources/js/Layouts/AuthenticatedLayout.jsx` |
| **`sp_calcular_potencial`** (procedimiento MySQL) | **`app/Services/PotencialCalculatorService.php`** |
| `dashboard_*.php` (los 5) | `DashboardController` + `resources/js/Pages/Dashboard/*.jsx` |
| `registrar_finca.php`, `gestor_fincas.php` | `FincaController` + `resources/js/Pages/Fincas/*.jsx` |
| `aplicar_encuesta.php`, `ver_encuesta.php` | `EncuestaController` + `resources/js/Pages/Encuestas/*.jsx` |
| `admin_encuestas.php` | `AdminEncuestaController` + `resources/js/Pages/Admin/Encuestas.jsx` |
| `admin_usuarios.php` | `AdminUsuarioController` + `Pages/Admin/Usuarios.jsx` |
| `admin_rangos_permisos.php` | `AdminRangoPermisoController` + `Pages/Admin/RangosPermisos.jsx` |
| `admin_rangos.php` | `AdminRangoClasificacionController` + `Pages/Admin/RangosClasificacion.jsx` |
| `admin_encuestadores.php` | `AdminEncuestadorController` + `Pages/Admin/Encuestadores.jsx` |
| `admin_estadisticas.php`, `gestor_estadisticas.php` | `EstadisticaController` + `Pages/Admin/Estadisticas.jsx`, `Pages/Gestor/Estadisticas.jsx` |
| `gestor_municipios.php` | `MunicipioController` + `Pages/Gestor/Municipios.jsx` |
| Las 27 tablas + vista | `database/migrations/` |
| Tus datos (24 INSERT) | `database/data.sql` |

### El motor MIESA

Lo más delicado de la migración. El procedimiento almacenado de 344 líneas quedó
portado a `PotencialCalculatorService`, **con los mismos pesos y umbrales exactos**:

- Normaliza respuestas → promedia subdimensiones → pondera dimensiones
- GA3 se calcula como promedio de GA2, GA4 y GA6 (no tiene indicadores propios)
- ISA = `20 × (PS·0.25 + GA·0.30 + DS·0.15 + GC·0.10 + AT·0.20)`
- IETSS: ≤20 Rojo, ≤40 Naranja, ≤60 Amarillo, ≤80 Verde, resto Azul
- TRL-A / SRL-A / ORL-A con sus ponderaciones originales

Uso:

```php
app(PotencialCalculatorService::class)->calcular($idEncuesta);
```

Ventaja sobre el procedimiento almacenado: ahora es testeable, versionable en git y
se puede depurar paso a paso.

**Está cubierto por pruebas.** `tests/Unit/` verifica que la aritmética portada dé
exactamente los mismos números que el procedimiento original (umbrales del IETSS,
derivación de GA3, que los pesos de cada dimensión sumen 1.00, normalización de las
4 escalas de respuesta):

```bash
php artisan test
```

---

### Roles y permisos

Se conservó tal cual el sistema de dos capas:

- **4 roles fijos** (Administrador, Encuestador, Dueño de finca, Gestor Territorial) →
  acceso completo a lo que ya tenían.
- **Rangos personalizados** creados por el Administrador → solo las páginas y acciones
  que se les habiliten (`rango_paginas`, `rango_acciones`).

En las rutas se aplica con el middleware `rol`:

```php
Route::get('/gestor/fincas', ...)->middleware('rol:Gestor Territorial')->name('gestor.fincas');
```

El nombre de la ruta (`gestor.fincas`) es el identificador de "página" que se valida
contra los permisos del rango personalizado.

---

## 3. Hoja de ruta — lo que falta

Fases 1, 2 y 3 completas: base del sistema, CRUD de fincas, ciclo completo de encuestas
MIESA, y toda la administración (usuarios, rangos y permisos, municipios, estadísticas
y bitácora).

La **Fase 4 está implementada**:

- `constructor_encuestas.php` + `aplicar_encuesta_personalizada.php` → encuestas con
  preguntas propias, fuera del modelo MIESA
- `constructor_graficas.php` + `graficas_helper.php` → gráficas configurables que se
  incrustan en la pantalla de estadísticas
- `estadisticas_encuestas_personalizadas.php`
- `publico.php` → landing pública con mapa de calor, sin login

Los controladores viven en `app/Http/Controllers/EncuestaPersonalizadaController.php`,
`GraficaPersonalizadaController.php`, `EncuestaPersonalizadaEstadisticaController.php`
y `PublicoController.php`. Las pantallas Inertia correspondientes están en
`resources/js/Pages/Admin`, `resources/js/Pages/Encuestas/AplicarPersonalizada.jsx` y
`resources/js/Pages/Publico.jsx`. El constructor guarda preguntas de texto, escala
1–5, sí/no y opción múltiple; las aplicaciones se validan y persisten en una
transacción; y las gráficas agregan aplicaciones por municipio, encuesta o pregunta.
La vista pública usa la vista SQL `vista_publico_fincas` y sus coordenadas para el
mapa Leaflet. La migración `2026_09_19_000028_add_coordinates_to_public_view.php`
actualiza instalaciones existentes.

## 4. Estructura

```
app/
  Http/Controllers/     Auth/, Dashboard, Finca, Encuesta, Municipio,
                        Estadistica, AdminEncuesta, AdminUsuario,
                        AdminRangoPermiso, AdminRangoClasificacion,
                        AdminEncuestador
  Http/Middleware/      VerificarRol, HandleInertiaRequests
  Models/               27 modelos con sus relaciones
  Services/             PotencialCalculator, Plantilla, AgrupadorMiesa,
                        Permisos, RangosClasificacion, Menu
database/
  migrations/           32 migraciones
  data.sql              tus datos originales
  sp_calcular_potencial.original.sql.txt   (referencia del procedimiento viejo)
resources/js/
  Layouts/              AuthenticatedLayout (sidebar), AuthLayout
  Pages/                Auth/, Dashboard/, Fincas/, Encuestas/, Admin/, Gestor/
  Components/           MapaCalor (Leaflet), RadarDimensiones y
                        PanelesEstadisticas (Chart.js), PreguntaMiesa,
                        PastillaEstado, TarjetaStat, CamposFinca
routes/web.php          todas las rutas con su protección por rol
tests/Unit/             pruebas del motor MIESA
```
