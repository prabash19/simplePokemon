export const getLocalStorageValue = () => {
  let savedIdsArray: number[];
  const savedIds = localStorage.getItem("ids");
  if (savedIds != null) {
    savedIdsArray = JSON.parse(savedIds);
    return savedIdsArray;
  } else {
    return null;
  }
};
export const saveAsFavourites = (number: number) => {
  const savedIdsArray = getLocalStorageValue();
  if (savedIdsArray != null) {
    if (!savedIdsArray.includes(number)) {
      savedIdsArray.push(number);
      localStorage.setItem("ids", JSON.stringify(savedIdsArray));
    }
  } else {
    localStorage.setItem("ids", JSON.stringify([number]));
  }
};
export const removeFromFavourites = (number: number) => {
  const savedIdsArray = getLocalStorageValue();
  if (savedIdsArray != null) {
    const index = savedIdsArray.indexOf(number);
    if (index !== -1) {
      savedIdsArray.splice(index, 1);
      localStorage.setItem("ids", JSON.stringify(savedIdsArray));
    }
  }
};
