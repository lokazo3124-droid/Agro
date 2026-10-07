# Protección de datos y arranque

La aplicación usa la base MySQL configurada en `.env`:

- Base: `fincas agroturísticas fgg`
- Servidor: `127.0.0.1:3306`

## Crear un respaldo

Antes de cambiar migraciones, actualizar el proyecto o modificar datos, ejecuta
PowerShell desde la carpeta del proyecto:

```powershell
.\scripts\backup-database.ps1
```

Los respaldos se guardan fuera del proyecto, en `Documentos\Agro Fusagasuga Backups`.
Conserva al menos una copia adicional en otro disco o servicio de respaldo.

## Iniciar la aplicación correctamente

Usa únicamente:

```powershell
.\scripts\start-project.ps1
```

El script se detiene si los puertos 8000 o 5173 ya están ocupados. Esto evita
mezclar la copia del Escritorio con una copia temporal o antigua.

## Comandos que no deben ejecutarse en la base real

No uses:

- `php artisan migrate:fresh`
- `php artisan migrate:refresh`
- `php artisan db:wipe`
- `php artisan migrate:reset`
- Importar un archivo SQL sobre la base real sin respaldo previo

Para cambios de estructura usa `php artisan migrate`, que conserva los registros.
No borres `database\data.sql`: es una copia histórica de los datos originales,
pero el respaldo operativo actual debe hacerse con `backup-database.ps1`.
