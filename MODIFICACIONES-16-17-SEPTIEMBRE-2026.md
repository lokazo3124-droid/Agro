# Modificaciones realizadas

## Periodo

16 y 17 de septiembre de 2026.

## Proyecto

Agro Fusagasugá, aplicación Laravel con Inertia y React.

## Resumen general

Durante este periodo se trabajó en la migración y ampliación de la aplicación de fincas agroturísticas. Se integraron funcionalidades del sistema PHP anterior, se ampliaron los paneles por rol, se mejoraron las encuestas, se añadieron estadísticas y gráficas, y se corrigieron problemas de acceso, traducciones, mensajes y publicación local.

## Funcionalidades agregadas o ampliadas

### Portada y acceso público

- Se modernizó la portada pública.
- Se agregó el fondo rural `campo.jpg`.
- Se consolidó la ruta pública `/publico`.
- Se mejoraron las vistas de inicio de sesión y registro.
- Se agregó un directorio público de fincas.
- Se incorporaron filtros, indicadores y fichas de fincas.
- Se agregaron imágenes, comentarios y comparación de hasta tres fincas.

### Encuestas y plantillas

- Se integraron las plantillas MIESA y las encuestas personalizadas en un mismo listado de plantillas disponibles.
- Se agregó rotación conjunta de plantillas.
- Se habilitó la selección manual y automática de plantillas.
- Se agregó edición de encuestas personalizadas:
  - Título.
  - Descripción.
  - Estado.
  - Preguntas.
  - Opciones.
  - Tipo de respuesta.
  - Obligatoriedad.
  - Orden.
- Se agregó edición de criterios MIESA.
- Se agregaron subdimensiones, escalas, prioridades y acciones recomendadas.
- Se protegieron preguntas y criterios que ya tienen respuestas históricas para evitar cambios destructivos.

### Rangos y permisos

- Se integró el sistema de rangos personalizados del sistema anterior.
- Se mejoró visualmente el formulario de rangos y permisos.
- Se conectaron las acciones con rutas reales de Laravel.
- Se mantuvieron los roles fijos con sus accesos principales.
- Se agregaron permisos explícitos para rangos personalizados.
- Se actualizaron los menús para mostrar páginas según el rol y sus permisos.

### Dashboards por rol

#### Administrador

- Resumen global del sistema.
- Alertas.
- Actividad reciente.
- Fincas sin evaluar.
- Indicadores administrativos.

#### Encuestador

- Productividad semanal.
- Fincas pendientes.
- Encuesta activa.
- Fincas recientes.
- Actividad reciente.

#### Gestor Territorial

- Fincas sin evaluar.
- Promedio territorial.
- Municipios para priorizar.
- Alertas territoriales.

#### Dueño de finca

- ISA actual.
- Fecha de la última encuesta.
- Nivel de potencial.
- Clasificación ISA.
- Cinco dimensiones MIESA.
- Evolución histórica.
- Historial de evaluaciones.
- Promedio histórico.
- Mejor ISA.
- Variación respecto a la evaluación anterior.
- Información técnica de la finca.
- Servicios, atractivos e imágenes.
- Plan de mejora y recomendaciones.
- Gráfico radial.
- Gráfico de evolución ISA.

#### Rangos personalizados

- Páginas habilitadas.
- Acciones permitidas.
- Resumen de permisos efectivos.

### Estadísticas y gráficas

Se agregaron o ampliaron fuentes para el constructor de gráficas:

- Fincas activas por municipio.
- Fincas activas por vereda.
- Fincas por rango ISA.
- Fincas activas frente a inactivas.
- Usuarios por rol.
- Encuestas personalizadas por mes.
- Cálculos ISA por mes.
- Aplicaciones por encuesta.
- Aplicaciones por finca.
- Respuestas de preguntas Sí/No u opción múltiple.
- Promedios de escalas de 1 a 5.
- Fincas por municipio.
- Distribución por rango ISA.
- Mapa de fincas evaluadas.

## Correcciones realizadas

### Permisos de aplicación de encuestas

Se corrigió un error HTTP 403 que afectaba al rango Encuestador. Las rutas de aplicación de encuestas personalizadas estaban dentro del grupo exclusivo de Administrador. Se reorganizaron para que fueran accesibles con autenticación a:

- Encuestador.
- Administrador.

### Mensajes de éxito y error

