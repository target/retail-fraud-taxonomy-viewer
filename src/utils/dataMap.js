import techniques from '../content/techniques.json';
const SCHEMES = 'schemes';
const MITIGATION = 'mitigation';
const DETECTION = 'detection';
const RISK_SCORE = 'risk_score';
const SHOW_ALL = 'Show All';

// const contentFiles = require.context('../content/techniques', false, /\.json$/);
const contentFiles = import.meta.glob('../content/techniques/*.json', {
  eager: true,
});

export let dataMap = Object.keys(contentFiles).reduce((map, filePath) => {
  const key = filePath
    .replace('../content/techniques/', '')
    .replace('.json', '');
  map[key] = contentFiles[filePath];
  return map;
}, {});

export const dataArray = Object.keys(contentFiles).reduce((arr, filePath) => {
  const content = contentFiles[filePath]['default'];
  arr.push(content);
  return arr;
}, []);

export const fetchAllTechniques = (customData) => {
  if (!customData) {
    return techniques;
  }
  else {
    return JSON.parse(localStorage.getItem('technique_table'));
  }
};

export const getUniqueTechniques = () => {
  let completeTechniques = []
  let customData = localStorage.getItem('technique_table')

  if (customData && customData.length > 0) {
    completeTechniques = JSON.parse(customData)
  } else {
    completeTechniques = techniques
  }

  const allTechniques = completeTechniques.flatMap(obj => Object.values(obj));
  const filteredValues = allTechniques.filter(val => val && val.trim() !== '');
  const uniqueValues = [...new Set(filteredValues)];
  return uniqueValues.sort((a, b) => a.localeCompare(b));
};

export const formDataMapfromLocalStorage = () => {
  const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];

  const dataMap = storedTechniques.reduce((acc, item) => {
    const key = item.name.toLowerCase().replace(/\s+/g, '_');
    acc[key] = item;
    return acc;
  }, {});

  return dataMap
}

export const filterDataMap = (selectedIcon, filterType) => {
  if (selectedIcon === SHOW_ALL) {
    return techniques;
  }

  if (filterType === SCHEMES) {
    dataMap = formDataMapfromLocalStorage()

    return Object.keys(dataMap).reduce((filteredMap, key) => {
      if (dataMap[key].schemes.includes(selectedIcon)) {
        filteredMap[key] = dataMap[key];
      }
      return filteredMap;
    }, {});
  } else if (filterType === MITIGATION) {
    dataMap = formDataMapfromLocalStorage()

    return Object.keys(dataMap).reduce((filteredMap, key) => {
      if (
        dataMap[key].mitigation.some((mit) => mit.type.includes(selectedIcon))
      ) {
        filteredMap[key] = dataMap[key];
      }
      return filteredMap;
    }, {});
  } else if (filterType === DETECTION) {
    dataMap = formDataMapfromLocalStorage()

    return Object.keys(dataMap).reduce((filteredMap, key) => {
      if (
        dataMap[key].detection.some((det) => det.type.includes(selectedIcon))
      ) {
        filteredMap[key] = dataMap[key];
      }
      return filteredMap;
    }, {});
  } else if (filterType === RISK_SCORE) {
    dataMap = formDataMapfromLocalStorage()

    const filteredDataMap = Object.keys(dataMap).reduce((filteredMap, key) => {
      if (dataMap[key].risk_score >= selectedIcon.minScore && dataMap[key].risk_score <= selectedIcon.maxScore) {
        filteredMap[key] = dataMap[key];
      }
      return filteredMap;
    }, {});

    return filteredDataMap;
  }
};

export const fetchTechnique = (technique, customData) => {
  if (!technique) return undefined;

  if (!customData) {
    if (!(technique !== null && typeof technique === 'object' && !Array.isArray(technique))) {
      const key = technique?.toLowerCase().replace(/\s+/g, '_');
      return dataMap[key];
    }
  } else {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];
    const formattedTechnique = technique.split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');

    const matchedTechnique = storedTechniques.find(item => item.name === formattedTechnique);
    return matchedTechnique
  }
};

export const hasSubTechnique = (technique, customData) => {
  if (!customData) {
    const techData = fetchTechnique(technique);
    return techData && techData.sub_techniques.length > 0;
  } else {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];
    const matchedTechnique = storedTechniques.find(item => item.name === technique);
    return matchedTechnique && matchedTechnique.sub_techniques.length > 0;
  }
};

export const fetchTechniqueDetails = (technique, customData) => {
  if (!customData) {
    const techData = fetchTechnique(technique);
    return techData
  } else {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];
    const matchedTechnique = storedTechniques.find(item => item.name === technique);
    return JSON.parse(matchedTechnique)
  }
};

