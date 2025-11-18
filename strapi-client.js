const axios = require('axios');
const config = require('./config');
const fs = require('fs');
const FormData = require('form-data');

class StrapiClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.strapiUrl,
      headers: {
        Authorization: `Bearer ${config.strapiApiToken}`,
      },
    });
  }

  async listContentTypes() {
    try {
      const response = await this.axiosInstance.get('/api/content-type-builder/content-types');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching content types:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error('Full error object:', error);
      }
      return null;
    }
  }

  async getEntry(contentType, id) {
    try {
      const response = await this.axiosInstance.get(`/api/${contentType}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching entry with id ${id} from ${contentType}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error('Full error object:', error);
      }
      return null;
    }
  }

  async createEntry(contentType, data) {
    try {
      const response = await this.axiosInstance.post(`/api/${contentType}`, { data });
      return response.data.data;
    } catch (error) {
      console.error(`Error creating entry in ${contentType}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error('Full error object:', error);
      }
      return null;
    }
  }

  async updateEntry(contentType, id, data) {
    try {
      const response = await this.axiosInstance.put(`/api/${contentType}/${id}`, { data });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating entry with id ${id} in ${contentType}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error('Full error object:', error);
      }
      return null;
    }
  }

  async deleteEntry(contentType, id) {
    try {
      const response = await this.axiosInstance.delete(`/api/${contentType}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting entry with id ${id} from ${contentType}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error('Full error object:', error);
      }
      return null;
    }
  }

  async uploadMedia(filePath) {
    try {
      const form = new FormData();
      form.append('files', fs.createReadStream(filePath));
      const response = await this.axiosInstance.post('/api/upload', form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error uploading media from ${filePath}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else {
        console.error('Full error object:', error);
      }
      return null;
    }
  }
}

module.exports = new StrapiClient();
