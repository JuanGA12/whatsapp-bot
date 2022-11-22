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
  fase
)
VALUES ('51959163747','Fase0',FALSE), ('51958838270','Fase0',FALSE);