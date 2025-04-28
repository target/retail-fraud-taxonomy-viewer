
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

//Add Technique utils
export const formatDetails = (inputJson) => {
  const outputJson = inputJson.map(item => ({
    [item.key?.toLowerCase().split(' ').join("_")]: item.values
  }));
  return outputJson;
}

export const formatReferences = (inputJson) => {
  const outputJson = inputJson.map(item => ({
    [item.key]: item.values
  }));

  const formattedJson = outputJson.flatMap(obj =>
    Object.entries(obj).map(([key, value]) => ({
      name: key,
      link: value
    }))
  );

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