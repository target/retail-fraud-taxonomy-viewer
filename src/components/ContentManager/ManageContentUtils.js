
//Edit Technique utils
export const transformData = (inputJson) => {
    if (inputJson) {
      return inputJson.map(data => ({ value: data }));
    }
    return [];
  };

export const convertSnakeToTitle = (str) => {
  if(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }
};

export const transformKeyValue = (inputJson) => {
  return inputJson.map(item => {
    const key = Object.keys(item)[0];
    const formattedKey = convertSnakeToTitle(key);
    return {
      key: formattedKey,
      values: item[key]
    };
  });
};

export const transformReference = (inputJson) => {
  return inputJson.map(item => {
    return {
      key: item["name"],
      values: [item["link"]]
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