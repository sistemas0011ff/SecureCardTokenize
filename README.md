# Proyecto - SecureCardTokenize

## Descripción
"SecureCardTokenize" es un proyecto centrado en la seguridad y eficiencia en la gestión de datos de tarjetas de crédito/débito a través de un sistema de tokenización. Este sistema protege la información sensible, como los números de tarjetas y CVV, almacenándolos de forma segura y utilizando tokens para representar esta información en las transacciones y procesos internos.

## Contexto
En el mundo de las transacciones digitales, la seguridad de la información de las tarjetas de crédito es primordial. Para abordar este desafío, "SecureCardTokenize" implementé una solución robusta que utiliza una bóveda encriptada para el almacenamiento seguro de datos en reposo. El proceso de tokenización envía los datos de la tarjeta a un servicio dedicado que valida, almacena la información de forma segura en una base de datos encriptada, y devuelve un token único como referencia.


**Arquitectura y Patrones de Diseño**:  
Los servicios se han implementado siguiendo una arquitectura hexagonal y los principios de Domain-Driven Design (DDD), lo que facilita una clara separación entre la lógica del negocio y las interacciones externas. Utiliza Command Query Responsibility Segregation (CQRS) para diferenciar entre las operaciones de lectura y escritura, lo que mejora la escalabilidad, trazabilidad y la capacidad de auditoría del sistema.
 
![Diagrama de Arquitectura](images/DiagramaArquitectura.png)
### **UI/API [Adaptadores Primarios]** - [1]
- **Función**: Interfaz de usuario y puntos de entrada de la API.  
- **Componentes**: 
  - Controladores o resolvers (`src/app/controllers`)
  - Rutas (`src/app/routes`)
  **Descripción**: 
  Gestiona las solicitudes entrantes de los usuarios o sistemas externos y las redirige a la capa de aplicación. Actúa como el frente del sistema, manejando las interacciones y las peticiones de API.

### **Capa de Aplicación [Puerto Primario]** - [2]
- **Función**: Orquestación de la lógica de aplicación específica para cada contexto limitado.  
- **Componentes**: 
  - Servicios, fábricas, y otras clases relacionadas con la lógica de negocio que se encuentran en `src/contexts/[ContextoLimitado]/application`.
  **Descripción**: 
  Coordina los casos de uso dentro de cada contexto limitado, procesando datos y lógica de negocio específica del contexto y enviándolos a la capa correspondiente.

### **Casos de Uso [Controladores de Lógica de Negocio]** - [3]
- **Función**: Manejo específico de casos de uso de la lógica de negocio.  
- **Componentes**:  
  - Módulos de casos de uso (`src/contexts/[ContextoLimitado]/application/usecases`)
  **Descripción**: 
  Implementa la lógica específica de los casos de uso, como procesos de transacción, validaciones y reglas de negocio. Cada caso de uso es responsable de una parte específica de la lógica del negocio.

### **Capa de Dominio [Núcleo]** - [4]
- **Función**: Núcleo de la lógica de negocio.  
- **Componentes**: 
  - Entidades, Agregados, Objetos valor y lógica de dominio (`src/contexts/[ContextoLimitado]/domain`)
  **Descripción**: 
  Contiene la lógica de negocio esencial y las reglas del dominio, modelando los objetos y procesos del negocio. Esta capa es crucial para mantener la integridad y las reglas del negocio.

### **Puertos Secundarios [Interfaces de Dominio]** - [5]
- **Función**: Interfaces para la comunicación externa.  
- **Componentes**: 
  - Interfaces de dominio o puertos por contexto(`src/contexts/[ContextoLimitado]/domain/interfaces`)
  - Interfaces de dominio o puertos transversales(`src/contexts/shared/domain/interfaces`)
  **Descripción**: 
  Proporciona puntos de integración y comunicación con sistemas externos o con la capa de infraestructura, permitiendo una interacción flexible con otras partes del sistema o con servicios externos.

