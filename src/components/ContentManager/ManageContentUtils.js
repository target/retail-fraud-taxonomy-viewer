
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
      values: item.details
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
    details: item.values
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
  const outputArray = inputJson.map(item => item.value);
  return outputArray
}

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

export const hanleNewTactic = (techniqueName, tactics) => {
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





