#  Strapi MCP (Model Context Protocol) Tool 🚀

## 📖 Project Overview

This tool provides a command-line interface (CLI) to interact with your Strapi Content Management System (CMS) instance. It allows you to automate various functionalities, such as listing content types, managing entries, and uploading media.

⚠️ **IMPORTANT DISCLAIMER**: This software has been developed with the assistance of AI technology. It is provided as-is and should NOT be used in production environments without thorough testing and validation. The code may contain errors, security vulnerabilities, or unexpected behavior. Use at your own risk for research, learning, or development purposes only.


## 🛠️ Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [npm](https://www.npmjs.com/)
*   A running Strapi instance


## 📦 Installation

There are two ways to install and use this tool:

### Method 1: Global Installation (Recommended)

This method installs the tool globally on your system, allowing you to run the `strapi-cms-mcp` command from any directory.

1.  **Install from npm:**
    ```bash
    npm install -g strapi-cms-mcp
    ```

2.  **Configuration:**
    After installing, you still need to create a `.env` file to store your Strapi URL and API token. The tool will look for this file in the directory where you run the `strapi-cms-mcp` command.

### Method 2: Local Installation (for development)

This method is recommended if you want to contribute to the development of the tool.

1.  **Clone this repository:**
    ```bash
    git clone https://github.com/Viz38/Strapi-CMS-MCP.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Strapi-CMS-MCP
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run locally:**
    You can run the tool using the `npm run strapi-cms-mcp --` command from within the project directory. For example:
    ```bash
    npm run strapi-cms-mcp -- list-content-types
    ```

5.  **Install globally from local source (optional):**
    If you want to run the `strapi-cms-mcp` command from any directory while still using your local version of the tool, you can install it globally from the local source:
    ```bash
    npm install -g .
    ```


## ⚙️ Configuration

To get this tool running, you need to configure your Strapi instance details and API token.

### 1. Create a `.env` file

Create a file named `.env` in the root of this project (`D:\Github\Strapi-mcp\`) with the following content:

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=YOUR_STRAPI_API_TOKEN
```

*   **`STRAPI_URL`**: Replace `http://localhost:1337` with the actual URL of your Strapi instance.
*   **`STRAPI_API_TOKEN`**: Replace `YOUR_STRAPI_API_TOKEN` with a valid Strapi API token.

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


## 🚀 Usage

You can run the commands using `strapi-cms-mcp <command>` if you installed it globally, or `npm run strapi-cms-mcp -- <command>` if you are running it from the project directory.

### `list-content-types`

Lists all available content types in your Strapi instance.

**Usage:**
```bash
strapi-cms-mcp list-content-types
```

### `get-entry <contentType> [id]`

Retrieves one or more entries from a given content type. If no `id` is provided, it will list all entries for the content type, with support for filtering, sorting, and pagination.

**Arguments:**
*   `<contentType>`: The API ID of the content type (e.g., `api::blog-post.blog-post`).
*   `[id]`: (Optional) The ID of the entry to retrieve.

**Options:**
*   `--filters <filters>`: Filter results (e.g., `'{"title":{"$contains":"search"}}'`).
*   `--sort <sort>`: Sort results (e.g., `'createdAt:desc'`).
*   `--populate <populate>`: Populate relations (e.g., `'category'`).
*   `--page <page>`: Page number for pagination.
*   `--pageSize <pageSize>`: Number of items per page.

**Usage Examples:**

*   **Get a single entry:**
    ```bash
    strapi-cms-mcp get-entry api::blog-post.blog-post 1
    ```

*   **List all entries for a content type:**
    ```bash
    strapi-cms-mcp get-entry api::blog-post.blog-post
    ```

*   **Filter entries:**
    ```bash
    strapi-cms-mcp get-entry api::blog-post.blog-post --filters '{"title":{"$contains":"search"}}'
    ```

*   **Sort entries:**
    ```bash
    strapi-cms-mcp get-entry api::blog-post.blog-post --sort 'createdAt:desc'
    ```

