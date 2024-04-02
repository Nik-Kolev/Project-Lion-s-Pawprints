# Safari Tales

Safari Tales is a web application designed to provide users with detailed information about different routes and safaris. Built with Angular 17, this web app offers an intuitive user interface for planning your next adventure. Whether you're looking for a serene wildlife experience or an exhilarating excursion, Safari Tales is your go-to place.

## Table of Contents

-[](#)

## Technologies used

**Backend Stack**

[![Node.js](https://img.shields.io/badge/Node.js-✓-green)]() [![Express.js](https://img.shields.io/badge/Express.js-✓-lightgrey)]()[![Mongoose](https://img.shields.io/badge/Mongoose-5.13.2-orange)]() [![JWT](https://img.shields.io/badge/JWT-✓-blue)]() [![Bcrypt](https://img.shields.io/badge/Bcrypt-✓-blueviolet)]()

**Frontend Stack**

[![Angular](https://img.shields.io/badge/Angular-✓-blue)]()[![Supabase](https://img.shields.io/badge/Supabase-✓-yellowgreen)]()[![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)]()[![News API](https://img.shields.io/badge/News_API-✓-yellowgreen)]()[![RxJS](https://img.shields.io/badge/RxJS-✓-brightgreen)]() [![Ngx Cookie Service](https://img.shields.io/badge/Ngx_Cookie_Service-✓-red)]()[![Ngx](https://img.shields.io/badge/Ngx%20Toastr-✓-red)]()

## Project Overview

Safari Tales is an innovative online platform that transforms the way enthusiasts explore and book safaris. With its extensive selection and intuitive interface, it aims to offer users a seamless and delightful journey in discovering and inquiring about high-quality safari adventures. Safari Tales is dedicated to providing a hassle-free and enjoyable method for users to find and request more information on diverse safari experiences, catering to various interests and preferences.

## Admin Capabilities

### Product Management

Admins can effortlessly create new routes/safaris, edit existing listings, and delete em to keep the platform up-to-date.

## User Experience

### Product Interaction

Users can interact with safari listings by clicking to uncover comprehensive details, thereby enriching a community-centric platform. This engagement allows users to not only delve into the specifics of each safari, including obtaining quotes on pricing and other essentials but also aids in fostering an informed decision-making process for the community at large.

### Secure Authentication

Both admins and users benefit from secure authentication, ensuring a safe and personalized experience on the platform.

### Intuitive Interface

The platform’s intuitive design allows for easy navigation and interaction with the product offerings and features.

## Project Structure

- **_/Pawprints - BE /src_**: Contains the backend application built with Node.js and Express.

  - **/config**: Configuration files for the server.

  - **/controllers**: Controllers handling the business logic.

  - **/middlewares**: Guards for authentication and authorization.

  - **/models**: DB Models.

  - **/utils**: Utility functions and helper modules.

  - **/routes**: Express routes for handling API requests.

- **_/Pawprints - FE/src_**: Contains the frontend application built with Angular 17 - components, styles, and application logic.

## Installation and Running the Application

**Clone the Repository:**
You can clone the repository using the following command or download it as a ZIP file and extract it on your computer.

git clone https://github.com/Nik-Kolev/Project-Lion-s-Pawprints

**Server Setup**

Use the terminal to navigate to the project directory.

1. Navigate to Pawprints - BE

```bash
cd Pawprints - BE
```

2. Create new .env file in the server directory with the following information (fill it with your data)

```plaintext
DB_NAME
DB_CONNECTION
SECRET
PORT
```

3. Install Dependencies:

Install all the necessary dependencies by running the following command in your terminal:

```bash
npm install
```

4. Run the server:
   Start the server with this command:

```bash
npm run dev
```

**Client Setup**

Use the terminal to navigate to the project directory.

1. Navigate to Pawprints - FE

```bash
cd Pawprints - FE
```

2. Install all the necessary dependencies by running the following command in your terminal:

```bash
npm install
```

3. Start the client in development mode:

```bash
ng serve
```

4. Client setup is completed! Open the following link in your web browser: http://localhost:4200

## Platform Structure

### Home

**Navigation Bar** - Quick access to all sections of the platform.
**Carousel** - A rotating selection of amazing images of nature.
**Call to Action** - Encourages users to explore safari packages.
**Top rated destinations** - Showcases the most popular safari destinations based on user reviews.
**Latest Blog Posts** - Updates from the Safari Tales blog on travel tips, destination highlights, and conservation news.

### Safaris

**Catalog** - Browse through a comprehensive list of available safaris.

### Info & Contacts

**Information about the company** - Background information on Safari Tales, including our mission and vision.
**Contact information** - Direct lines of communication for inquiries, support, or feedback.

### Blog

**Latest news for safaris in Africa** - Articles and updates on safari adventures, wildlife conservation efforts, and destination spotlights.

### Create Safari

**Admin ownership is required** - A dedicated section for administrators to add new safari offerings, update existing ones.

### User Panel

**Login** - Secure access for returning users.
**Register** - New users can create an account.
**Logout** - Safely end your session.

## License

This project is licensed under the [MIT License](LICENSE).
