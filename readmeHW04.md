Creează branch-ul hw04-auth din master.

Creează un REST API pentru a lucra cu o colecție de contacte. Adaugă logica de autentificare/autorizare a utilizatorului folosind JWT.

# Pasul 1

În cod, creează un model pentru utilizator în colecția users.

{
password: {
type: String,
required: [true, 'Password is required'],
},
email: {
type: String,
required: [true, 'Email is required'],
unique: true,
},
subscription: {
type: String,
enum: ["starter", "pro", "business"],
default: "starter"
},
token: {
type: String,
default: null,
},
}

Pentru ca fiecare utilizator să interacționeze și să vadă doar lista sa de contacte, în modelul pentru contact, adaugă proprietatea owner:

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }

NOTĂ
'user' - numele colecției (la singular) în care sunt stocați utilizatorii.

# Pasul 2

Înregistrarea
Creează endpoint-ul /users/signup

Efectuează validarea pentru toate câmpurile obligatorii (email și password). Dacă apare o eroare la validare, returnează Validation Error.

În cazul validării reușite a modelului User, creează un utilizator conform datelor care au trecut validarea.

Pentru a cripta parola, folosește bcrypt sau bcryptjs.

Dacă adresa de e-mail este deja folosită de altcineva, returnează Conflict Error.
În caz contrar, returnează Success Response.
Registration request
POST /users/signup
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
Registration validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Eroare de la librăria Joi sau o altă librărie de validare>
Registration conflict error
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
"message": "Email in use"
}
Registration success response
Status: 201 Created
Content-Type: application/json
ResponseBody: {
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
Logarea
Creează endpoint-ul /users/login

În modelul User, va fi nevoie să cauți utilizatorul după email.

Efectuează validarea pentru toate câmpurile obligatorii (email și password). Dacă apare o eroare la validare, se returnează Validation Error.

Dacă validarea este reușită, se va compara parola utilizatorului găsit. Dacă parolele se potrivesc, creează un token, salvează-l în utilizatorul curent și returnează Success Response.
Dacă parola sau adresa de e-mail sunt incorecte, returnează Unauthorized Error.
Login request
POST /users/login
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
Login validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Eroare de la librăria Joi sau o altă librărie de validare>
Login success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"token": "exampletoken",
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
Login auth error
Status: 401 Unauthorized
ResponseBody: {
"message": "Email or password is wrong"
}

# Pasul 3

Verificarea token-ului
Creează un middleware pentru a valida token-ul și adaugă-l la toate rutele care trebuie să fie securizate.

Middleware-ul preia token-ul din antetul Authorization și verifică validitatea lui.
În caz de eroare, se returnează Unauthorized Error.
Dacă validarea a fost cu succes, se preia id-ul utilizatorului din token. Apoi se caută un utilizator după acest id în baza de date.
Dacă utilizatorul există și token-ul se potrivește cu ceea ce este în baza de date, se stochează datele lui în req.user și se apelează metoda next().
Dacă nu există niciun utilizator cu acest id sau token-urile nu se potrivesc, se returnează Unauthorized Error.
Middleware unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

# Pasul 4

Logout
Creează endpoint-ul /users/logout

Adaugă la această rută un middleware de verificare a token-ului.

În modelul User, se va căuta utilizatorul după \_id.
Dacă utilizatorul nu există, returnează Unauthorized Error.
În caz contrar, șterge token-ul pentru utilizatorul curent și returnează Success Response.
Logout request
GET /users/logout
Authorization: "Bearer {{token}}"
Logout unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
Logout success response
Status: 204 No Content
Pasul 5
Current User - obținerea datelor despre utilizator după token
Creează endpoint-ul /users/current

Adaugă la această rută un middleware de verificare a token-ului.

Dacă utilizatorul nu există, returnează Unauthorized Error.
În caz contrar, returnează Success Response.
Current user request
GET /users/current
Authorization: "Bearer {{token}}"
Current user unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
Current user success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"email": "example@example.com",
"subscription": "starter"
}

# Sarcină suplimentară (opțional)

Realizează paginarea pentru colecția de contacte (GET /contacts?page=1&limit=20).
Realizează filtrarea contactelor după câmpul favorite (GET /contacts?favorite=true).
Reînnoirea abonamentului pentru utilizator (subscription) printr-un endpoint PATCH /users. Abonamentul trebuie să aibă una dintre următoarele valori ['starter', 'pro', 'business'].

![1](https://i.ibb.co/Jm069sL/PATCH-favorite.png)
![2](https://i.ibb.co/wpZJY8S/POST-signup.png)
![3](https://i.ibb.co/CvT0rTS/POST-signup-email-In-Use.png)
![4](https://i.ibb.co/zPfwZbV/POST-login.png)
![5](https://i.ibb.co/82Zw1r7/GET-current.png)
![6](https://i.ibb.co/ZhsvF5D/GET-logout.png)
![7](https://i.ibb.co/tLp8VkV/GET-contacts.png)
![8](https://i.ibb.co/XFM6tGf/Get-contacts-By-Id.png)
![9](https://i.ibb.co/pPvfF4c/PUT-contact.png)
