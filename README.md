# api-apuesta

backend de servicios centralizados para el control y gestión de apuestas.

## Configuracion de debug vscode

La clase principal se compila en base al archivo principal y se puede ejecutar con el siguiente ejemplo:

```launch.json
{
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\src\\index.ts",
            "args": ["--env","local"],
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
}

ejemplo de variables env:

```.env
NODE_ENV=development

##########################    SERVICE   ##########################
PORT=4000
API_MIDDLEWARE=https://172.16.1.159:8443/topazinterpretedws/tokenbuilder
PUBLIC_PATH_FILE=public/files
URL_PATH=/apuesta/api/v1
ELMINACION_ARCHIVOS_DIAS=90
PETICIONES_TIEMPO=100


##########################    MONGODB   ##########################
MONGO_URL=mongodb://localhost:27017
MONGO_DATABASE=API_APUESTA

##########################    JWT   ##########################
JWT_TOKEN_SECRET=f361aaa1177c444a9da7e59f0aca299e1cc33ebdfa245299222b1fa104e515085e427dc974aa8cc294c87f4b4f68ca6902dce5df5e48532f3997f3b6eb163f16
#% EXPIRE=60*60*12
JWT_TOKEN_EXPIRE=43200

```