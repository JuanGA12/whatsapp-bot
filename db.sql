create table usuarios(
	celular  varchar(255) not null, 
    fase varchar(255) not null, 
    primary key (celular)
);
CREATE TABLE calificacion (
	id int NOT NULL AUTO_INCREMENT,
    celular varchar(255) not null,
    calificacion int not null,
    fecha varchar(50) not null,
    primary key (id),
	FOREIGN KEY (celular) REFERENCES usuarios(celular)
);
create table dudas (
	id int NOT NULL AUTO_INCREMENT,
	celular varchar(255) not null, 
    mensaje varchar(255) not null, 
    primary key (id),
	FOREIGN KEY (celular) REFERENCES usuarios(celular)
)