## Campus Events Backend

A lightweight backend for managing campus events, organizers, admins, and students. Built with NestJS and TypeScript to provide a modular, testable REST API for event discovery, registration, saved events, and notifications.

### Student module role

- Handles student registration and authentication.
- Provides endpoints to query and filter events.
- Manages student profiles and updates.
- Supports saving/unsaving events and retrieving saved events.
- Integrates with notification services to inform students about event updates.

### Key features

- RESTful API for events, organizers, and admin operations
- Role-based authentication and authorization (Admin / Organizer / Student)
- Student event saving/bookmarking and profile management
- Validation pipes and DTOs for robust request handling
- Notifications support (webhooks / Pusher integration)

### Tech stack

- Node.js
- NestJS (TypeScript)
- Postman (testing)
- Supabase / JWT (authentication helpers present)
- Pusher (real-time notifications — `pusher.js` present)
- bcrypt for password hashing

