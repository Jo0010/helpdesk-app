#  Helpdesk App

Mini application web développée en **React.js** permettant de gérer des tickets IT avec un système de commentaires interactif.

---

## Features

*  Création de tickets
*  Modification du contenu des tickets (inline edit)
*  Suppression de tickets
*  Changement de statut (open / closed)
*  Système de commentaires (style chat)

  * Ajout, modification et suppression
  * Raccourcis clavier (Enter / Escape)
* Persistance des données via API (JSON Server)
*  Interface dynamique et réactive

---

## Technologies utilisées

* React.js (Hooks : useState, useEffect, useRef)
* JavaScript (ES6+)
* JSON Server (simulation backend REST API)
* HTML / CSS (UI custom)

---

## Structure du projet

```
src/
│
├── api/
│   └── ticketsApi.js
│
├── components/
│   ├── TicketList.js
│   ├── TicketItem.js
│   └── CommentList.js
│
├── utils/
│   └── safe.js
│
├── App.js
```

---

## Installation & lancement

### 1. Cloner le projet

```bash
git clone https://github.com/TON-USERNAME/helpdesk-app.git
cd helpdesk-app
```

---

### 2. Installer les dépendances

```bash
npm install
```

---

### 3. Lancer le frontend (React)

```bash
npm start
```

---

### 4. Lancer le backend (JSON Server)

```bash
json-server --watch db.json --port 3001
```

---

##  Accès

* Frontend : http://localhost:3000
* API : http://localhost:3001/tickets

---

## Objectif du projet

Ce projet a été réalisé pour :

* Développer des compétences en React
* Comprendre la gestion d’état et des composants
* Manipuler une API REST (CRUD)
* Construire une interface utilisateur moderne type outil IT (Helpdesk)

---

## Améliorations possibles

*  Authentification utilisateur
*  Gestion des rôles (admin / user)
*  Ajout de timestamps sur les commentaires
*  Amélioration UI (dashboard, dark mode)
*  Déploiement (Vercel / Netlify)

---

## Auteur

Développé par Jo Gendarme
Projet réalisé dans un objectif d’apprentissage et de portfolio.

---
