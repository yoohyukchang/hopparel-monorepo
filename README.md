# Hopparel Monorepo

This is a monorepo that contains the client and server applications for the Hopparel website, a unique platform for Johns Hopkins University students to design custom university apparel.

- The client is a React app bootstrapped with Vite, incorporating the KonvaJS library for interactive design features.
- The server is a Nest.js application, handling backend processes including user authentication, design storage, and order management.

## Hopparel Website

Hopparel is an innovative platform that empowers Johns Hopkins University students to use their creativity in designing their own university apparel. It's an engaging and user-friendly website that makes the process of custom apparel design both fun and straightforward.

## Key Features
* **Interactive Design Interface:** Utilizing the KonvaJS library, the website offers a dynamic and intuitive interface for students to create and visualize their apparel designs in real-time.

* **Personal Design Repository:** Each user can save their works in their personal repository. They delete, edit, or make another design if they want to.

* **Customization Options:** Students can choose from a variety of apparel types and have the freedom to add text, graphics, and color schemes, making each piece of apparel truly unique.

* **Best Designs Ranking Feature:** For every designs users make, we ask them if they want this design to be publicly open. Publicly-open-designs are shown in 'Designs Ranking' page, where students can freely upvote the designs.

## Getting Started

To get started with developing or contributing to the Hopparel project, follow these steps:

1. **Prerequisites**: Make sure you have Git, Node, and PNPM (the new package manager for Node) installed. If you don't have PNPM, you can install it globally with `npm install -g pnpm`. Additionally, you need to have Docker set up and running to spin up a local Postgres server. If you're new to Docker, you can refer to [this helpful guide](https://docs.docker.com/get-started/).
2. **Repository Setup**: Clone the repository and navigate to the root folder in the terminal.
3. **Dependencies**: Run `pnpm install` to install the dependencies for both the client and server.
4. **Environment Configuration**: Add a `.env` file in each the `app` and `api` sub-folders, similar to their respective `.env.example` files, and fill in the required environment variables.
5. **Database Setup**: Run `pnpm docker:up` to initialize the Postgres server.
6. **Run Locally**: To start the server, run `pnpm start:api`. To start the client, run `pnpm start:app`. Alternatively, you can run `pnpm start:all` to start both the client and server applications.