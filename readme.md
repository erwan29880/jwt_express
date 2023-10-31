# sécurisation injection sql avec Express

Simples vérifications sql côté back-end :  
- helmet 
- classe de vérification de pattern  
- escape-html  

## installation : 

Aller sur la branche docker puis : 

```bash
docker-compose up --build
```  

Aller sur http://localhost 

## installation manuelle pour le développement (branche master) :  

```bash
docker-compose up --build
```  

Puis créer la base de données et les tables (fichiers sql.sql).  
Vérifier les ports de la base de données dans le docker-compose et dans le fichier mysql/pool.js.


```bash
npm install
```

```bash
npm run test
```

```bash
node index.js
```