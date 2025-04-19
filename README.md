# Kelompok-2-SOA

## Table Of Contents
- [API Sederhana](#api-sederhana-crud)
- [API Kompleks](#api-kompleks)
- [API Cache](#api-cache)

## Case:  
Event Organizer Booking Application

## Application Name:
Memorika Organizing Web Application

## Members:  
2210511039 - Danendra Helmy Pratama  
2210511059 - Arvino Qiyamullail Ramli  
2210511091 - Dhi'Fan Razaqa  

**For detailed information about the project, check out our wiki [here](https://github.com/dhifanrazaqa/Kelompok-2-SOA/wiki)!**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dhifanrazaqa/Kelompok-2-SOA.git
   cd Kelompok-2-SOA
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your database credentials and other settings.

4. Generate Prisma client:

   ```bash
   npx prisma generate 
   ```

5. Run database migrations:
   
   ```bash
   npx prisma migrate dev --name "init"
   ```

6. Run database seeder:
   ```bash
   npm run seed
   ```
## Features  
### API Sederhana (CRUD)  
#### Auth  
- **POST** `/api/auth/register` — Register a new user  
- **POST** `/api/auth/login` — Login a user  

#### Checklists  
- **GET** `/api/checklists` — Get all checklists  
- **POST** `/api/checklists` — Create a new checklist  
- **GET** `/api/checklists/{id}` — Get checklist by ID  
- **PUT** `/api/checklists/{id}` — Update an existing checklist  
- **DELETE** `/api/checklists/{id}` — Delete a checklist by ID  

#### Document  
- **GET** `/api/documents` — Get all documents  
- **POST** `/api/documents` — Create a new document  
- **GET** `/api/documents/{id}` — Get document by ID  
- **PUT** `/api/documents/{id}` — Update an existing document  
- **DELETE** `/api/documents/{id}` — Delete a document by ID  

#### Events  
- **GET** `/api/events` — Get all events  
- **POST** `/api/events` — Create a new event  
- **GET** `/api/events/{id}` — Get event by ID  
- **PUT** `/api/events/{id}` — Update an existing event  
- **DELETE** `/api/events/{id}` — Delete an event by ID  

#### Order Events  
- **GET** `/api/event/order` — Get all order events  
- **POST** `/api/event/order` — Create a new order event  
- **GET** `/api/event/order/{id}` — Get order event by ID  
- **PUT** `/api/event/order/{id}` — Update an existing order event  
- **DELETE** `/api/event/order/{id}` — Delete an order event by ID  

#### Order Tickets  
- **GET** `/api/ticket/order` — Get all order tickets  
- **POST** `/api/ticket/order` — Create a new order ticket  
- **GET** `/api/ticket/order/{id}` — Get order ticket by ID  
- **PUT** `/api/ticket/order/{id}` — Update an existing order ticket  
- **DELETE** `/api/ticket/order/{id}` — Delete an order ticket by ID  

#### Organizations  
- **GET** `/api/organizer` — Get all organizations  
- **POST** `/api/organizer` — Create a new organization  
- **GET** `/api/organizer/{id}` — Get organization by ID  
- **PUT** `/api/organizer/{id}` — Update an organization by ID  
- **DELETE** `/api/organizer/{id}` — Delete an organization by ID  

#### Tickets  
- **GET** `/api/ticket` — Get all tickets  
- **POST** `/api/ticket` — Create a new ticket  
- **GET** `/api/ticket/{id}` — Get ticket by ID  
- **PUT** `/api/ticket/{id}` — Update a ticket by ID  
- **DELETE** `/api/ticket/{id}` — Delete a ticket by ID  

#### Users  
- **GET** `/api/users` — Get all users  
- **GET** `/api/users/{id}` — Get user by ID  
- **PUT** `/api/users/{id}` — Update user by ID  
- **DELETE** `/api/users/{id}` — Delete user by ID  

#### Venue  
- **GET** `/api/venue` — Get all venues  
- **POST** `/api/venue` — Create a new venue  
- **GET** `/api/venue/{id}` — Get venue by ID  
- **PUT** `/api/venue/{id}` — Update venue by ID  
- **DELETE** `/api/venue/{id}` — Delete venue by ID

### API Kompleks  
#### Events  
- **GET** `/api/events/{id}/tickets` — Get tickets for an event  
- **GET** `/api/events/{id}/checklists` — Get checklists for an event  
- **GET** `/api/events/{id}/documents` — Get documents for an event  
- **GET** `/api/events/{id}/participants` — Get participants for an event  
- **GET** `/api/events/popular` — Get most popular events  
- **GET** `/api/events/upcoming` — Get upcoming events  

#### Order Tickets  
- **GET** `/api/ticket/order/{id}/invoice` — Get invoice by order ticket ID  

#### Organization  
- **GET** `/api/organizer/{id}/events` — Get events managed by a specific organizer  
- **GET** `/api/organizer/{id}/dashboard` — Get organizer's dashboard data  
- **GET** `/api/organizer/{id}/event-status-summary` — Get summary of the event status for a specific organizer  
- **GET** `/api/organizer/{id}/venues` — Get venues associated with a specific organizer  
- **GET** `/api/organizer/{id}/top-event` — Get the top event for a specific organizer  
- **GET** `/api/organizer/{id}/all-tickets` — Get all tickets sold for events organized by a specific organizer  

#### Tickets  
- **GET** `/api/ticket/{id}/buyers` — Get all buyers for a specific ticket  

#### Users  
- **GET** `/api/users/{id}/tickets` — Get all tickets ordered by a specific user  
- **GET** `/api/users/{id}/organizer` — Get the organizer information of a specific user  
- **GET** `/api/users/{id}/order/tickets` — Get all tickets ordered by the user  
- **GET** `/api/users/{id}/order/events` — Get all events ordered by the user  

#### Venue  
- **GET** `/api/venue/{city}/events` — Get all events in a specific city by venue

### API NoSQL (Redis)
#### User Cache  
- **POST** `/api/cache/user` — Register user (cached)  
- **GET** `/api/cache/user/{id}` — Get user by ID (cached)  
- **DELETE** `/api/cache/user/{id}` — Delete cached user by ID  

#### Event Cache  
- **POST** `/api/cache/event` — Create event (cached)  
- **GET** `/api/cache/events` — Get all events (cached)  
- **GET** `/api/cache/event/{id}` — Get event by ID (cached)  
- **DELETE** `/api/cache/event/{id}` — Delete cached event by ID  
- **GET** `/api/cache/event/{id}/checklist` — Get checklist for an event (cached)  
- **GET** `/api/cache/event/{id}/document` — Get documents for an event (cached)  
- **GET** `/api/cache/event/popular` — Get popular events (cached)  
- **GET** `/api/cache/event/{id}/tickets` — Get tickets for an event (cached)  

#### Organizer Cache  
- **GET** `/api/cache/organizer/{id}` — Get organizer by ID (cached)  
- **GET** `/api/cache/organizer/{id}/top-event` — Get top event of organizer (cached)  

### Oauth & JWT
### Integrasi Third Party
### Rate Limiting & Throtling
### Security
### Dokumentasi