- Los mensajes flash se consumen con `session()->pull()`.
- Se agregó desaparición automática después de cinco segundos.
- Se agregó animación de entrada.
- Se agregó barra de progreso.
- Se agregó botón de cierre manual.
- Se agregó desaparición gradual.
- Se aplicó el comportamiento al layout autenticado y a la vista pública.

### Traducciones

Se agregaron traducciones al español para:

- Contraseña mínima.
- Campos obligatorios.
- Correo inválido.
- Correo duplicado.
- Confirmación de contraseña.
- Reglas de contraseña.

### Acceso mediante Tunnelmole

- Se configuró el uso de `npx.cmd tunnelmole 8000` en Windows.
- Se corrigió el bloqueo de PowerShell sobre `npx.ps1`.
- Se corrigió el contenido mixto cuando Tunnelmole entrega HTTPS y Laravel generaba assets HTTP.
- Se configuró la detección automática de hosts `.tunnelmole.net`.
- Se mantuvo HTTP para el acceso local por `127.0.0.1`.

### Acceso local por red

- Se configuró Laravel para escuchar en `0.0.0.0:8000`.
- Se documentó el acceso mediante la IPv4 del computador.
- Se indicó cómo permitir el puerto 8000 en el Firewall de Windows para redes privadas.

### Problema de Vite y pantalla blanca

Durante la restauración de la aplicación se corrigió la configuración de Vite para registrar tanto el CSS como el punto de entrada React:

```js
input: ['resources/css/app.css', 'resources/js/app.jsx']
```

Después se recompiló el frontend con `npm run build`, evitando el error:

```text
Unable to locate file in Vite manifest: resources/css/app.css
```

## Archivos principales modificados

- `app/Http/Controllers/DashboardController.php`
- `app/Http/Controllers/ConstructorGraficaController.php`
- `app/Http/Controllers/AdminUsuarioController.php`
- `app/Http/Middleware/HandleInertiaRequests.php`
- `app/Providers/AppServiceProvider.php`
- `app/Services/GraficaPersonalizadaService.php`
- `app/Services/PermisosService.php`
- `app/Services/MenuService.php`
- `routes/web.php`
- `resources/js/Layouts/AuthenticatedLayout.jsx`
- `resources/js/Pages/Publico/Index.jsx`
- `resources/js/Pages/Dashboard/Admin.jsx`
- `resources/js/Pages/Dashboard/Encuestador.jsx`
- `resources/js/Pages/Dashboard/Gestor.jsx`
- `resources/js/Pages/Dashboard/Finca.jsx`
- `resources/js/Pages/Dashboard/Rango.jsx`
- `resources/js/Pages/Admin/Usuarios/Index.jsx`
- `lang/es/validation.php`
- `lang/es/passwords.php`
- `vite.config.js`
- `.env`

## Revisión del usuario ID 33

Se revisó el usuario que anteriormente aparecía con datos como `//////`.

Estado actual comprobado:

- ID: `33`.
- Nombre: `Camilo Angel`.
- Correo: `CamiloAngel@gmail.com`.
- Rol: `Gestor Territorial`.
- Fincas registradas: `5`.

No se eliminó ni modificó porque tiene cinco fincas vinculadas como registrador.

## Validaciones realizadas

- Se verificó la sintaxis PHP de archivos modificados.
- Se verificó la conexión con la base MySQL heredada.
- Se verificaron las rutas Laravel.
- Se ejecutó `npm run build`.
- Se comprobó la respuesta HTTP local.
- Se comprobaron las rutas `/`, `/login` y `/publico`.
- Se comprobó el acceso a la base de datos.
- Se verificó que el servidor pudiera escuchar en `0.0.0.0:8000`.

## Configuración operativa actual

La aplicación se encuentra en:

```text
C:\Laravel\AgroFusagasuga
```

Inicio local:

```powershell
Set-Location "C:\Laravel\AgroFusagasuga"
php artisan serve --host=0.0.0.0 --port=8000
```

Acceso local:

```text
http://127.0.0.1:8000
```

Acceso desde la misma red:

```text
http://IP-DE-TU-PC:8000
```

## Observaciones

- No se ejecutaron migraciones destructivas sobre la base heredada.
- Los avisos sobre `PDO::MYSQL_ATTR_SSL_CA` corresponden a PHP 8.5 y no impiden el funcionamiento.
- La aplicación depende de que MySQL esté encendido en XAMPP.
- La terminal de Laravel debe permanecer abierta mientras se usa el servidor de desarrollo.
- Tunnelmole genera URLs temporales; esas URLs pueden cambiar.
- Para una publicación permanente se requiere configurar un servidor y medidas de producción.
