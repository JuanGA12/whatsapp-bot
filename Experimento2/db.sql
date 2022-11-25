CREATE DATABASE bd_whatsapp_exp2;
use bd_whatsapp_exp2;
create table usuarios(
	celular  varchar(255) not null, 
  fase varchar(255) not null, 
  menu boolean not null, 
  primary key (celular)
);

INSERT INTO usuarios (
  celular,
  fase,
  menu
)
VALUES ('51959163747','Fase0',FALSE), ('51958838270','Fase0',FALSE);
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