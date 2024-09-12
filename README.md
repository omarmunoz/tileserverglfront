# DjangoReactMaps
# djangoreactmaps

Este proyecto está desarrollado con Django Rest Framework y React. Tiene como finalidad poner una pantalla de inicio a un servicio de Tileserver-gl dockerizado.

## Requisitos

- Python 3.x
- Node.js
- PostgreSQL
- Apache con mod_wsgi
- Virtualenv

## Instalación

### Backend (Django)

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu_usuario/djangoreactmaps.git
    cd djangoreactmaps
    ```

2. Crea y activa un entorno virtual:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Instala las dependencias:
    ```sh
    pip install -r requirements.txt
    ```

4. Configura la base de datos en `file_manager/settings.py`:
    ```py
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'nombre_de_tu_base_de_datos',
            'USER': 'tu_usuario',
            'PASSWORD': 'tu_contraseña',
            'HOST': 'localhost',
            'PORT': 5432,
        }
    }
    ```

5. Realiza las migraciones:
    ```sh
    python manage.py migrate
    ```

6. Crea un superusuario:
    ```sh
    python manage.py createsuperuser
    ```

### Frontend (React)

1. Navega al directorio del frontend:
    ```sh
    cd file_manager_frontend
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Construye el proyecto:
    ```sh
    npm run build
    ```

## Despliegue

### Configuración de Apache

1. Asegúrate de que Apache y mod_wsgi estén instalados:
    ```sh
    sudo apt-get install apache2 libapache2-mod-wsgi-py3
    ```

2. Configura el archivo de Apache (`/etc/apache2/sites-available/djangoreactmaps.conf`):
    ```apacheconf
    <IfModule mod_ssl.c>
        <VirtualHost _default_:443>
            ServerName elmapa.cedn.mx
            ServerAlias www.elmapa.cedn.mx
            DocumentRoot /home/alanmunoz/djangoreactmaps/file_manager

            WSGIDaemonProcess djangoreactmaps python-home=/home/alanmunoz/.local/share/virtualenvs/djangoreactmaps-OxYS5Yp3 python-path=/home/alanmunoz/djangoreactmaps/file_manager
            WSGIProcessGroup djangoreactmaps
            WSGIScriptAlias / /home/alanmunoz/djangoreactmaps/file_manager/file_manager/wsgi.py

            <Directory /home/alanmunoz/djangoreactmaps/file_manager/file_manager>
                <Files wsgi.py>
                    Require all granted
                </Files>
            </Directory>

            Alias /static/ /home/alanmunoz/djangoreactmaps/file_manager/static/
            <Directory /home/alanmunoz/djangoreactmaps/file_manager/static>
                Require all granted
            </Directory>

            SSLEngine on
            SSLCertificateFile /home/alanmunoz/certs_mapas/_wildcard.cedn.mx+1.pem
            SSLCertificateKeyFile /home/alanmunoz/certs_mapas/_wildcard.cedn.mx+1-key.pem

            ErrorLog ${APACHE_LOG_DIR}/error.log
            CustomLog ${APACHE_LOG_DIR}/access.log combined
        </VirtualHost>
    </IfModule>
    ```

3. Habilita el sitio y reinicia Apache:
    ```sh
    sudo a2ensite djangoreactmaps.conf
    sudo systemctl restart apache2
    ```

### Permisos del Entorno Virtual

Asegúrate de que Apache y mod_wsgi tengan permisos para acceder al entorno virtual. Puedes cambiar los permisos del entorno virtual con los siguientes comandos:

```sh
sudo chown -R www-data:www-data /home/alanmunoz/.local/share/virtualenvs/djangoreactmaps-OxYS5Yp3
sudo chmod -R 755 /home/alanmunoz/.local/share/virtualenvs/djangoreactmaps-OxYS5Yp3
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia CC0. Para más detalles, consulta el archivo LICENSE.