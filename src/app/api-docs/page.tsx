// app/api-docs/page.jsx

'use client';

import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';

import 'swagger-ui-react/swagger-ui.css';
import YAML from 'yaml';

const ApiDocs = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        // Option 1: If using the public directory
        // const response = await fetch('/openapi.yml');

        // Option 2: If using the API route
        const response = await fetch('/api/openapi');

        if (!response.ok) {
          throw new Error('Failed to fetch OpenAPI specification');
        }

        const yamlText = await response.text();
        const specJson = YAML.parse(yamlText);
        setSpec(specJson);
      } catch (error) {
        console.error('Error fetching OpenAPI spec:', error);
      }
    };

    fetchSpec();
  }, []);

  if (!spec) {
    return <div>Loading API Documentation...</div>;
  }

  return <SwaggerUI spec={spec} />;
};

export default ApiDocs;
