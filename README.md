# Archaeological Artefact Finder

This README is available in English and German.

Diese README-Datei ist auf Englisch und Deutsch verfügbar.

---

# English

## Archaeological Artefact Finder

A full-stack web application for searching and exploring archaeological and historical objects from the collection of The Metropolitan Museum of Art.

The application uses The Metropolitan Museum of Art Collection API to retrieve object data and presents the results in a responsive React interface.

Selected artefacts can be saved as favorites, stored in a MySQL database and supplemented with personal notes.

## Features

* Search for archaeological and historical objects
* Display search results in responsive cards
* Pagination based on 20 object IDs per page
* View detailed information about individual objects
* Support for museum records without available images
* Placeholder display for missing images
* Save selected artefacts as favorites
* Remove saved favorites
* Add and update personal notes
* MySQL-backed favorite storage
* Preserve search results and pagination state when returning from object details
* Loading states and error handling
* Error handling for unavailable or incomplete external API data
* Responsive navigation and layout
* Museum-inspired visual design
* SPA route fallback for direct links and page refreshes

## Search and Research

Records without images are intentionally included in the search results.

For archaeological and historical research, metadata such as object type, culture, period, date, material and dimensions can still be useful even when no digital image is available.

When an object does not provide an image, the application displays a placeholder while keeping the available metadata accessible.

## Technologies

### Frontend

* React
* Vite
* React Router
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API integration
* MySQL
* mysql2

### External API

* The Metropolitan Museum of Art Collection API

### Deployment

* Vercel – frontend
* Render – Node.js / Express backend
* Aiven – hosted MySQL database

## Architecture

```text
React frontend
     │
     │ HTTPS / REST API
     ▼
Node.js + Express backend
     │
     │ MySQL / TLS
     ▼
MySQL database

External museum data:
The Metropolitan Museum of Art Collection API
```

## Live Demo

The project is available here:

https://archaeological-artefact-finder11.vercel.app

The Favorites feature in the live demo uses a shared database for demonstration purposes. Saved favorites and notes are therefore visible to all visitors and may be changed or removed by other users.

The backend runs on a free hosting instance, so the first request after a period of inactivity may take longer while the service starts.

## Project Purpose

This project was created as a portfolio project to combine my background and interest in archaeology with modern web development.

The main goal was to build a complete full-stack application using React, Node.js, Express and MySQL while working with an external REST API, asynchronous requests, backend routing, pagination, database operations, state management and error handling.

## Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/laci528-creator/archaeological-artefact-finder.git
cd archaeological-artefact-finder
```

### 2. Create the database

Use the provided SQL file to create the required local database structure:

```text
database/init.sql
```

### 3. Configure environment variables

Create local `.env` files based on the provided `.env.example` files.

Backend example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=artefact_finder

DB_SSL_CA_PATH=

CLIENT_URL=http://localhost:5173
```

`DB_SSL_CA_PATH` can remain empty for a normal local MySQL installation. It is only required when connecting to a hosted database that uses a custom CA certificate.

Frontend example:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Install dependencies

Install the root development dependency:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

Return to the project root:

```bash
cd ..
```

### 5. Start the application

Start the frontend and backend together from the project root:

```bash
npm run dev
```

The frontend runs by default on:

```text
http://localhost:5173
```

The backend runs by default on:

```text
http://localhost:5000
```

## Possible Future Improvements

* Additional search and filtering options
* Optional search history
* Further API resilience and caching improvements

---

# Deutsch

## Archaeological Artefact Finder

Eine Full-Stack-Webanwendung zur Suche und Erkundung archäologischer und historischer Objekte aus der Sammlung des Metropolitan Museum of Art.

Die Anwendung verwendet die Collection API des Metropolitan Museum of Art, um Objektdaten abzurufen und die Ergebnisse in einer responsiven React-Oberfläche darzustellen.

Ausgewählte Objekte können als Favoriten gespeichert, in einer MySQL-Datenbank abgelegt und mit persönlichen Notizen ergänzt werden.

## Funktionen

* Suche nach archäologischen und historischen Objekten
* Darstellung der Suchergebnisse in responsiven Karten
* Seitennavigation auf Basis von 20 Objekt-IDs pro Seite
* Anzeige detaillierter Informationen zu einzelnen Objekten
* Unterstützung von Museumsdatensätzen ohne verfügbares Bild
* Platzhalter für Objekte ohne Bild
* Speichern ausgewählter Objekte als Favoriten
* Entfernen gespeicherter Favoriten
* Hinzufügen und Bearbeiten persönlicher Notizen
* Datenbankgestützte Speicherung der Favoriten mit MySQL
* Beibehaltung von Suchergebnissen und Seitennavigation beim Zurückkehren aus der Detailansicht
* Ladezustände und Fehlerbehandlung
* Fehlerbehandlung bei nicht verfügbaren oder unvollständigen API-Daten
* Responsive Navigation und Benutzeroberfläche
* Vom Museum inspiriertes Design
* Unterstützung direkter URLs und Seitenaktualisierungen bei React-Routen

