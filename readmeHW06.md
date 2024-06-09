Creează branch-ul hw06-email din master.

Creează un REST API pentru a lucra cu o colecție de contacte. Adaugă o verificare a e-mailului după ce utilizatorul se înregistrează utilizând serviciul SendGrid.

Cum trebuie să funcționeze procesul de verificare?
După înregistrare, utilizatorul trebuie să primească un e-mail la adresa specificată în timpul înregistrării, cu un link pentru a-și verifica adresa de e-mail.
Accesând pentru prima dată linkul din e-mailul primit, utilizatorul trebuie să primească un răspuns cu status code 200, ceea ce va însemna verificarea cu succes a e-mailului.
Accesând din nou link-ul, utilizatorul trebuie să primească o eroare cu status code 404.
# Pasul 1
Pregătirea integrării cu SendGrid API
Înregistrează-te pe SendGrid.
Creează un email-sender. Pentru a face acest lucru, în panoul de administrare SendGrid, accesează meniul "Marketing" din submeniul "Senders" și dă click pe butonul "Create New Sender" din colțul din dreapta sus. Completează câmpurile obligatorii din formularul afișat și salvează.
Rezultatul trebuie să fie similar cu imaginea de mai jos, cu excepția adresei de e-mail, care va fi a ta:

sender
La adresa de e-mail specificată, vei primi un e-mail de verificare (verifică și în folderul spam dacă nu găsești e-mailul). Dă click pe link și finalizează procesul de verificare. Rezultatul ar trebui să fie similar cu imaginea de mai jos:

sender
Acum trebuie să creezi un token. Selectează meniul "Email API", după care submeniul "Integration Guide". Selectează "Web API".

api key
În continuare selectează Node.js.

api key
La al treilea pas trebuie să dai un nume token-ului. De exemplu "systemcats", apoi apasă butonul de generare pentru a genera token-ul. Copiază acest token (este important, deoarece nu vei putea să-l recuperezi ulterior). După ce ai încheiat procesul de creare a token-ului, rezultatul ar trebui să fie similar cu imaginea de mai jos:

api key
Token-ul trebuie adăugat la fișierul .env din proiectul tău.

# Pasul 2
Crearea unui endpoint pentru verificarea e-mailului
Adaugă la modelul User două câmpuri: verificationToken și verify. Valoarea false în câmpul verify va însemna că e-mailul utilizatorului nu a fost încă verificat.

{
verify: {
type: Boolean,
default: false,
},
verificationToken: {
type: String,
required: [true, 'Verify token is required'],
},
}
Creează un GET endpoint /users/verify/:verificationToken, unde cu ajutorul parametrului verificationToken vei căuta un utilizator în modelul User.
Dacă utilizatorul cu acel token nu a fost găsit, este necesar să se returneze Error 'Not Found'.
Dacă utilizatorul a fost găsit, setează null pentru verificationToken, iar câmpul verify setează-l la true în documentul utilizatorului și returnează Success Response.
Verification request
GET /auth/verify/:verificationToken
Verification user Not Found
Status: 404 Not Found
ResponseBody: {
message: 'User not found'
}
Verification success response
Status: 200 OK
ResponseBody: {
message: 'Verification successful',
}
# Pasul 3
Adăugarea unui sender de e-mailuri cu un link de verificare către utilizatori
La momentul înregistrării unui utilizator, urmează acești pași:

Creează un verificationToken pentru utilizator și înregistrează-l în baza de date. Pentru a genera un token, poți utiliza pachete precum uuid sau nanoid.
Trimite un e-mail către adresa electronică a utilizatorului, furnizând un link pentru verificarea adresei de e-mail (/users/verify/:verificationToken).
Trebuie să se țină cont de faptul că utilizatorul nu va putea să se autentifice până când adresa lui de e-mail nu a fost verificată.
# Pasul 4
Adăugarea funcționalității de trimitere a unui e-mail repetat utilizatorului cu link de verificare
Este necesar să se anticipeze cazul în care utilizatorul ar putea șterge accidental e-mailul de verificare sau acesta ar putea să nu ajungă din diverse motive la destinatar. De asemenea, trebuie să gestionăm situații în care serviciul nostru de trimitere a e-mailurilor ar putea întâmpina erori în timpul procesului de înregistrare.

@ POST /users/verify/
Primește body în format { email }.
Dacă în body nu este un câmp obligatoriu email, se returnează un json cu cheia {"message": "missing required field email"} și status code 400.
Dacă body este valid, trimite un e-mail cu verificationToken la adresa electronică specificată, dar numai dacă utilizatorul nu este verificat.
Dacă utilizatorul a fost deja verificat, trimite un json cu cheia { message: "Verification has already been passed"} status code 400 Bad Request.
Resending an email request
POST /users/verify
Content-Type: application/json
RequestBody: {
"email": "example@example.com"
}
Resending an email validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Eroare de la librăria Joi sau o altă librărie de validare>
Resending an email success response
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
"message": "Verification email sent"
}
Resend email for verified user
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
message: "Verification has already been passed"
}
NOTĂ
Ca alternativă la pachetul SendGrid, se poate utiliza nodemailer.

![1](https://i.ibb.co/VDgnGs8/POST-Signup.png)
![1](https://i.ibb.co/cv4KKZM/POST-Verify.png)
