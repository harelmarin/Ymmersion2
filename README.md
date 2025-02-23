# 🚗 La Phocéenne - Gestion de Garage

## 📌 Description

**La Phocéenne** est une application de gestion de garage développée avec **NestJS**, **Prisma** et **React**.  
Elle permet de gérer les véhicules, les clients et les transactions de manière efficace.

## 🏗️ Technologies utilisées

- **Backend** : [NestJS](https://nestjs.com/) avec [Prisma ORM](https://www.prisma.io/)
- **Base de données** : MySQL
- **Frontend** : [React](https://react.dev/) avec Vite

---

## 🚀 Installation et lancement du projet

### 1️⃣ Prérequis

- **Node.js** (v16 ou +)
- **MySQL** (installé et configuré)

### 2️⃣ Cloner le projet

```bash
git clone https://github.com/harelmarin/Ymmersion2.git
cd ymmersion2
```

### 3️⃣ Configuration

1. **Variables d'environnement**
   - Copiez le fichier `.env.example` en `.env`
   - Configurez les variables selon votre environnement => Remplacer dbname par le nom de la base de donnée

```bash
cp .env.example .env
```

2. **Base de données**
   - Créez une base de données MySQL
   - Mettez à jour les informations de connexion dans le fichier `.env`

### 4️⃣ Installation des dépendances

```bash
# Installation des dépendances du backend
cd backend
npm install

# Installation des dépendances du frontend
cd ../frontend
npm install
```

### 5️⃣ Lancement du projet

1. **Backend**

```bash
cd backend
npm run start:dev
```

2. **Frontend**

```bash
cd frontend
npm run dev
```

### 6️⃣ Configuration de Prisma

1. **Générer le client Prisma**

```bash
cd backend
npx prisma generate
```

2. **Appliquer les migrations**

```bash
# Créer une nouvelle migration
npx prisma migrate dev --name init

# Appliquer les migrations existantes
npx prisma migrate deploy
```

3. **Visualiser la base de données (optionnel)**

```bash
# Ouvrir Prisma Studio
npx prisma studio
```

> **Note** : Après chaque modification du schéma Prisma (`schema.prisma`), n'oubliez pas de :
>
> 1. Créer une nouvelle migration : `npx prisma migrate dev`
> 2. Régénérer le client : `npx prisma generate`

4. **Ajouter les fakes datas**

- Importer dans phpMyAdmin le fichier /sql/insert_datas.sql pour avoir les insert de datas 
- Le compte admin : 
   - email : Admin@example.com
   - mot de passe : password 


## 📚 Documentation

L'API est documentée avec Swagger et accessible à l'adresse :

```
http://localhost:3000/api
```

## 🔑 Fonctionnalités principales

- Gestion des clients
- Gestion des véhicules
- Gestion des transactions
- Import et export d'excel pour gérer les véhicules
- Facturation

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contribution

- Yulan : https://github.com/yulannn
- Romain : https://github.com/romaingdr
- Marin : https://github.com/harelmarin
