import techniques from '../content/techniques.json';
const SCHEMES = 'schemes';
const MITIGATION = 'mitigation';
const SHOW_ALL = 'Show All';

// const contentFiles = require.context('../content/techniques', false, /\.json$/);
const contentFiles = import.meta.glob('../content/techniques/*.json', {
  eager: true,
});

const dataMap = Object.keys(contentFiles).reduce((map, filePath) => {
  const key = filePath
    .replace('../content/techniques/', '')
    .replace('.json', '');
  map[key] = contentFiles[filePath];
  return map;
}, {});

export const fetchAllTechniques = () => {
  return techniques;
};

export const filterDataMap = (selectedIcon, filterType) => {
  if (selectedIcon === SHOW_ALL) {
    return techniques;
  }

  if (filterType === SCHEMES) {
    return Object.keys(dataMap).reduce((filteredMap, key) => {
      if (dataMap[key].schemes.includes(selectedIcon)) {
        filteredMap[key] = dataMap[key];
      }
      return filteredMap;
    }, {});
  } else if (filterType === MITIGATION) {
    return Object.keys(dataMap).reduce((filteredMap, key) => {
      if (
        dataMap[key].details.some(
          (detail) =>
            detail.mitigation &&
            detail.mitigation.some((mit) => selectedIcon in mit),
        )
      ) {
        filteredMap[key] = dataMap[key];
      }
      return filteredMap;
    }, {});
  }
};

export const fetchTechnique = (technique) => {
  if (!technique) return undefined;
  const key = technique.toLowerCase().replace(/\s+/g, '_');
  return dataMap[key];
};

export const hasSubTechnique = (technique) => {
  const techData = fetchTechnique(technique);
  return techData && techData.sub_techniques.length > 0;
};

export const fetchTechniqueDetails = (technique) => {
  const techData = fetchTechnique(technique);
  return techData && techData.details;
};

export const fetchTechniqueReferences = (technique) => {
  const techData = fetchTechnique(technique);
  return techData && techData.sources;
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

export const fetchAllMitigations = () => {
  const allMitigationKeys = new Set();

  Object.keys(dataMap).forEach((key) => {
    dataMap[key].details.forEach((detail) => {
      if (Array.isArray(detail.mitigation)) {
        detail.mitigation.forEach((mitigationItem) => {
          Object.keys(mitigationItem).forEach((mitigationKey) => {
            allMitigationKeys.add(mitigationKey);
          });
        });
      }
    });
  });

  const uniqueMitigationKeys = [...allMitigationKeys].sort();
  return uniqueMitigationKeys;
};

export const fetchAllSchemes = () => {
  const uniqueSchemes = Object.keys(dataMap).reduce((schemesSet, key) => {
    dataMap[key].schemes.forEach((scheme) => schemesSet.add(scheme));
    return schemesSet;
  }, new Set());

  const uniqueSchemesArray = [...uniqueSchemes].sort();
  return uniqueSchemesArray;
};
