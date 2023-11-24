create database ventas
go
use ventas
go
create table familias(
famid int not null,
famnombre varchar( 20) not null )
go
alter table familias add constraint pk_familias primary key ( famid)
go
create table articulos(
artid int not null,
artnombre varchar( 50 ) not null, 
artdescripcion varchar( 500) not null,
artprecio numeric( 12,2) not null,
famid int not null
)
go
alter table articulos add 
constraint pk_articulos primary key ( artid),
constraint fk_articulos_familias foreign key ( famid ) references familias(famid) 
go
insert familias values( 1, 'Abarrotes' ) 
insert familias values( 2, 'Verduras' ) 
insert familias values( 3, 'Lacteos' ) 
insert familias values( 4, 'Limpieza' ) 
go
insert articulos values( 1, 'Sal la fina', 'Sal de mar',12.34  , 1) 
insert articulos values( 2, 'Cajeta Coronado', 'Cajeta de cabra', 34.34 , 1 ) 
insert articulos values( 3, 'Limón', 'Limón colima',3.45 ,2 ) 
insert articulos values( 4, 'Tomate', 'Tomate bola',21.12 ,2 ) 
insert articulos values( 5, 'Queso crema', 'Queso de vaca ligth', 43.45 , 3 ) 
insert articulos values( 6, 'Salchicha', 'Salchicha alemana',56.34  , 3) 
insert articulos values( 7, 'Trapeador', 'Trapeador rojo de madera',78.54 ,4 ) 
insert articulos values( 8, 'Cloro', 'Cloro con aroma floral', 89.87, 4) 

