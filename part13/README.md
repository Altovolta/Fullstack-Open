Para ejecutar la DB usando docker hay que usar:

```sh
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

Para acceder al contenedor y a la DB usar:

```sh
docker exec -it some-postgres bash
psql -U postgres
```