FROM mysql:5.7.32
ENV MYSQL_ROOT_PASSWORD="catch=Me=If=You=Can?!"
EXPOSE 3306 3306
# make sure that expected depot table exists after container start
COPY init-depot-database.sql /docker-entrypoint-initdb.d/
COPY init-keycloak-database.sql /docker-entrypoint-initdb.d/
