# Express-Ejs avec BCrypt, Mysql8, Jwt, Cookie-Parser


## installation : 

Installation de la base de données, ajout d'un utilisateur non root :
```bash
docker-compose up --build
```

Puis : 
```bash
npm install
```


Tester l'application avant de la lancer :
```bash
npm run test
```
Si les tests sont lancés après un premier démarrage de l'application, la table testée aura un utilisateur et ne passera pas.  

Lancer l'application : 
```bash
node index.js
```

Il faut alors se rendre sur le localhost, le port est indiqué en console. 

## application : 

Les pages / et /secure sont les mêmes ; La page secure ne doit être accessible qu'une fois autentifié(e). Le front-ent sert uniquement de test simple, comme alternative à postman.  

Le token JWT est soit envoyé par headers en cas de single-page-application, soit envoyée par cookie.


