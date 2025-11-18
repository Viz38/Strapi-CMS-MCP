# GEMINI.md - Strapi MCP Tool

## Project Overview

This project is a Node.js command-line interface (CLI) tool named `strapi-mcp`. It provides a command-line interface to interact with a Strapi Content Management System (CMS) instance. The tool is designed to automate various functionalities, such as listing content types, managing entries (CRUD operations), and uploading media.

The tool is built with the following technologies:
*   **Node.js**: The runtime environment.
*   **Commander.js**: A library for creating command-line interfaces in Node.js.
*   **axios**: A promise-based HTTP client for making requests to the Strapi API.
*   **dotenv**: A module for loading environment variables from a `.env` file.
*   **form-data**: A library for creating multipart/form-data streams, used for file uploads.

The project has a modular structure:
*   `index.js`: The main entry point of the CLI tool, where the commands are defined using `commander.js`.
*   `strapi-client.js`: A `StrapiClient` class that encapsulates the logic for interacting with the Strapi API.
*   `config.js`: A configuration file that loads the Strapi URL and API token from a `.env` file.

## Building and Running

### Installation

To install the project dependencies, run the following command in the project root directory:

```bash
npm install
```

### Configuration

Before running the tool, you need to create a `.env` file in the project root directory with the following content:

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=YOUR_STRAPI_API_TOKEN
```

Replace `http://localhost:1337` with the URL of your Strapi instance and `YOUR_STRAPI_API_TOKEN` with a valid Strapi API token. The API token needs to have the appropriate permissions for the operations you want to perform.

#### Quick Setup for Local Development

To quickly create a `.env` file with dummy credentials for local testing:

**For Windows (Command Prompt/PowerShell):**
```bash
echo STRAPI_URL=http://localhost:1337 > .env
echo STRAPI_API_TOKEN=dummy_token_for_local_dev >> .env
```

**For macOS/Linux (Bash/Zsh):**
```bash
echo "STRAPI_URL=http://localhost:1337" > .env
echo "STRAPI_API_TOKEN=dummy_token_for_local_dev" >> .env
```

Remember to replace `dummy_token_for_local_dev` with an actual Strapi API token with the correct permissions as described in the next section.

### Running Commands

You can run the commands using the `npm run strapi-mcp -- <command>` script defined in `package.json`.

**Available Commands:**

*   `list-content-types`: Lists all available content types in your Strapi instance.
    ```bash
    npm run strapi-mcp -- list-content-types
    ```

*   `get-entry <contentType> <id>`: Retrieves a specific entry from a given content type.
    ```bash
    npm run strapi-mcp -- get-entry api::blog-post.blog-post 1
    ```

*   `create-entry <contentType> '<data>'`: Creates a new entry for a given content type. The data must be a valid JSON string.
    ```bash
    npm run strapi-mcp -- create-entry api::blog-post.blog-post '{"title": "My new blog post", "body": "This is the content of my new blog post."}'
    ```

*   `update-entry <contentType> <id> '<data>'`: Updates an existing entry for a given content type.
    ```bash
    npm run strapi-mcp -- update-entry api::blog-post.blog-post 1 '{"title": "My updated blog post"}'
    ```

*   `delete-entry <contentType> <id>`: Deletes an entry from a given content type.
    ```bash
    npm run strapi-mcp -- delete-entry api::blog-post.blog-post 1
    ```

*   `upload-media <filePath>`: Uploads a media file to Strapi.
    ```bash
    npm run strapi-mcp -- upload-media "C:\path\to\your\image.jpg"
    ```

### Testing

There is no test suite configured for this project. The `test` script in `package.json` currently just echoes an error message.

## Development Conventions

*   **Code Style:** The code is written in JavaScript (Node.js) and follows a consistent style.
*   **Modularity:** The project is structured into modules with clear responsibilities (CLI, Strapi client, configuration).
*   **Error Handling:** Errors are handled using `try...catch` blocks, and informative messages are printed to the console.
*   **Configuration:** The use of a `.env` file for configuration is a good practice for managing sensitive information like API tokens and for making the tool easily configurable for different environments.
