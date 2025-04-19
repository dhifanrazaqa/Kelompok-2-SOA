# Kelompok-2-SOA

## Table Of Contents
- [Case](#case)
- [Application Name](#application-name)
- [Members](#members)
- [Summary Of Features](#summary-of-features)
- [Installation](#installation)
- [Features](#features)

## Case
Event Organizer Booking Application

## Application Name
Memorika Organizing Web Application

## Members
2210511039 - Danendra Helmy Pratama  
2210511059 - Arvino Qiyamullail Ramli  
2210511091 - Dhi'Fan Razaqa  

**For detailed information about the project, check out our wiki [here](https://github.com/dhifanrazaqa/Kelompok-2-SOA/wiki)!**

## Summary Of Features
| Feature                         | Status                                      |
| ------------------------------- | ------------------------------------------- |
| API Sederhana                   | 46 API Endpoints ✅                         |
| API Kompleks                    | 19 API Endpoints ✅                         |
| API NoSQL                       | 13 API Endpoints ✅                         |
| Frontend                        | ❌                                          |
| Service Worker                  | ❌                                          |
| OAuth & JWT                     | ✅                                          |
| Integrasi 3rd Party             | 4 Service ✅                                |
| Rate Limiting & Throttling      | ✅                                          |
| Security                        | ✅                                          |
| Dokumentasi                     | Function, Inline, & Swagger ✅              |

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
<img src="https://github.com/user-attachments/assets/c39dd2cf-4476-4fdf-881b-6c9b95cf2a45" width="500">

For authentication and authorization, we are using JWT with the OAuth 2.0 flow. Once the client is successfully authenticated and authorized, the authorization server issues a JWT (JSON Web Token) as an access token, which securely contains user and permission information. The client then includes this token in each request to access protected resources, allowing the server to validate the token without querying a database. We also implement Role-Based Access Control (RBAC). There are three roles in this application: Admin, Organizer, and Participant. The Admin can control and access everything; the Organizer can manage their events, documents, checklists, and venues; and the Participant can only view events and order tickets.

### Integrasi Third Party
#### Cloudinary
**Cloudinary** is a cloud-based media management service that allows developers to easily upload, store, transform, optimize, and deliver images and videos. It automatically handles resizing, cropping, format conversion, and compression through simple URL-based transformations, ensuring fast and efficient delivery via global CDNs. In this project, we are using Cloudinary to store documents related to events. Each event has its own documents, which can be published by either an Organizer or an Admin.  
We are using it at this endpoint: **POST** `/api/documents` — to create a new document, which can accept a file with a maximum size of 5MB.

#### Mailgun
**Mailgun** is a cloud-based email delivery service that allows developers to send, receive, and track emails through APIs. In sandbox mode, Mailgun can only send emails to specific, authorized email addresses for testing purposes. In this project, we are using Mailgun to send ticket confirmation emails after a ticket order is created through the **POST** `/api/ticket/order` endpoint.

#### Google Map Static API
**Google Maps Static API** is a service that allows developers to generate a map image based on specific coordinates or locations, which can be embedded directly into websites or applications without using interactive maps. In this project, we are using the Google Maps Static API on the venue endpoint. For example, when calling **GET** `/api/venue/{id}` to retrieve venue details, the response also includes a `locationImage` — which is a URL for a static map image generated using the Google Maps API based on the venue's latitude & longitude.

#### PDFKit
**PDFKit** is a JavaScript library that allows developers to create and generate PDF documents directly from code, making it easy to build custom PDFs with dynamic content like text, images, and tables. In this project, we are using PDFKit on the **GET** `/api/ticket/order/{id}/invoice` endpoint to generate a PDF invoice, which contains the user’s order details for the ticket they purchased.

### Rate Limiting & Throtling
**Rate limiting** and **throttling** are techniques used to control the number of requests a client can make to a server, helping to prevent abuse and reduce server overload. In this project, we apply rate limiting and throttling to all endpoints. The rate limit is set to a maximum of **100 requests per 15 minutes per IP address**, and throttling adds a **500ms delay to each request after the first 50 requests** within the same time window, ensuring fair usage and improving overall system stability.
### Security
**We are following the OWASP Top Ten, which is a regularly updated list of the 10 most critical web application security risks.**

| OWASP Aspect                          | Implementation                                                                 |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| Broken Authentication                | JWT tokens expire after 30 minutes.                                            |
| Sensitive Data Exposure              | Using Bcrypt to hash passwords.                                               |
| Broken Access Control                | Role-Based Access Control (RBAC) with 3 roles: Admin, Organizer, and Participant. |
| Injection                             | Using Prisma ORM, which does not use raw SQL queries.                        |
| Security Misconfiguration            | Closing unnecessary ports and removing the X-Powered-By header.               |
| Cross-Site Scripting (XSS)           | Implementing Helmet, which automatically sets security headers to prevent XSS. |
| Cross-Site Request Forgery (CSRF)    | Not needed because there are no HTML forms and we are already using JWT tokens. |
| Insufficient Logging & Monitoring    | Logging with Winston & Morgan; all logs are saved in the log folder.          |
| Insecure Deserialization             | Validating every incoming request body using express-validator.              |
| API Security                         | Implementing Rate Limiting & Throttling.                                      |

### Dokumentasi
We are documenting every function in the project, including inline comments where necessary, to ensure clarity and easy understanding. Additionally, we have implemented Swagger for detailed API documentation, which can be accessed at [http://localhost:3000/api-docs](http://localhost:3000/api-docs). This provides an interactive interface to explore and test the API endpoints.