## Suche und Recherche

Datensätze ohne Bilder werden bewusst nicht aus den Suchergebnissen ausgeschlossen.

Für archäologische und historische Recherchen können Metadaten wie Objekttyp, Kultur, Periode, Datierung, Material und Maße auch dann wertvoll sein, wenn kein digitales Bild verfügbar ist.

Wenn für ein Objekt kein Bild vorhanden ist, zeigt die Anwendung einen Platzhalter an und stellt die verfügbaren Metadaten weiterhin zur Verfügung.

## Verwendete Technologien

### Frontend

* React
* Vite
* React Router
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST-API-Integration
* MySQL
* mysql2

### Externe API

* Collection API des Metropolitan Museum of Art

### Deployment

* Vercel – Frontend
* Render – Node.js-/Express-Backend
* Aiven – gehostete MySQL-Datenbank

## Architektur

```text
React-Frontend
     │
     │ HTTPS / REST API
     ▼
Node.js + Express Backend
     │
     │ MySQL / TLS
     ▼
MySQL-Datenbank

Externe Museumsdaten:
The Metropolitan Museum of Art Collection API
```

## Live Demo

Das Projekt ist hier verfügbar:

https://archaeological-artefact-finder11.vercel.app

Die Favoritenfunktion der Live-Demo verwendet eine gemeinsame Datenbank zu Demonstrationszwecken. Gespeicherte Favoriten und Notizen sind daher für alle Besucher sichtbar und können von anderen Benutzern verändert oder gelöscht werden.

Das Backend läuft auf einer kostenlosen Hosting-Instanz. Daher kann die erste Anfrage nach längerer Inaktivität etwas länger dauern, während der Service gestartet wird.

## Ziel des Projekts

Dieses Projekt wurde als Portfolio-Projekt entwickelt, um meinen Hintergrund und mein Interesse an Archäologie mit moderner Webentwicklung zu verbinden.

Das Hauptziel war die Entwicklung einer vollständigen Full-Stack-Anwendung mit React, Node.js, Express und MySQL. Dabei wurden unter anderem eine externe REST API, asynchrone Datenabfragen, Backend-Routing, Seitennavigation, Datenbankoperationen, State Management und Fehlerbehandlung eingesetzt.

## Lokale Installation

### 1. Repository klonen

```bash
git clone https://github.com/laci528-creator/archaeological-artefact-finder.git
cd archaeological-artefact-finder
```

### 2. Datenbank erstellen

Mit der bereitgestellten SQL-Datei kann die benötigte lokale Datenbankstruktur erstellt werden:

```text
database/init.sql
```

### 3. Umgebungsvariablen konfigurieren

Lokale `.env`-Dateien können anhand der bereitgestellten `.env.example`-Dateien erstellt werden.

Beispiel für das Backend:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=artefact_finder

DB_SSL_CA_PATH=

CLIENT_URL=http://localhost:5173
```

`DB_SSL_CA_PATH` kann bei einer normalen lokalen MySQL-Installation leer bleiben. Die Variable wird nur benötigt, wenn eine gehostete Datenbank mit einem eigenen CA-Zertifikat verwendet wird.

Beispiel für das Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Abhängigkeiten installieren

Abhängigkeit im Projekt-Hauptverzeichnis installieren:

```bash
npm install
```

Frontend-Abhängigkeiten installieren:

```bash
cd client
npm install
```

Backend-Abhängigkeiten installieren:

```bash
cd ../server
npm install
```

Zurück zum Projekt-Hauptverzeichnis:

```bash
cd ..
```

### 5. Anwendung starten

Frontend und Backend können gemeinsam aus dem Projekt-Hauptverzeichnis gestartet werden:

```bash
npm run dev
```

Das Frontend läuft standardmäßig unter:

```text
http://localhost:5173
```

Das Backend läuft standardmäßig unter:

```text
http://localhost:5000
```

## Mögliche zukünftige Erweiterungen

* Zusätzliche Such- und Filtermöglichkeiten
* Optionaler Suchverlauf
* Weitere Verbesserungen bei API-Ausfallsicherheit und Caching