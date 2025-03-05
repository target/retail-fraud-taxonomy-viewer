// trigger-workflow.js (Netlify Function)

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { filePath, jsonContent } = JSON.parse(event.body);
  
  const githubToken = process.env.GITHUB_TOKEN; // Secret token stored securely in environment variables
  const githubRepo = 'target/retail-fraud-taxonomy-viewer';  // The GitHub repository

  const response = await fetch(`https://api.github.com/repos/${githubRepo}/actions/workflows/netlify_json.yml/dispatches`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      ref: 'dev',
      inputs: {
        file_path: filePath,
        json_content: JSON.stringify(jsonContent), 
      }
    })
  });

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Workflow triggered successfully' }),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to trigger workflow' }),
    };
  }
};
