// src/utils/projectService.js
import { createClient } from 'contentful';

// Log environment variables for debugging
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

console.log('Contentful Configuration:', {
  spaceId: spaceId ? '✓ Set' : '✗ Missing',
  accessToken: accessToken ? '✓ Set' : '✗ Missing',
  environment: environment
});

if (!spaceId || !accessToken) {
  console.error('❌ Missing required Contentful environment variables. Please check your .env file.');
  console.log('Make sure you have the following in your .env file:');
  console.log('VITE_CONTENTFUL_SPACE_ID=your_space_id_here');
  console.log('VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here');
  console.log('VITE_CONTENTFUL_ENVIRONMENT=master (optional)');
}

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment
});

// Cache for content types
let contentTypesCache = null;

// Get all content types
const getContentTypes = async () => {
  if (contentTypesCache) return contentTypesCache;
  
  try {
    const response = await client.getContentTypes();
    contentTypesCache = response.items;
    console.log('✅ Successfully connected to Contentful');
    console.log('Available content types:', contentTypesCache.map(ct => ({
      id: ct.sys.id,
      name: ct.name,
      description: ct.description,
      displayField: ct.displayField,
      fields: ct.fields.map(f => ({
        id: f.id,
        name: f.name,
        type: f.type,
        required: f.required,
        localized: f.localized
      }))
    })));
    return contentTypesCache;
  } catch (error) {
    console.error('❌ Failed to get content types:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    return [];
  }
};

// Get projects using the first content type that has 'title' and 'description' fields
export async function getProjects(options = {}) {
  try {
    // First, get all content types
    const contentTypes = await getContentTypes();
    
    // Find a content type that looks like it contains projects
    const projectContentType = contentTypes.find(ct => 
      ct.fields.some(f => f.id === 'title') && 
      ct.fields.some(f => f.id === 'description')
    );
    
    if (!projectContentType) {
      console.error('❌ No suitable content type found for projects');
      console.log('Available content types:', contentTypes.map(ct => ({
        id: ct.sys.id,
        name: ct.name,
        fields: ct.fields.map(f => f.id)
      })));
      return [];
    }
    
    console.log(`Using content type: ${projectContentType.sys.id} (${projectContentType.name})`);
    
    // Get fields for this content type
    const fields = projectContentType.fields.map(f => f.id);
    
    // Log available fields for debugging
    console.log('Available fields in content type:', fields);
    
    // Log all available fields for debugging
    console.log('All available fields in content type:', fields);
    
    // Request all available fields that we might need
    const validFields = [
      'title', 
      'slug', 
      'description', 
      'technologies', 
      'featuredImage', 
      'gitHubUrl', 
      'liveDemoUrl',
      'content',
      'projectDate',
      'featured'
    ].filter(field => fields.includes(field));
    
    console.log('Will request these fields:', validFields);
    
    // Build the select parameter - always include sys.id and sys.type
    const select = `sys.id,sys.type,fields`;
    
    // Get the entries
    const response = await client.getEntries({
      content_type: projectContentType.sys.id,
      order: '-sys.createdAt',
      select,
      include: 2,
      ...options
    });
    
    console.log(`✅ Successfully fetched ${response.items.length} projects`);
    return response.items;
  } catch (error) {
    console.error('❌ Error fetching projects:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return [];
  }
}

export async function getProjectBySlug(slug) {
  try {
    // First, get all content types
    const contentTypes = await getContentTypes();
    
    // Find a content type that looks like it contains projects
    const projectContentType = contentTypes.find(ct => 
      ct.fields.some(f => f.id === 'title') && 
      ct.fields.some(f => f.id === 'description')
    );
    
    if (!projectContentType) {
      console.error('❌ No suitable content type found for projects');
      console.log('Available content types:', contentTypes.map(ct => ({
        id: ct.sys.id,
        name: ct.name,
        fields: ct.fields.map(f => f.id)
      })));
      return null;
    }
    
    console.log(`Using content type: ${projectContentType.sys.id} (${projectContentType.name})`);
    
    // Get fields for this content type
    const fields = projectContentType.fields.map(f => f.id);
    
    // Log available fields for debugging
    console.log('Available fields in content type:', fields);
    
    // Log all available fields for debugging
    console.log('All available fields in content type:', fields);
    
    // Request all available fields that we might need
    const validFields = [
      'title', 
      'slug', 
      'description', 
      'technologies', 
      'featuredImage', 
      'gitHubUrl', 
      'liveDemoUrl',
      'content',
      'projectDate',
      'featured'
    ].filter(field => fields.includes(field));
    
    console.log('Will request these fields:', validFields);
    
    // Build the select parameter - always include sys.id and sys.type
    const select = `sys.id,sys.type,fields`;
    
    // Get the entry
    const response = await client.getEntries({
      content_type: projectContentType.sys.id,
      'fields.slug': slug,
      limit: 1,
      select,
      include: 2
    });
    
    if (response.items && response.items.length > 0) {
      console.log(`✅ Successfully fetched project with slug '${slug}'`);
      return response.items[0];
    }
    
    console.log(`❌ No project found with slug '${slug}'`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching project with slug '${slug}':`, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return null;
  }
}