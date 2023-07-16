## PROJETO TO-DO LIST

Projeto para gerenciar lista de tarefas; 
Desenvolvido utilizando Laravel 10 e NODE;


## SCRIPT PARA CRIAR A TABELA LISTATAREFAS

CREATE TABLE `listatarefas` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`status` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`created_at` DATETIME NULL DEFAULT NULL,
	`updated_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;