# Examinationsuppgift - Trullo - Moa Sjögren

## Körguide:

1. `npm install`
2. `touch .env`
3. Lägg till variblerna i .env:\
   `MONGODB_URI="<uri>"`\
   `PORT=<t.ex 3000>`\
   Dessa, plus en env-config-variabel som tystar dotenvs tips och tricks-meddelanden finns även i [.env.example.](.env.example)
4. `npm run dev`
5. Testa med exempelvis [Yaak](https://yaak.app/) eller Thunderclient.

**Exempelvis:**\
`POST` http://localhost:3000/api/tasks

**Request:**

```
{
    "title": "Handla",
    "description": "Bröd, mjölk, kaffe",
    "tags": ["hushåll", "mat"]
}
```

**Response:**

```
{
  "title": "Handla",
  "description": "Bröd, mjölk, kaffe",
  "status": "TO_DO",
  "assignedTo": null,
  "tags": [
    "hushåll",
    "mat"
  ],
  "_id": "68d3f3c97af331f3a7a4c1f6",
  "createdAt": "2025-09-24T13:36:09.970Z",
  "updatedAt": "2025-09-24T13:36:09.970Z",
  "__v": 0
}
```

## Teoretiska resonemang:

### Motivera ditt val av databas:

Jag har valt MongoDB, med Mongoose som ODM. Jag har i princip enbart jobbat med SQL-databaser tidigare, därför valde jag en NoSQL-databas den här gången. Dels för att öva och lära mig mer om NoSQL, dels för att jag upplever att setup och testning går snabbare och smidigare jämfört med SQL-databaser.

### Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen:

`express` Ramverk för Node, används bland annat för requests och middleware. \
`mongoose` ODM för enkel databashantering. \
`dotenv` Paket för konfiguration av .env-filer. \
`express-validator` Paket för datavalidering vid requests. \
`jsonwebtoken` Används för att skapa en token vid lyckad inloggning. \
`bcrypt` Används för att kunna hasha t.ex lösenord för säkrare hantering i databas. \
`cors` Används för att låta frontend/client skicka requests till backend/server.

### Redogör översiktligt hur applikationen fungerar:

Appen kan göra requests till databasen (MongoDB). Databasen innehåller två collections: Tasks och Users. CRUD-funktioner finns för både Tasks och Users.\
Utöver det finns bland annat dessa funktioner:

- En User kan tilldelas en Task, `assignedTo`.
- När en Tasks status ändras till DONE uppdateras fältet `finishedAt`.
- En User kan antingen vara USER eller ADMIN. Endast admin kan radera andra användare, detta valideras via [middleware](src/middleware/isAdmin.ts).
- Validering för Task-id och User-id, skapandet av ny User eller Task sker som middleware med express-validator.
- Det finns även en enkel [frontend](/client/src/App.tsx) (React, Vite) för visualisering av Tasks. För tillfället innehåller den ingen övrig funktionalitet. För att testa:

`touch .env.local` :

```
VITE_DB_URL=http://localhost:3000/api
```
