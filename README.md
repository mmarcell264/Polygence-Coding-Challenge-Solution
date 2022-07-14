# Polygence Coding Challenge Solution
## Project setup:
After you downloaded and extracted or cloned the project go to its folder.
### Backend setup (on Windows):
```shell
cd backend
```
#### Create virtual ineviroment:
```shell
python -m -m venv "your_path_to_your_backend_folder\your_preffered_virtual_enviroment_name"
```
#### Activate your virtual enviroment:
```shell
"your_path_to_your_virtual_enviroment\Scripts\activate"
```
From this segment until Front end setup part you need the virtual enviroment to be activated.

#### Install requiered libraries:

I needed an extra library (django-cors-headers) beside Django and Django Rest Framework, because by default django does not contain Access-Control-Allow-Origin header what fetch API in javascript requeires.
```shell
pip install -r requirements.txt
```
#### Setup SQLite database:
```shell
cd spendingexercise
```
```shell
python manage.py migrate
```
#### Run tests:
```shell
python manage.py test
```
I tested some of the database field constraints with the Serializer because SQLite does not enforce it like it accepts a 15 character long string for a string field with a maximum length of 10.
#### Start Django developer server:
```shell
python manage.py runserver 5000
```

### Frontend setup (on Windows):
#### Install requiered libraries:
At project root directory
```shell
cd web
```
```shell
npm install
```
#### Tests:
I did not write any Unit tests because almost all the important compoenents (FiltersAndOrderings, Form, SpendingList) somewhat dependent from the main App like useState wise. And I think if I write tests for the main App those will be called more likely integrations tests rather Unit tests.

#### Start React frontend:
```shell
npm start
```