### **Capa de Infraestructura [Adaptadores Secundarios]** - [6]
- **Función**: Implementaciones técnicas y de soporte.  
- **Componentes**: 
  - Implementaciones de infraestructura por contexto(`src/contexts/[ContextoLimitado]/infrastructure`)
  - Implementaciones de infraestructura transversales(`src/contexts/shared/infrastructure`)
  **Descripción**: 
  Maneja las operaciones de persistencia, conexiones a bases de datos y la interacción con servicios externos. Esta capa es clave para la operación y comunicación con otros sistemas y recursos.

### **Recursos Compartidos [Shared Kernel]** - [7]
- **Función**: Código y funcionalidades comunes.  
- **Componentes**: 
  - Código compartido (`src/contexts/shared`)
  **Descripción**: 
  Incluye herramientas, utilidades y código que es compartido entre diferentes partes del sistema, proporcionando una base común y reduciendo la duplicidad. Esencial para mantener la cohesión y la reutilización del código.

## Comenzando
## Prerrequisitos para Configurar y Ejecutar el Proyecto
Antes de hacer cualquier solicitud a la API, asegúrate de tener las credenciales adecuadas y permisos para acceder a los servicios AWS.
Asegúrate de que tu firewall y las reglas de seguridad de la red permitan el acceso al puerto necesario para la API.

Antes de clonar y ejecutar el proyecto, debes tener configurado lo siguiente en tu entorno de desarrollo:

