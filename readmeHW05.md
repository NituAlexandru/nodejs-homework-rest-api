Creează branch-ul hw05-avatars din master.

Creează un REST API pentru a lucra cu o colecție de contacte. Adaugă posibilitatea de a încărca un avatar utilizatorului folosind Multer.

# Pasul 1
Creează folderul public pentru stocarea resurselor statice. În acest folder, creează un folder avatars. Configurează framework-ul Express pentru a distribui fișierele statice din folderul public.

Plasează orice imagine dorești în folderul public/avatars și verifică dacă distribuția statică funcționează. Când accesezi URL-ul corespunzător, browser-ul va trebui să afișeze imaginea.

http://localhost:<port>/avatars/<numele fișierului cu extensia sa>

# Pasul 2
În modelul de utilizator, adaugă o nouă proprietate avatarURL pentru a stoca imaginea.

{
  ...
  avatarURL: String,
  ...
}
Folosește pachetul gravatar pentru a genera automat un avatar la înregistrarea unui nou utilizator după email.

# Pasul 3
La înregistrarea unui utilizator:

Creează un link către avatarul utilizatorului folosind gravatar.
Salvează URL-ul generat în câmpul avatarURL în timp ce se creează utilizatorul.

# Pasul 4
Adaugă posibilitatea de a actualiza avatarul utilizatorului prin crearea unui endpoint /users/avatars, metoda PATCH.

avatar upload from postman
# Request
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: fișierul încărcat

# Success Response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "aici va fi un link către imagine"
}

# Failed Request
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
Creează folderul tmp la rădăcina proiectului și salvează aici avatarul încărcat.
Procesează avatarul utilizând pachetul jimp și setează dimensiunile sale 250x250.
Mută avatarul utilizatorului din folderul tmp în folderul public/avatars și dă-i un nume unic pentru un utilizator specific.
Salvează URL-ul rezultat /avatars/<numele fișierului cu extensia sa> în câmpul avatarURL al utilizatorului.

![1](https://i.ibb.co/J22S41d/PATCH-Avatars.png)