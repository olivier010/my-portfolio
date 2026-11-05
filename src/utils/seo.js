// src/utils/seo.js

/**
 * Updates document title, description, and canonical link dynamically for SPAs.
 */
export function setPageSEO({ title, description, canonicalPath }) {
  if (title) {
    document.title = title;
  }

  if (description) {
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', description);
  }

  if (canonicalPath !== undefined) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const normalizedPath = canonicalPath === '/' ? '/' : (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`);
    const fullUrl = `https://yvesfoex.me${normalizedPath}`;

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Also update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullUrl);
    }
  }
}
