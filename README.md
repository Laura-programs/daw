# Proyecto intermodular
Estre repositorio se va a utilizar para mantener un control de versiones 
del proyecto realizado en la asignatura de Proyecto Intermodular.

## Introducción
CalQuedar es una herramienta centrada en un calendario, donde el usuario puede crear distintos eventos. También permite visitar calendarios de sus amigos y grupos, y dentro de estos, crear eventos grupales si es el administrador.

## Documentación
En la carpeta CalQuedar se encuentra el código completo de la aplicación, puesto que esta es un monolito
La carpeta Servers cuenta con el servidor Tomcat necesario para poder ejecutar el proyecto (Tomcat9)
En docs se encuentra la documentación generada, en proceso de desarrollo, relacionada con el proyecto. También se encuentra el sql necesario para poder crear la BBDD

## Flujo de despliegue
### Infraestructura necesaria
### Servicios depedientes
### Credenciales de servicios 

| Proyecto intermodular | Descripción |
|-----------------------|-------------|
|CalQuedar | [Enlace al proyecto](https://github.com/Laura-programs/daw)|

## Plan de despliegue
### Opción 1
Configurar en mi casa un servidor web Debian con lo aprendido durante el curso, implementando
un servidor Tomcat o Apache, pudiendo acceder a el mediante uso de NoIP
#### Pros
* Baja probabilidad de error debido a que está en mi casa
* Aplico lo aprendido en la asignatura de Despliegue en su totalidad
* Facilita el despliegue continuio, al tenerlo físicamente al lado
#### Contras
* Dependo de que el portátil no falle el día de la presentación
* Los recursos son limitados

### Opción 2
Configurar el servidor en AWS, permitiendo acceso al proyecto desde cualquier sitio
#### Pros
* Mayor cantidad de recursos
* Se aplican los contenidos aprendidos en dos asignaturas
* Mayor seguridad al ser una aplicación de la que dependen muchas cosas
#### Contras
* Implica un mayor aprendizaje
* No es a prueba de balas
* Los créditos se terminarían pronto

La opción elegida es la primera, puesto que me permite una mayor sencillez a la hora de subir los archivos necesarios,
y no me arriesgo a quedarme sin créditos. En caso de ver que el portátil no está funcionando como servidor,
lo implementaría en mi ordenador propio, el cual usa Arch