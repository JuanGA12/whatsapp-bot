CREATE DATABASE bd_whatsapp_exp1;
use bd_whatsapp_exp1;
create table usuarios(
	celular  varchar(255) not null, 
    fase varchar(255) not null, 
    primary key (celular)
)

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
    )