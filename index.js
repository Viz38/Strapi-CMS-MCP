#!/usr/bin/env node

const { Command } = require('commander');
const strapiClient = require('./strapi-client');
const program = new Command();

program
  .name('strapi-cms-mcp')
  .description('A CLI tool to interact with your Strapi instance.')
  .version('1.0.0');

program
  .command('list-content-types')
  .description('List all available content types in your Strapi instance.')
  .action(async () => {
    console.log('Fetching content types from Strapi...');
    const contentTypes = await strapiClient.listContentTypes();

    if (contentTypes) {
      console.log('Available content types:');
      contentTypes.forEach(contentType => {
        console.log(`- ${contentType.uid}`);
      });
    } else {
      console.log('Could not fetch content types. Please check your Strapi configuration and ensure that the API token has the necessary permissions.');
    }
  });

program
  .command('get-entry <contentType> <id>')
  .description('Get a specific entry from a content type.')
  .action(async (contentType, id) => {
    console.log(`Fetching entry with id ${id} from ${contentType}...`);
    const entry = await strapiClient.getEntry(contentType, id);

    if (entry) {
      console.log('Entry found:');
      console.log(JSON.stringify(entry, null, 2));
    } else {
      console.log(`Could not fetch entry with id ${id} from ${contentType}. Please check the content type and id, and ensure that the API token has the necessary permissions.`);
    }
  });

program
  .command('create-entry <contentType> <data>')
  .description('Create a new entry in a content type. Data should be a JSON string.')
  .action(async (contentType, data) => {
    try {
      const jsonData = JSON.parse(data);
      console.log(`Creating new entry in ${contentType}...`);
      const entry = await strapiClient.createEntry(contentType, jsonData);

      if (entry) {
        console.log('Entry created successfully:');
        console.log(JSON.stringify(entry, null, 2));
      } else {
        console.log(`Could not create entry in ${contentType}. Please check the content type and data, and ensure that the API token has the necessary permissions.`);
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error.message);
    }
  });

program
  .command('update-entry <contentType> <id> <data>')
  .description('Update an existing entry in a content type. Data should be a JSON string.')
  .action(async (contentType, id, data) => {
    try {
      const jsonData = JSON.parse(data);
      console.log(`Updating entry with id ${id} in ${contentType}...`);
      const entry = await strapiClient.updateEntry(contentType, id, jsonData);

      if (entry) {
        console.log('Entry updated successfully:');
        console.log(JSON.stringify(entry, null, 2));
      } else {
        console.log(`Could not update entry with id ${id} in ${contentType}. Please check the content type, id, and data, and ensure that the API token has the necessary permissions.`);
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error.message);
    }
  });

program
  .command('delete-entry <contentType> <id>')
  .description('Delete an existing entry from a content type.')
  .action(async (contentType, id) => {
    console.log(`Deleting entry with id ${id} from ${contentType}...`);
    const entry = await strapiClient.deleteEntry(contentType, id);

    if (entry) {
      console.log('Entry deleted successfully:');
      console.log(JSON.stringify(entry, null, 2));
    } else {
      console.log(`Could not delete entry with id ${id} from ${contentType}. Please check the content type and id, and ensure that the API token has the necessary permissions.`);
    }
  });

program
  .command('upload-media <filePath>')
  .description('Upload a media file to Strapi.')
  .action(async (filePath) => {
    console.log(`Uploading media from ${filePath}...`);
    const result = await strapiClient.uploadMedia(filePath);

    if (result) {
      console.log('Media uploaded successfully:');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`Could not upload media from ${filePath}. Please check the file path and ensure that the API token has the necessary permissions.`);
    }
  });

program.parse(process.argv);
