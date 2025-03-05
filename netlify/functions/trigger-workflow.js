// trigger-workflow.js (Netlify Function)

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Allow CORS for the GitHub Pages domain or '*' for any domain
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS method for preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: JSON.stringify({ message: 'OK' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers,
    };
  }

  try {
    const { filePath, jsonContent } = JSON.parse(event.body);

    const githubToken = process.env.GITHUB_TOKEN; // Secret token stored securely in environment variables
    const githubRepo = 'target/retail-fraud-taxonomy-viewer';  // The GitHub repository name

    // Trigger GitHub Actions workflow using the GitHub API
    const response = await fetch(`https://api.github.com/repos/${githubRepo}/actions/workflows/netlify_json.yml/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: 'dev', // GitHub branch or tag that you want the workflow to run on
        inputs: {
          file_path: filePath,
          json_content: JSON.stringify(jsonContent), 
        },
      }),
    });

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Workflow triggered successfully' }),
        headers,
      };
    } else {
      const errorResponse = await response.json();
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to trigger workflow', details: errorResponse }),
        headers,
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      headers,
    };
  }
};

