# Accommodation Service

## Overview

The Accommodation Service is responsible for managing accommodations, accommodation types, and amenities for the TourHub application. This service provides RESTful API endpoints to create, read, update, and delete data related to accommodations.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Accommodations](#accommodations)
  - [Accommodation Types](#accommodation-types)
  - [Amenities](#amenities)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository: `git clone git@github.com:hasithar/tourhub-accomodation-service.git`
2. Change directory: `cd tourhub-accommodation-service`
3. Install dependencies: `npm install`

## Configuration

Use environment variables to configure the service.

1. Copy the env.example file to .env `cp env.example .env`
2. Update the .env file with your specific configuration settings.

## Usage

1. Start the service: `npm start`
2. The service will be running at `http://localhost:4000`.

## API Endpoints

### Accommodations

- `GET /api/accommodations`

  - Fetch all accommodations.

- `GET /api/accommodations/:id`

  - Fetch a single accommodation by ID.

- `POST /api/accommodations`

  - Create a new accommodation.

- `PATCH /api/accommodations/:id`

  - Update an existing accommodation by ID.

- `DELETE /api/accommodations/:id`
  - Delete an accommodation by ID.

### Accommodation Types

- `GET /api/accommodation-types`

  - Fetch all accommodation types.

- `GET /api/accommodation-types/:id`

  - Fetch a single accommodation type by ID.

- `POST /api/accommodation-types`

  - Create a new accommodation type.

- `PATCH /api/accommodation-types/:id`

  - Update an existing accommodation type by ID.

- `DELETE /api/accommodation-types/:id`
  - Delete an accommodation type by ID.

### Amenities

- `GET /api/amenities`

  - Fetch all amenities.

- `GET /api/amenities/:id`

  - Fetch a single amenity by ID.

- `POST /api/amenities`

  - Create a new amenity.

- `PATCH /api/amenities/:id`

  - Update an existing amenity by ID.

- `DELETE /api/amenities/:id`
  - Delete an amenity by ID.

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
