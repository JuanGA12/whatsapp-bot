CREATE DATABASE bd_whatsapp_exp1;
use bd_whatsapp_exp1;
create table usuarios(
	celular  varchar(255) not null, 
    fase varchar(255) not null, 
    primary key (celular)
);

INSERT INTO usuarios (
    celular,
    fase
)
VALUES
    (
        '51959163747',
        'Fase0'
    ),
    (
        '51958838270',
        'Fase0'
    );
create table mensajes(
    id int AUTO_INCREMENT,
	fecha  varchar(255) not null, 
    celular varchar(255) not null, 
    envio boolean not null,
    contenido varchar(500) not null,
    primary key (id),
    FOREIGN KEY (celular)
    REFERENCES usuarios(celular)
);
-- true = envio de bot
-- false = envio de usuario