*   **Populate relations:**
    ```bash
    strapi-cms-mcp get-entry api::blog-post.blog-post --populate 'category'
    ```

*   **Paginate entries:**
    ```bash
    strapi-cms-mcp get-entry api::blog-post.blog-post --page 2 --pageSize 10
    ```

### `create-entry <contentType> '<data>'`

Creates a new entry for a given content type.

**Arguments:**
*   `<contentType>`: The API ID of the content type.
*   `<data>`: A JSON string containing the data for the new entry.

**Usage:**
```bash
strapi-cms-mcp create-entry api::blog-post.blog-post '{"title": "My new blog post", "body": "This is the content of my new blog post."}'
```

### `update-entry <contentType> <id> '<data>'`

Updates an existing entry for a given content type.

**Arguments:**
*   `<contentType>`: The API ID of the content type.
*   `<id>`: The ID of the entry to update.
*   `<data>`: A JSON string containing the data to update.

**Usage:**
```bash
strapi-cms-mcp update-entry api::blog-post.blog-post 1 '{"title": "My updated blog post"}'
```

### `delete-entry <contentType> <id>`

Deletes an entry from a given content type.

**Arguments:**
*   `<contentType>`: The API ID of the content type.
*   `<id>`: The ID of the entry to delete.

**Usage:**
```bash
strapi-cms-mcp delete-entry api::blog-post.blog-post 1
```

### `upload-media <filePath>`

Uploads a media file to Strapi.

**Arguments:**
*   `<filePath>`: The absolute or relative path to the file to upload.

**Usage:**
```bash
strapi-cms-mcp upload-media "C:\path\to\your\image.jpg"
```


## 🔌 Adding MCP to Vibe Coding Tools

Once you have published your `strapi-cms-mcp` tool to npm, you can integrate it with other popular CLI tools and AI assistants.

### Claude Code

To add your tool to Claude Code, you can create a `claude-tools.json` file in your project with the following content:

```json
{
  "mcpServers": {
    "strapi": {
      "command": "npx",
      "args": ["-y", "strapi-cms-mcp"]
    }
  }
}
```

### Gemini CLI

To use your tool with Gemini CLI, you can create a `gemini-cli.json` file with a similar configuration:

```json
{
  "tools": {
    "strapi": {
      "command": "npx",
      "args": ["-y", "strapi-cms-mcp"]
    }
  }
}
```

### Open CLI

For Open CLI, you can define a tool in your `open-cli.json` configuration:

```json
{
  "tools": {
    "strapi": {
      "command": "npx",
      "args": ["-y", "strapi-cms-mcp"]
    }
  }
}
```

### Cursor

To integrate with Cursor, you can add a custom command to your Cursor settings:

```json
{
  "cursor.customCommands": [
    {
      "name": "Strapi MCP",
      "command": "npx -y strapi-cms-mcp {command}",
      "prompt": "Enter a Strapi MCP command"
    }
  ]
}
```


## 🤔 Troubleshooting

*   **`401 Unauthorized` error:** This is the most common error and is almost always due to an issue with your `STRAPI_API_TOKEN`.
    *   Ensure the token is correct and has not expired.
    *   Verify that the token's associated role has the necessary permissions for the operation you are trying to perform (see "Create a Strapi API Token" section).
*   **`404 Not Found` error:**
    *   Check that the `STRAPI_URL` in your `.env` file is correct and that your Strapi server is running.
    *   Verify that the `contentType` and `id` you are using in the commands are correct.
*   **`ECONNREFUSED` error:** This means the tool could not connect to your Strapi server.
    *   Ensure your Strapi server is running.
    *   Check that the `STRAPI_URL` is correct.
    *   If you are running the tool in a different environment than your Strapi server, ensure that the server is accessible from the tool's environment (e.g., firewall rules, port forwarding).


## 🧩 Expanding Functionality

You can expand this tool by adding more commands to `index.js` and corresponding methods to `strapi-client.js`. The `commander.js` library makes it easy to add new commands, options, and arguments.


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
