# Examinationsuppgift - Trullo - Moa Sjögren

### Körguide:

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
