# Strapi MCP (Model Context Protocol) Tool

## Project Overview

This tool provides a command-line interface (CLI) to interact with your Strapi Content Management System (CMS) instance. It allows you to automate various functionalities, such as listing content types, managing entries, and uploading media.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [npm](https://www.npmjs.com/)
*   A running Strapi instance

## Installation

1.  **Clone this repository** (if you haven't already).
2.  **Navigate to the project directory** in your terminal:
    ```bash
    cd D:\Github\Strapi-mcp
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

To get this tool running, you need to configure your Strapi instance details and API token.

### 1. Create a `.env` file

Create a file named `.env` in the root of this project (`D:\Github\Strapi-mcp\`) with the following content:

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=YOUR_STRAPI_API_TOKEN
```

*   **`STRAPI_URL`**: Replace `http://localhost:1337` with the actual URL of your Strapi instance.
*   **`STRAPI_API_TOKEN`**: Replace `YOUR_STRAPI_API_TOKEN` with a valid Strapi API token.

### 2. Create a Strapi API Token

It is crucial that your Strapi API token has the correct permissions to access the necessary APIs.

1.  **Log in to your Strapi admin panel.**
2.  Navigate to **Settings** -> **API Tokens**.
3.  Click on the **Create new API Token** button.
4.  In the form that appears:
    *   **Name:** Give it a descriptive name (e.g., "MCP Tool Access").
    *   **Description:** (Optional) "API token for the Strapi MCP tool".
    *   **Token duration:** Select **Unlimited**.
    *   **Token type:** Select **Custom**.
5.  In the **Permissions** section that appears:
    *   Find **"Content-Type Builder"** and ensure that **all permissions (find, findOne, create, update, delete)** are checked.
    *   Find **"Content Manager"** and ensure that **all permissions (find, findOne, create, update, delete)** are checked for all your content types.
    *   Find **"Upload"** and ensure that **all permissions (upload)** are checked.
6.  Click **Save**.
7.  **Copy the newly generated token immediately.** It will not be shown again.
8.  Paste this token into your `.env` file as the value for `STRAPI_API_TOKEN`.

## Usage

You can run the commands using `npm run strapi-mcp -- <command>`.

### `list-content-types`

Lists all available content types in your Strapi instance.

**Usage:**
```bash
npm run strapi-mcp -- list-content-types
```

**Example Output:**
```
Fetching content types from Strapi...
Available content types:
- plugin::upload.file
- plugin::upload.folder
- api::blog-post.blog-post
...
```

### `get-entry <contentType> <id>`

Retrieves a specific entry from a given content type.

**Arguments:**
*   `<contentType>`: The API ID of the content type (e.g., `api::blog-post.blog-post`).
*   `<id>`: The ID of the entry to retrieve.

**Usage:**
```bash
npm run strapi-mcp -- get-entry api::blog-post.blog-post 1
```

### `create-entry <contentType> '<data>'`

Creates a new entry for a given content type.

**Arguments:**
*   `<contentType>`: The API ID of the content type.
*   `<data>`: A JSON string containing the data for the new entry.

**Usage:**
```bash
npm run strapi-mcp -- create-entry api::blog-post.blog-post '{"title": "My new blog post", "body": "This is the content of my new blog post."}'
```

### `update-entry <contentType> <id> '<data>'`

Updates an existing entry for a given content type.

**Arguments:**
*   `<contentType>`: The API ID of the content type.
*   `<id>`: The ID of the entry to update.
*   `<data>`: A JSON string containing the data to update.

**Usage:**
```bash
npm run strapi-mcp -- update-entry api::blog-post.blog-post 1 '{"title": "My updated blog post"}'
```

### `delete-entry <contentType> <id>`

Deletes an entry from a given content type.

**Arguments:**
*   `<contentType>`: The API ID of the content type.
*   `<id>`: The ID of the entry to delete.

**Usage:**
```bash
npm run strapi-mcp -- delete-entry api::blog-post.blog-post 1
```

### `upload-media <filePath>`

Uploads a media file to Strapi.

**Arguments:**
*   `<filePath>`: The absolute or relative path to the file to upload.

**Usage:**
```bash
npm run strapi-mcp -- upload-media "C:\path\to\your\image.jpg"
```

## Expanding Functionality

You can expand this tool by adding more commands to `index.js` and corresponding methods to `strapi-client.js`. The `commander.js` library makes it easy to add new commands, options, and arguments.
