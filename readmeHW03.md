# Pasul 1 
Creează un cont pe MongoDB Atlas. După aceea, în contul tău, creează un nou proiect și configurează un free cluster. În timpul configurării clusterul-ui, selectează provider-ul și regiunea ca în screenshot-ul de mai jos. Dacă selectezi o regiune prea îndepărtată, timpul de răspuns al serverului va fi mai mare.

# Pasul 2
Instalează MongoDB Compass pentru a lucra mai ușor cu baza de date MongoDB. Configurează conexiunea bazei de date din cloud folosind Compass. În MongoDB Atlas, nu uita să creezi un utilizator cu drepturi de administrator.

# Pasul 3
Folosind Compass, creează o bază de date db-contacts și în interiorul ei o colecție contacts. Ia link-ul către fișierul json și folosește Compass, pentru a importa conținutul fișierului în colecția contacts:

# Pasul 4
Folosește codul sursă din tema #2 și înlocuiește stocarea contactelor din fișierul json cu baza ta de date.

Scrie codul necesar pentru a crea o conexiune la MongoDB folosind Mongoose.
Dacă conexiunea e cu succes, afișează mesajul "Database connection successful".
Asigură-te că tratezi erorile de conectare, afișând un mesaj de eroare în consolă și încheind procesul folosind process.exit(1).
În funcțiile de gestionare a cererilor, înlocuiește codul pentru operațiile CRUD pe fișiere cu metodele Mongoose pentru a lucra cu colecția contacts în baza ta de date.
Modelul colecției contacts:

  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }

# Pasul 5
În contactele noastre a apărut un câmp suplimentar pentru starea favorite, care poate lua valoarea logică true sau false. Acesta indică dacă contactul respectiv este sau nu în lista de favorite. Trebuie să implementezi un nou router pentru actualizarea stării contactului.

@ PATCH /api/contacts/:contactId/favorite
Primește parametrul contactId.
Primește body în format json cu câmpul favorite actualizat.
Dacă body nu există, se returnează un json cu cheia {"message": "missing field favorite"} și status code 400.
Dacă datele din body sunt valide, se apelează funcția updateStatusContact(contactId, body) (scrie-o) pentru a actualiza contactul favorite în baza de date.
Ca rezultat al funcției, se returnează obiectul actualizat și status code 200. În caz contrar, se returnează un json cu cheia "message": "Not found" și status code 404.

REST API trebuie să suporte următoarele rute.

@ GET /api/contacts
Nu primește nimic.
Apelează funcția listContacts pentru a lucra cu fișierul json contacts.json.
Returnează o matrice cu toate contactele în format json cu status code 200.
![GET](https://i.ibb.co/zNYzcm7/hw-3-GET.png)

@ GET /api/contacts/:id
Nu primește body.
Primește parametrul id.
Apelează funcția getById pentru a lucra cu fișierul json contacts.json.
Dacă există un astfel de id, se returnează obiectul contact în format json cu status code 200.
Dacă nu există un astfel de id, se returnează un json cu cheia "message": "Not found" și status code 404.
![GET by ID](https://i.ibb.co/BynH8fp/hw-3-GET-ID.png)

@ POST /api/contacts
Primește body în formatul {name, email, phone}, unde toate câmpurile sunt obligatorii.
Dacă în body nu există vreun câmp ce este obligatoriu, atunci se returnează un json cu cheia {"message": "missing required name field"} și status code 400.
Dacă toate datele din body sunt în regulă, atunci se adaugă un identificator unic la obiectul de contact.
Apelează funcția addContact(body) pentru a salva contactul în fișierul contacts.json.
Ca rezultat al funcției, se returnează un obiect cu un id: {id, name, email, phone} și status code 201.
![POST](https://i.ibb.co/4pkbWKG/hw-3-POST.png)

@ DELETE /api/contacts/:id
Nu primește body.
Primește parametrul id.
Apelează funcția removeContact pentru a lucra cu fișierul json contacts.json.
Dacă există un astfel de id, se returnează un json în formatul {"message": "contact deleted"} și status code 200.
Dacă nu există un astfel de id, se returnează un json cu cheia "message": "Not found" și status code 404.
![DELETE](https://i.ibb.co/wCD0fK2/hw-3-DELETE.png)

@ PUT /api/contacts/:id
Primește parametrul id.
Primește body în format json cu valoarea actualizată a oricăror dintre câmpurile name, email și phone.
Dacă body nu există, se returnează un json cu cheia {"message": "missing fields"} și status code 400.
Dacă datele din body sunt valide, apelează funcția updateContact(contactId, body) (scrie-o) pentru a actualiza contactele din fișierul contacts.json.
Ca rezultat al funcției, se returnează obiectul actualizat și status code 200. În caz contrar, se returnează un json cu cheia "message": "Not found" și status code 404.
![PUT](https://i.ibb.co/F3Wfybp/hw-3-PUT.png)

@ PATCH /api/contacts/:contactId/favorite
Primește parametrul contactId.
Primește body în format json cu câmpul favorite actualizat.
Dacă body nu există, se returnează un json cu cheia {"message": "missing field favorite"} și status code 400.
Dacă datele din body sunt valide, se apelează funcția updateStatusContact(contactId, body) (scrie-o) pentru a actualiza contactul favorite în baza de date.
Ca rezultat al funcției, se returnează obiectul actualizat și status code 200. În caz contrar, se returnează un json cu cheia "message": "Not found" și status code 404.
![PATCH](https://i.ibb.co/F3Wfybp/hw-3-PATCH.png)

# Criterii de acceptare a temelor #2-6
Este creat un repository cu temele — REST API application.
La crearea repository-ului s-a folosit boilerplate.
Un pull-request (PR) cu tema corespunzătoare a fost trimisă mentorului pentru verificare (link către PR).
Codul corespunde cerințelor tehnice.
La execuția codului nu apar erori neprelucrate.
Numele variabilelor, proprietăților și metodelor încep cu o literă mică și sunt scrise cu CamelCase. Sunt folosite substantive în limba engleză.
Numele unei funcții sau metode conține un verb.
În cod nu există secțiuni comentate.
Proiectul funcționează corect în versiunea actuală LTS Node.