## Herramientas Requeridas
![Descargar este Manual para creación de EKS en AWS](images/aws_manual_icon_50x50.png) [Descargar este Manual para creación de EKS en AWS](https://retodev-2024.s3.amazonaws.com/AWS-CONFIGURACION.docx)

- **AWS CLI:** Debes tener la AWS Command Line Interface instalada y configurada con tus credenciales.
- **Node.js:** Se requiere Node.js.
- **Base de datos:** Se esta usando Redis Como base de datos no relacional, **NO SE ESTA CONSIDERANDO USURIO Y CONTRASEÑA, ESTA QUE SE TRABAJA CON VALORES POR DEFECTO**.
- **Docker**:
Docker instalado y en ejecución en tu máquina.
## Variables de Entorno

- Configura las variables de entorno locales necesarias para la ejecución del proyecto. Puedes hacerlo creando un archivo `.env` en la raíz de tu proyecto con el siguiente contenido:
### Generar Base64 para las variables de entorno
- Para codificar tu clave en bas64 ingresar en este link https://www.base64encoder.io/
![Generar Base64](images/base64.png)

```plaintext
NODE_ENV=production
BASE_PATH=''
PORT=3908
REDIS_PORT=6379
REDIS_HOST=redis
REDIS_DB=0
DATA_SECRET_KEY="U2VjcmV0Q3VscWlSZXRvRGF0YQ=="
JWT_SECRET_KEY="cnq0sA9+ZHTIoCzh8hzDUWITH/M6WcvGTXUnTd5xz14="

```
## Uso
Antes de comenzar, asegúrate de tener configuradas tus credenciales de AWS y acceso a Amazon EKS. Esto es necesario para que puedas interactuar con los servicios de AWS y desplegar aplicaciones en Amazon EKS. Sigue estos pasos si aún no lo has hecho:

1. **Instalar AWS CLI**: Asegúrate de tener el AWS Command Line Interface instalado en tu máquina.
2. **Ejecutar AWS Configure**: En tu terminal, ejecuta `aws configure` y sigue las instrucciones para ingresar tu Access Key ID, Secret Access Key, región por defecto, y el formato de salida.
3. **Configuración de Amazon EKS**: Asegúrate de tener acceso a un cluster de Amazon EKS y de configurar tu `kubectl` para interactuar con él. Puedes hacerlo siguiendo la documentación oficial de AWS para configurar `kubectl` con Amazon EKS.
4. **Docker**:
Docker instalado y en ejecución en tu máquina.

Una vez configurado AWS y el acceso a Amazon EKS, puedes proceder con el uso del proyecto.

### Pasos para el uso del proyecto

```bash
# Clonar el repositorio
git clone https://github.com/sistemas0011ff/SecureCardTokenize.git

# Cambiar al directorio del proyecto
cd SecureCardTokenize

# Instalar las dependencias del proyecto
npm install
```
### Desplegar en LOCAL

Para ejecutar el proyecto en un entorno local, debes cumplir con los siguientes requisitos:

- Tener **REDIS** instalado localmente. REDIS debe estar configurado para permitir el acceso sin necesidad de usuario y contraseña. Asegúrate de que el servicio de REDIS esté ejecutándose y que los puertos correspondientes estén disponibles para conexiones.


  ```bash
  # Ejecuta
  npm run start:local
  ```
- Al ejecutar la aplicación localmente, se espera que recibas un mensaje de confirmación en la consola o en los logs de la aplicación. Aquí tienes un ejemplo del mensaje y una descripción de sus componentes:

  ```json
  {
    "level": 30,
    "time": 1706454119875,
    "system": "Culqi",
    "country": "PE",
    "service": "secure-card-tokenize",
    "environment": "production",
    "appVersion": "1.0.0",
    "message": {},
    "msg": "pry-secure-card-tokenize App is running at 3908 in production mode"
  }

  ```
- **level**: Nivel de registro del log, donde 30 representa un nivel de 'info'.
- **time**: Timestamp UNIX del momento en que se registró el log.
- **system**: El sistema o plataforma desde donde se está ejecutando la aplicación.
- **country**: Código del país donde se está ejecutando la aplicación.
- **service**: Nombre del servicio que se está ejecutando, en este caso "secure-card-tokenize".
- **environment**: El entorno en el que se está ejecutando la aplicación, que aquí indica "production".
- **appVersion**: La versión de la aplicación que se está ejecutando.
- **message**: Un objeto que puede contener información adicional sobre el mensaje; en este caso, está vacío.
- **msg**: Mensaje descriptivo que indica que la aplicación "pry-secure-card-tokenize" está en funcionamiento, especificando el puerto y el modo de entorno.

### Despliegue con Docker Compose
- Docker Compose permite definir y compartir aplicaciones multi-contenedor.
#### Prerrequisitos
- Docker y Docker Compose deben estar instalados en tu máquina.
- Ubicarte en el directorio donde se encuentra `docker-compose.yml` donde se define los servicios de la aplicación.

#### Pasos para el Despliegue
1. **Ubica el archivo `docker-compose.yml`**: Navega al directorio que contiene el `docker-compose.yml`, se encuentra en la raíz del proyecto.

2. **Ejecuta Docker Compose**:
   - Para construir e iniciar tus servicios en segundo plano, ejecuta:
     ```bash
     docker-compose up -d
     ```
    - Al iniciar los servicios con Docker Compose, podrás ver una salida en la consola que confirma la inicialización y el estado de los servicios. A continuación se muestra un ejemplo de cómo se verían estos mensajes en tu terminal:

      ```plaintext
      securecardtokenize-redis-1               | 1:M 28 Jan 2024 15:01:58.095 * Server initialized
      securecardtokenize-redis-1               | 1:M 28 Jan 2024 15:01:58.095 * Ready to accept connections tcp
      securecardtokenize-securecardtokenize-1  | Connecting to Redis at redis:6379, DB: 0
      securecardtokenize-securecardtokenize-1  | {"level":30,"time":1706454119875,"system":"Culqi","country":"PE","service":"secure-card-tokenize","environment":"production","appVersion":"1.0.0","message":{},"msg":"pry-secure-card-tokenize App is running at 3908 in production mode"}
      ```
   - Para ver los logs de los servicios, utiliza:
     ```bash
     docker-compose logs
     ```
   - Si necesitas reconstruir los servicios, puedes utilizar:
     ```bash
     docker-compose up -d --build
     ```

3. **Verificar los servicios**:
   - Para verificar que los servicios están corriendo, ejecuta:
     ```bash
     docker-compose ps
     ```

#### Detener y Limpiar
- Para detener los servicios, utiliza:
  ```bash
  docker-compose down
### Configuración de AWS ECR para Desplegar en EKS
#### Prerrequisitos
- Docker instalado y en ejecución en tu máquina.
- AWS CLI configurado con las credenciales apropiadas.
- AWS Tools for PowerShell instalado, si prefieres usar PowerShell.

#### Pasos para desplegar el proyecto en ECR
- Construir la imagen de Docker
  ```bash
  docker build -t securecardtokenize .
- Autenticar con Amazon ECR
  ```bash
  aws ecr get-login-password --region tu-region | docker login --username AWS --password-stdin tu-id-de-repositorio.ecr.tu-region.amazonaws.com
  ```
- Etiquetar la imagen para el repositorio de ECR
  ```bash
  docker tag securecardtokenize:latest tu-id-de-repositorio.ecr.tu-region.amazonaws.com/securecardtokenize:latest
  ```
- Subir la imagen a Amazon ECR
  ```bash
  docker push tu-id-de-repositorio.ecr.tu-region.amazonaws.com/securecardtokenize:latest
  ```
#### Pasos para despliegue en Amazon EKS
- Resumen del Despliegue Kubernetes deploy.yml
  - Servicios y Despliegues
    - 1. Servicio de Redis (`redis-service`)
      - **Tipo**: Service
      - **Función**: Exposición interna del servicio Redis en el clúster
      - **Puerto**: 6379
      - **Selector**: `app: redis`
    - 2. Despliegue de Redis (`redis-deployment`)
      - **Tipo**: Deployment
      - **Replicas**: 1
      - **Etiquetas**: `app: redis`
      - **Contenedor**:
        - **Nombre**: `redis-container`
        - **Imagen**: `redis`
        - **Puerto del Contenedor**: 6379
        - **Recursos**:
          - **Solicitados**: 500Mi memoria, 500m CPU
          - **Límites**: 1Gi memoria, 1000m CPU
    - 3. Servicio de Tokenización de Tarjetas (`securecardtokenize-service`)
      - **Tipo**: Service
      - **Función**: Exposición externa del servicio de tokenización mediante LoadBalancer
      - **Puertos**: Puerto 80 del servicio a puerto 3908 del contenedor
      - **Selector**: `app: securecardtokenize`
    - 4. Despliegue de Tokenización de Tarjetas (`securecardtokenize-deployment`)
      - **Tipo**: Deployment
      - **Replicas**: 2
      - **Etiquetas**: `app: securecardtokenize`
      - **Contenedor**:
        - **Nombre**: `securecardtokenize-container`
        - **Imagen**: [Considerar la URI de la imagen del ECR creada, esta definida en el Documento]
        - **Puerto del Contenedor**: 3908
        - **Variables de Entorno**: Desde `ConfigMap` y `Secret`
        - **Sondas de Vida y Disponibilidad**: `/health` en puerto 3908
        - **Recursos**:
          - **Solicitados**: 500Mi memoria, 500m CPU
          - **Límites**: 1Gi memoria, 1000m CPU
    - 5. ConfigMap para Tokenización de Tarjetas (`securecardtokenize-config`)
      - Proporciona configuración de entorno y detalles de conexión a Redis.
    - 6. Secret para Tokenización de Tarjetas (`securecardtokenize-secret`)
      - Contiene claves secretas para cifrado o autenticación.

- Actualizar la configuración de kubectl para el cluster EKS
  ```bash
  aws eks --region [tu-region] update-kubeconfig --name [nombre-del-cluster-eks]
  # Ejemplo
  aws eks --region us-east-2 update-kubeconfig --name eks-culqui-2024
  ```
- Asegúrate de tener el archivo de configuración de Kubernetes (deployment.yaml)
  ```bash
  kubectl apply -f deployment/deploy.yml
  ```
- Validar que los PODS, esten corriendo
  ```bash
  kubectl get pods
  ```

- Obtener la Ruta Externa para Usar el Endpoint. Para acceder al endpoint expuesto  en Amazon EKS, necesitarás obtener la dirección IP externa(EXTERNAL-IP) o el nombre de dominio asociado al servicio que expone tu aplicación. Esto permitirá interactuar con tu aplicación a través de la red.
Ejecuta el siguiente comando en tu terminal para listar todos los servicios en el namespace predeterminado:
  ```bash
  kubectl get svc

  #Ejemplo de Salida
  NAME                 TYPE           CLUSTER-IP     EXTERNAL-IP       PORT(S)          AGE
  securecardtokenize   LoadBalancer   10.100.200.1   a12b3c4d5e6f7.us-west-2.elb.amazonaws.com   80:31514/TCP   78s
  ```

#### Opcional - Procedimientos de Limpieza para Amazon EKS

1. **Eliminar Servicios**
   - Elimina los servicios de Redis y de la aplicación:
     ```bash
     kubectl delete service redis-service
     kubectl delete service securecardtokenize-service
     ```

2. **Eliminar Deployments**
   - Remueve los deployments de Redis y de la aplicación:
     ```bash
     kubectl delete deployment redis-deployment
     kubectl delete deployment securecardtokenize-deployment
     ```

3. **Eliminar ConfigMap**
   - Elimina el ConfigMap asociado a la aplicación:
     ```bash
     kubectl delete configmap securecardtokenize-config
     ```

4. **Eliminar Secret**
   - Elimina los secrets asociados a la aplicación:
     ```bash
     kubectl delete secret securecardtokenize-secret
     ```

5. **Ver logs**
   - Revisa los logs del pod específico de la aplicación:
     ```bash
     kubectl logs securecardtokenize-deployment-76dfd845cc-z85j5
     ```

6. **Listar pods**
   - Lista todos los pods activos para verificar su estado:
     ```bash
     kubectl get pods
     ```
## Documentación API de Tokenización de Tarjetas
- Se detalla los endpoints disponibles para la tokenización de tarjetas y la recuperación de datos de tarjetas tokenizadas.

### Endpoints

## Acceso y Pruebas de la API

- #### Acceso a la API

  - Para acceder a la API de "SecureCardTokenize", utiliza la siguiente IP externa o URL:
  - **URL Base Externa:** `hhttp://ad59274a00cfd404bbe430d05292b8eb-1726481549.us-east-2.elb.amazonaws.com/[end-point]`

- #### Tokenización de Tarjetas
  - **Endpoint:** `/tokenize-card`
  - **Método:** POST
  - **Descripción:** Crea un token único para una tarjeta de crédito proporcionada.
  - **Cuerpo de la Solicitud (Request Body):**
    ```json
    {
      "email": "usuario@example.com",
      "card_number": "4111111111111111",
      "cvv": "123",
      "expiration_year": "2024",
      "expiration_month": "12"
    }
    ```
  - **Responses:**
    - `200 OK`: Devuelve un token de tarjeta de crédito generado con éxito.
    - `400 Bad Request`: La entrada es inválida.

  - **Evidencia**
  ![Crea un token único para una tarjeta](images/ep1.png)

  - #### Respuesta de Tokenización de Tarjetas

    Tras una solicitud exitosa de tokenización, la API devuelve un `token` en el formato JSON Web Token (JWT), que es una cadena de texto codificada segura:

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNhcmROdW1iZXIiOiI0MTExMTExMTExMTExMTExIiwiZXhwaXJhdGlvbkRhdGUiOiIxMC8yMDI3IiwiY3Z2IjoiODg4IiwiZW1haWwiOiJleGFtcGxlQGhvdG1haWwuY29tIn0sImlhdCI6MTcwNjQ1ODQwMiwiZXhwIjoxNzA2NDU4NDYyfQ.rtOg3urJ7_OpYY52mUvqYWpQWNGtd0zRakrtRIO8bS8"
    }
    ```

- #### Estructura del JWT

  El JWT consta de tres partes, separadas por puntos (`.`):

  - **Encabezado (Header)**: Indica el tipo de token (JWT) y el algoritmo de firma utilizado, en este caso (AES-256).
  - **Carga Útil (Payload)**: Contiene los claims o afirmaciones sobre la entidad (generalmente, el usuario) y datos adicionales. Aquí se incluyen el número de tarjeta, la fecha de caducidad, el CVV y el correo electrónico cifrados.
  - **Firma (Signature)**: Para crear la firma, se debe tomar el encabezado codificado en base64, el payload codificado en base64, y una clave secreta. Luego se utiliza el algoritmo especificado en el encabezado para firmar estos datos.

    ```typescript
    const token = jwt.sign({ data: datos }, this.jwtSecretKey, { expiresIn: '1m' });
    ```
  Cada parte del JWT se codifica en Base64 y se separa por puntos. El encabezado y el payload son información codificada, mientras que la firma es el resultado de la codificación del encabezado y el payload con una clave secreta.

- #### Validez del Token

  El token proporcionado tiene un tiempo de validez limitado, generalmente corto, para garantizar la seguridad. En este caso, el token es válido por:

  - **1 minuto**: Después de este período, el token ya no será válido y las solicitudes que lo utilicen serán rechazadas.

  #### Uso del Token

  Este token se debe incluir en el encabezado de autorización de las solicitudes HTTP para autenticar y autorizar las operaciones que accedan a la información de la tarjeta de crédito. Solo el servidor que conoce la clave secreta puede generar o validar este token, lo que asegura la integridad y autenticidad de las comunicaciones.

  #### Obtener Datos de la Tarjeta
  - **Endpoint:** `/card-data`
  - **Método:** GET
  - **Descripción:** Recupera los datos de la tarjeta de crédito utilizando el token previamente generado.
  - **Headers:**
    - **Authorization**: Requiere un token de autorización en el formato `Bearer <token>`.
    
  - **Responses:**
    - `200 OK`: La solicitud ha sido exitosa y los datos de la tarjeta se devuelven en el cuerpo de la respuesta.
      ```json
      {
        "cardNumber": "4111111111111111",
        "expirationDate": "10/2027",
        "email": "example@hotmail.com"
      }
      ```
    - `401 Unauthorized`: La solicitud no ha sido completada porque falta el token de autorización o es inválido.
    - `404 Not Found`: No se encontraron datos para el token proporcionado, puede que haya expirado o sea incorrecto.
  - **Evidencia**
  ![Crea un token único para una tarjeta](images/ep2.png)

## Reporte de Pruebas del Proyecto

La estructura y arquitectura del proyecto facilitan la implementación y ejecución de pruebas, permitiendo enfocarse en componentes específicos. A continuación, se presenta un resumen de los resultados de las pruebas realizadas, destacando la cobertura de código y la calidad del mismo.

#### Suites y Clases Testeadas
Ejecución de pruebas:
  ```bash
  npm run test:coverage
  ```
![Test1](images/t1.png)
![Test1](images/t2.png)
#### Resultados de las Pruebas

- Se ejecutaron pruebas utilizando Jest con cobertura.
- Todas las pruebas pasaron con éxito.

#### Duración de las Pruebas
- Duración total de las pruebas: 22.796 segundos

#### Cobertura de Código

- Cobertura general del código: 91.93%
- Cobertura de ramas: 65.21%
- Cobertura de funciones: 92.68%
- Cobertura de líneas de código: 91.73%

#### Detalles de Cobertura por Archivo

- `app/controllers/tokenization`
  - Cobertura: 69.23%
  - Cobertura de ramas: 33.33%
- `contexts/CardTokenization/application/commands`
  - Cobertura: 100%
  - Cobertura de ramas: 100%
- `contexts/CardTokenization/application/dto`
  - Cobertura: 100%
  - Cobertura de ramas: 100%
- `contexts/CardTokenization/application/handlers`
  - Cobertura: 100%
  - Cobertura de ramas: 66.66%
- `contexts/CardTokenization/application/queries`
  - Cobertura: 100%
  - Cobertura de ramas: 100%
- `contexts/CardTokenization/application/services`
  - Cobertura: 100%
  - Cobertura de ramas: 100%
- `contexts/CardTokenization/application/usecases`
  - Cobertura: 100%
  - Cobertura de ramas: 100%
- `contexts/CardTokenization/domain/aggregates`
  - Cobertura: 100%
  - Cobertura de ramas: 100%
- `contexts/CardTokenization/domain/valueobjects`
  - Cobertura: 100%
  - Cobertura de ramas: 100%
- `contexts/shared/application/response`
  - Cobertura: 71.42%
  - Cobertura de ramas: 0%

#### Total de Pruebas
- Suites de prueba: 11 pasadas de 11 totales.
- Pruebas: 32 pasadas de 32 totales.
_Documentación generada por el equipo de desarrollo._
### Autor

- **Arturo Eduardo Fajardo Gutiérrez** 

