## Commands
### Migration

Generate new migration file by entity files

```shell
yarn db:migration:generate {path/name}
```

path - path to migrations folder
name - name migration file

example {path/name} - ./src/migrations/add-tables

Run new migrations

```shell
yarn db:migration:run
```

Revert last migration

```shell
yarn db:migration:revert
```