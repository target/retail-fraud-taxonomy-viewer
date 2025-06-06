
//Edit Technique utils
export const transformData = (inputJson) => {
  if (inputJson) {
    return inputJson.map(data => ({ value: data }));
  }
  return [];
};

export const transformKeyValue = (inputJson) => {
  return inputJson.map(item => {
    const key = item.type;
    return {
      key: key,
      values: item.details,
      implemented: item.implemented
    };
  });
};

export const transformReference = (inputJson) => {
  return inputJson.map(item => {
    return {
      key: item["name"],
      values: [item["source"]]
    };
  });
}
export const formatDetails = (inputJson) => {
  const outputJson = inputJson.map(item => ({
    type: item.key,
    details: item.values,
    implemented: item.implemented
  }));
  return outputJson;
};

export const formatReferences = (inputJson) => {
  const formattedJson = inputJson.map(item => ({
    name: item.key,
    source: item.values
  }));
  return formattedJson;
};

export const formatFields = (inputJson) => {
  const hasEmptyValue = inputJson.some(item => !item.value);
  if (hasEmptyValue) return [];
  
  return inputJson.map(item => item.value);
};

export const consolidateData = (data) => {
  // Step 0: Remove rows where all keys have empty string values
  const filteredData = data.filter(row => {
    return Object.values(row).some(value => value !== '');
  });

  // Step 1: Collect all non-empty values for each column
  const nonEmptyValues = {};

  filteredData.forEach((row) => {
    Object.entries(row).forEach(([key, value]) => {
      if (value !== '') {
        if (!nonEmptyValues[key]) {
          nonEmptyValues[key] = [];
        }
        nonEmptyValues[key].push(value);
      }
    });
  });

  // Step 2: Reconstruct rows with consolidated non-empty values
  return filteredData.map((row) => {
    const newRow = {};

    Object.keys(row).forEach((key) => {
      if (nonEmptyValues[key] && nonEmptyValues[key].length > 0) {
        newRow[key] = nonEmptyValues[key].shift();
      } else {
        newRow[key] = '';
      }
    });

    return newRow;
  });
};



const downloadJSON = (data) => {
  const now = new Date();
  const timestamp = now.toISOString()
    .replace(/T/, '_')
    .replace(/:/g, '-')
    .replace(/\..+/, '');
  const baseName = 'techniques';
  const filename = `${baseName}_${timestamp}.json`;
  const jsonStr = JSON.stringify(data, null, 2); // pretty print with 2 spaces

  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const handleExport = () => {
  let jsonBody = {
    technique_table: JSON.parse(localStorage.getItem('technique_table')),
    techniques: JSON.parse(localStorage.getItem('techniques')),
  };

  downloadJSON(jsonBody);
}

export const handleNewTactic = (techniqueName, tactics) => {
  if (!Array.isArray(tactics) || !techniqueName) return;

  // Normalize tactics to snake_case: spaces and dashes -> _
  const normalize = (str) =>
    str.trim().toLowerCase().replace(/[\s-]+/g, '_');

  const normalizedKeys = tactics.map(normalize);

  const stored = localStorage.getItem('technique_table');
  if (!stored) return;

  let jsonArray;
  try {
    jsonArray = JSON.parse(stored);
  } catch (e) {
    console.error('Invalid JSON in localStorage:', e);
    return;
  }

  if (!Array.isArray(jsonArray) || jsonArray.length === 0) return;

  // Step 1: Normalize existing keys in every object
  const cleanedArray = jsonArray.map(obj => {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const normalizedKey = normalize(key);
      newObj[normalizedKey] = value;
    }
    return newObj;
  });

  // Step 2: Ensure all tactic keys exist
  const fullyUpdatedArray = cleanedArray.map(obj => {
    const newObj = { ...obj };
    normalizedKeys.forEach(key => {
      if (!(key in newObj)) {
        newObj[key] = '';
      }
    });
    return newObj;
  });

  // Step 3: Add `techniqueName` to first empty value of new keys
  const allKeys = new Set(Object.keys(cleanedArray[0])); // Check only against normalized keys now
  normalizedKeys.forEach(key => {
    if (!allKeys.has(key)) {
      const indexToUpdate = fullyUpdatedArray.findIndex(obj => !obj[key]);
      if (indexToUpdate !== -1) {
        fullyUpdatedArray[indexToUpdate][key] = techniqueName;
      }
    }
  });

  // Save result
  localStorage.setItem('technique_table', JSON.stringify(fullyUpdatedArray));
};

export const addTechniqueIfNotExists = (inputJSON, keysToUpdate, newTechnique) => {
  const normalize = (str) => str.trim().toLowerCase().replace(/[\s-]+/g, '_');
  const normalizedTechnique = newTechnique.trim();

  const targetKeys = Array.isArray(keysToUpdate) ? keysToUpdate : [keysToUpdate];

  const normalizedTargetKeys = targetKeys.map(normalize);

  // Check if the technique exists under any of the target keys
  const techniqueExists = inputJSON.some(obj =>
    Object.entries(obj).some(([key, value]) => {
      return normalizedTargetKeys.includes(normalize(key)) && value === normalizedTechnique;
    })
  );

  if (techniqueExists) {
    // If the technique already exists under any of the keys, return unchanged array
    return inputJSON;
  }

  // Schema keys (from the first item, or empty if array is empty)
  const schemaKeys = inputJSON[0] ? Object.keys(inputJSON[0]) : normalizedTargetKeys;

  // Build new row: set newTechnique for each matching key, empty string for others
  const newRow = {};
  schemaKeys.forEach((key) => {
    if (normalizedTargetKeys.includes(normalize(key))) {
      newRow[key] = newTechnique;
    } else {
      newRow[key] = "";
    }
  });

  // Return the updated array
  return [...inputJSON, newRow];
}






