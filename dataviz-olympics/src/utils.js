const continentImages = require.context('/assets/images/continents', true);

export const getAllImages = () => {
    // Get all matching files in the context
    const allFiles = continentImages.keys();
  
    // Map over the files and load each one
    return allFiles.map((fileName) => continentImages(fileName));
  };
  