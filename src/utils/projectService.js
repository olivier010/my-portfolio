// src/utils/projectService.js
import { getEntries } from './contentful';

export async function getProjects(options = {}) {
  try {
    const items = await getEntries('projects', {
      order: '-sys.createdAt',
      include: 2,
      ...options
    });
    return items || [];
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error);
    return [];
  }
}

export async function getProjectBySlug(slug) {
  try {
    const items = await getEntries('projects', {
      'fields.slug': slug,
      limit: 1,
      include: 2
    });
    return items && items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error(`Error fetching project with slug '${slug}':`, error);
    return null;
  }
}
