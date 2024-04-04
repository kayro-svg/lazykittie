// creacion de tipos globales para la aplicacion
//Analiza bien tu necesidad de negocio para saber qué sí debería ser global. No abuses de los tipos globales.
//Idealmente corresponden a entidades del contexto de la aplicación, ex: Usuario, Producto

type IFoxImageItem = {
    id: string; 
    url: string
};