export const fetchTechniqueReferences = (technique, customData) => {
  if (!customData) {
    const techData = fetchTechnique(technique);
    return techData && techData.references;
  } else {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];
    const matchedTechnique = storedTechniques.find(item => item.name === technique);
    return matchedTechnique && JSON.parse(matchedTechnique.references)
  }
};

export const formatData = (inputData) => {
  if (inputData) {
    // Check if inputData contains an underscore, if not, directly return capitalized word
    if (inputData.includes('_')) {
      return inputData
        .split('_')
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
    } else {
      return (
        inputData.charAt(0).toUpperCase() + inputData.slice(1).toLowerCase()
      );
    }
  }
  return '';
};

export const fetchAllMitigations = (viewCustomMode) => {
  const allMitigationKeys = new Map();

  if (!viewCustomMode) {
    Object.keys(dataMap).forEach((key) => {
      dataMap[key].mitigation.forEach((mitigationItem) => {
        // Normalize the type for uniqueness check (lowercase)
        const normalizedType = mitigationItem.type.trim().toLowerCase();

        // Only add the first occurrence of the normalized type
        if (!allMitigationKeys.has(normalizedType)) {
          allMitigationKeys.set(normalizedType, mitigationItem.type);
        }
      });
    });

    const uniqueMitigationKeys = [...allMitigationKeys.values()].sort();
    return uniqueMitigationKeys;
  } else {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];

    storedTechniques.forEach((technique) => {
      technique.mitigation.forEach((mitigationItem) => {
        // Normalize the type for uniqueness check (lowercase)
        const normalizedType = mitigationItem.type.trim().toLowerCase();

        // Only add the first occurrence of the normalized type
        if (!allMitigationKeys.has(normalizedType)) {
          allMitigationKeys.set(normalizedType, mitigationItem.type);
        }
      });
    });

    const uniqueMitigationKeys = [...allMitigationKeys.values()].sort();
    return uniqueMitigationKeys;
  }
};

export const fetchAllSchemes = (viewCustomMode) => {
  if (!viewCustomMode) {
    const uniqueSchemes = Object.keys(dataMap).reduce((schemesSet, key) => {
      dataMap[key].schemes.forEach((scheme) => schemesSet.add(scheme));
      return schemesSet;
    }, new Set());

    const uniqueSchemesArray = [...uniqueSchemes].sort();
    return uniqueSchemesArray;
  } else {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];

    const uniqueSchemes = storedTechniques.reduce((schemesSet, technique) => {
      technique.schemes.forEach((scheme) => schemesSet.add(scheme));
      return schemesSet;
    }, new Set());

    const uniqueSchemesArray = [...uniqueSchemes].sort();
    return uniqueSchemesArray;
  }
};

export const fetchAllDetections = (viewCustomMode) => {
  const allDetectionKeys = new Map();

  if (!viewCustomMode) {
    Object.keys(dataMap).forEach((key) => {
      dataMap[key].detection.forEach((detectionItem) => {
        // Normalize the type for uniqueness check (lowercase)
        const normalizedType = detectionItem.type.trim().toLowerCase();

        // Only add the first occurrence of the normalized type
        if (!allDetectionKeys.has(normalizedType)) {
          allDetectionKeys.set(normalizedType, detectionItem.type);
        }
      });
    });

    const uniqueDetectionKeys = [...allDetectionKeys.values()].sort();
    return uniqueDetectionKeys;
  } else {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];

    storedTechniques.forEach((technique) => {
      technique.detection.forEach((detectionItem) => {

        // Normalize the type for uniqueness check (lowercase)
        const normalizedType = detectionItem.type.trim().toLowerCase();

        // Only add the first occurrence of the normalized type
        if (!allDetectionKeys.has(normalizedType)) {
          allDetectionKeys.set(normalizedType, detectionItem.type);
        }
      });
    });

    const uniqueDetectionKeys = [...allDetectionKeys.values()].sort();
    return uniqueDetectionKeys;
  }
};

export const handleHideToggle = (hideToggleStatus) => {
  if (!hideToggleStatus) {
    const localStorageTechniques = JSON.parse(localStorage?.getItem('techniques'));
    const localStorageTechniquesTable = JSON.parse(localStorage?.getItem('technique_table'));

    // // Filter items where hide is false
    const visibleNames = localStorageTechniques
      .filter(t => t.hide === false)
      .map(t => t.name);

    const updatedArray = localStorageTechniquesTable.map(item => {
      const updatedItem = {};

      Object.entries(item).forEach(([key, val]) => {
        updatedItem[key] = visibleNames.includes(val) ? val : '';
      });

      return updatedItem;
    });
    return updatedArray
  }
  else {
    return techniques
  };
}
