# Archaeological Artefact Finder

A full-stack portfolio project for searching and displaying archaeological and historical objects from public museum collections.

The application uses the Metropolitan Museum of Art Collection API to fetch artefact data and displays the results in a responsive React interface.

## Features

- Search for archaeological and historical objects
- Display artefacts in responsive cards
- View detailed information about each object
- Pagination with 20 results per page
- Loading animation with a themed hourglass image
- Error handling for unavailable or incomplete API data
- Responsive navigation bar
- Museum-inspired visual design

## Technologies

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express.js
- External REST API integration

### API
- The Metropolitan Museum of Art Collection API

## Current Status

The current version includes:
- artefact search
- paginated results
- detail pages
- favorite artefacts
- personal notes for saved artefacts
- MySQL database connection

## Planned Improvements

- Save artefacts as favorites
- Add MySQL database support
- Add personal notes to saved artefacts
- Improve filtering options
- Add search history
- Deploy the project as a live demo

## Project Purpose

This project was created as a portfolio project to combine archaeological interest with modern web development. It demonstrates API integration, React components, backend routing, pagination, error handling and responsive UI design.

## Installation

Clone the repository:

git clone https://github.com/laci528-creator/archaeological-artefact-finder.git

You can import the `database/init.sql` file in phpMyAdmin to create the required database and table.