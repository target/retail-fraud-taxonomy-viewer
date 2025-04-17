
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