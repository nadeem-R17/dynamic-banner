# Banner Management System

A full-stack web application for managing banner displays with real-time updates. This project includes a Node.js backend with Socket.IO and MySQL, and a React frontend with Material UI.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)

## Features

- Real-time banner updates using Socket.IO.
- Countdown timer for banners with time displayed in days, hours, minutes, and seconds.
- Admin dashboard for updating banner content, visibility, and links.
- Responsive design using React and Material UI.

## Demo

[Live Link](https://dynamic-banner-kl8h.onrender.com/)

## Technologies Used

### Frontend:
- React
- Material UI
- Axios

### Backend:
- Node.js
- Express.js
- Socket.IO
- MySQL

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- MySQL server installed and running.
- Git for version control (optional).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/dynamic-banner.git
   cd dynamic-banner
2. **Backend Setup**

Navigate to the backend directory:
   ```
   cd backend
  ```

Install the required dependencies:
```
npm install
```
Set up the .env file with your database and environment variables
```
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=banner_db
# PORT=3000
```
3. **Frontend Setup**
Navigate to the frontend directory:
```
cd frontend
```
Install the required dependencies:

```
npm install
```

### Running the Application
1. **Backend**
Start the Node.js server:
```
node index.js
```
2. **Frontend**
Start the React development server:
```
npm run dev
```

# API Documentation

## API Endpoints

### `GET /api/banner`

Retrieves the current banner data.

**Response:**

- `200 OK`: Returns the current banner data in JSON format.

### `PUT /api/banner`

Updates the banner data.

**Request Body:**

- `bannerData`: The new banner data to be updated.

**Response:**

- `200 OK`: Successfully updates the banner data.
- `400 Bad Request`: Invalid data format or missing fields.

## WebSocket Events

### `bannerData`

Broadcasts the current banner data to all connected clients.

**Payload:**

- The current banner data in JSON format.

### `updateBanner`

Triggered when the banner data is updated.

**Payload:**

- The updated banner data in JSON format.

**Clients should listen to this event to receive real-time updates when the banner data changes.**
