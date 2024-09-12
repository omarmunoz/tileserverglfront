#/bin/bash
dropdb filemanager 
createdb filemanager -O failmanaller
# bzcat ../filemanager.sql.bz2 | psql filemanager
rm -rf files
python manage.py makemigrations
python manage.py migrate
# rm -rf files/alanmunoz
export DJANGO_SUPERUSER_PASSWORD=elus3rd3pru3b4
export DJANGO_SUPERUSER_USERNAME=eluserdeprueba
export DJANGO_SUPERUSER_EMAIL=omuozgarci@gmail.com
python manage.py createsuperuser --noinput
python manage.py runserver