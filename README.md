# Job Portal API with Node.js, Express, and TypeScript

This repository contains the source code for a job portal API built using Node.js Express, and TypeScript. This README.md file provides an overview of the project and instructions on how to set it up and customize it for your own use.

[![Stars](https://img.shields.io/github/stars/nixrajput/job-portal-api-typescript?label=Stars&style=flat)][repo]
[![Forks](https://img.shields.io/github/forks/nixrajput/job-portal-api-typescript?label=Forks&style=flat)][repo]
[![Watchers](https://img.shields.io/github/watchers/nixrajput/job-portal-api-typescript?label=Watchers&style=flat)][repo]
[![Contributors](https://img.shields.io/github/contributors/nixrajput/job-portal-api-typescript?label=Contributors&style=flat)][repo]

[![GitHub last commit](https://img.shields.io/github/last-commit/nixrajput/job-portal-api-typescript?label=Last+Commit&style=flat)][repo]
[![GitHub issues](https://img.shields.io/github/issues/nixrajput/job-portal-api-typescript?label=Issues&style=flat)][issues]
[![GitHub pull requests](https://img.shields.io/github/issues-pr/nixrajput/job-portal-api-typescript?label=Pull+Requests&style=flat)][pulls]
[![GitHub Licence](https://img.shields.io/github/license/nixrajput/job-portal-api-typescript?label=Licence&style=flat)][license]

## Table of Contents

- [Job Portal API with Node.js, Express, and TypeScript](#job-portal-api-with-nodejs-express-and-typescript)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [Endpoints](#endpoints)
      - [Auth](#auth)
      - [Profile](#profile)
      - [Jobs](#jobs)
      - [Applications](#applications)
  - [Deployment](#deployment)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Sponsor Me](#sponsor-me)
  - [Connect With Me](#connect-with-me)

## Features

- User authentication and authorization.
- CRUD operations for users, jobs, and applications.
- JWT-based authentication for secure API access.
- RESTful API design.
- Written in TypeScript for enhanced maintainability and type safety.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You need to have the following software installed on your computer:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/) or [Yarn](https://yarnpkg.com/) package manager

### Installation

1. Star the repository.

2. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/nixrajput/job-portal-api-typescript.git
   ```

3. Navigate to the project directory:

   ```bash
   cd portfolio-nextjs
   ```

4. Install the project dependencies:

   If you're using npm:

   ```bash
   npm install
   ```

   If you're using pnpm:

   ```bash
   pnpm install
   ```

   If you're using Yarn:

   ```bash
   yarn install
   ```

### Configuration

Before running the application, you need to configure the environment variables. Copy the `.env.example` file to `.env.local` and fill in the necessary values.

```bash
cp .env.example .env.local
```

### Database Setup

Make sure you have a database configured and running. Update the database connection details in the `.env.local` file.

### Running the Application

Once the dependencies are installed and the configuration is set up, you can start the application by running:

```bash
npm run dev
#or
pnpm run dev
# or
yarn dev
```

By default, the application will run on port `3000`. You can change the port by modifying the `PORT` environment variable in the `.env.local` file.

## API Documentation

### Authentication

The API uses JWT (JSON Web Tokens) for authentication. To authenticate, send a POST request to `/api/auth/login` with a JSON payload containing the user's email and password.

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

If the credentials are valid, the API will respond with a JWT token, which should be included in subsequent requests as an Authorization header:

```json
Authorization: Bearer <token>
```

### Endpoints

#### Auth

- **POST /api/v1/auth/register**: Create a new account.
- **POST /api/v1/auth/login**: Login to the account.

#### Profile

- **GET /api/v1/profile/me**: Get profile details.
- **GET /api/v1/profile/:id**: Get profile details by ID.

#### Jobs

- **GET /api/v1/jobs**: Get all jobs.
- **POST /api/v1/jobs**: Create a new job. Requires authentication and admin privileges.
- **GET /api/v1/jobs/:id**: Get job details by ID.
- **PUT /api/v1/jobs/:id**: Update job details by ID. Requires authentication and admin privileges.
- **DELETE /api/v1/jobs/:id**: Delete job by ID. Requires authentication and admin privileges.

#### Applications

- **GET /api/v1/applications**: Get all job applications. Requires authentication and admin privileges.
- **POST /api/v1/applications**: Apply for a job. Requires authentication.
- **GET /api/applications/:id**: Get application details by ID. Requires authentication.
- **PUT /api/v1/applications/:id**: Update application details by ID. Requires authentication and admin privileges.
- **DELETE /api/v1/applications/:id**: Delete application by ID. Requires authentication and admin privileges.

## Deployment

This API can be deployed using various platforms such as Heroku, AWS, Google Cloud Platform, or your own server infrastructure. Here are some general steps to deploy the API:

1. **Prepare your environment**: Ensure that your deployment environment meets the requirements specified in the Prerequisites section.

2. **Build the application**: If necessary, build the TypeScript code into JavaScript. You can do this by running:

   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

3. **Configure environment variables**: Set up environment variables similar to how it's done in the local setup. Ensure that you provide appropriate values for your deployment environment.

4. **Deploy the application**: Deploy the built application to your chosen platform. Each platform may have its own deployment process. Refer to the documentation of your chosen platform for detailed instructions.

5. **Start the application**: Once deployed, start the application in your deployment environment. This might involve running a command similar to `npm start` or `yarn start`, depending on your setup.

6. **Monitor the deployment**: Monitor the deployed application for any issues. Make sure that it's running smoothly and handle any errors or performance issues as needed.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB (or any other database of your choice)

## Contributing

If you would like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Sponsor Me

- By sponsoring my efforts, you're not merely contributing to the development of my projects; you're investing in its growth and sustainability.
- Your support empowers me to dedicate more time and resources to improving the project's features, addressing issues, and ensuring its continued relevance in the rapidly evolving landscape of technology.
- Your sponsorship directly fuels innovation, fosters a vibrant community, and helps maintain the project's high standards of quality. Together, we can shape the future of the projects and make a lasting impact in the open-source community.
- Thank you for considering sponsoring my work!

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/nixrajput)

## Connect With Me

[![GitHub: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=GitHub&logoColor=333&link=https://www.github.com/nixrajput)][github]
[![Linkedin: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=LinkedIn&logoColor=blue&link=https://www.linkedin.com/in/nixrajput)][linkedin]
[![Instagram: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=Instagram&link=https://www.instagram.com/nixrajput)][instagram]
[![Twitter: nixrajput07](https://img.shields.io/badge/nixrajput-EFF7F6?logo=X&logoColor=333&link=https://x.com/nixrajput)][twitter]
[![Telegram: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=Telegram&link=https://telegram.me/nixrajput)][telegram]
[![Gmail: nkr.nikhi.nkr@gmail.com](https://img.shields.io/badge/nkr.nikhil.nkr@gmail.com-EFF7F6?logo=Gmail&link=mailto:nkr.nikhil.nkr@gmail.com)][gmail]

[github]: https://github.com/nixrajput
[twitter]: https://twitter.com/nixrajput07
[instagram]: https://instagram.com/nixrajput
[linkedin]: https://linkedin.com/in/nixrajput
[telegram]: https://telegram.me/nixrajput
[gmail]: mailto:nkr.nikhil.nkr@gmail.com

[repo]: https://github.com/nixrajput/job-portal-api-typescript
[issues]: https://github.com/nixrajput/job-portal-api-typescript
[pulls]: https://github.com/nixrajput/job-portal-api-typescript/pulls
[license]: https://github.com/nixrajput/job-portal-api-typescript/blob/master/LICENSE.md
