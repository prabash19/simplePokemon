export const saveAsFavourites = (number: number) => {
  let savedIdsArray: number[];
  const savedIds = localStorage.getItem("ids");
  if (savedIds != null) {
    savedIdsArray = JSON.parse(savedIds);
    if (!savedIdsArray.includes(number)) {
      savedIdsArray.push(number);
      localStorage.setItem("ids", JSON.stringify(savedIdsArray));
    }
  } else {
    localStorage.setItem("ids", JSON.stringify([number]));
  }
};
export const removeFromFavourites = (number: number) => {
  let savedIdsArray: number[];
  const savedIds = localStorage.getItem("ids");
  if (savedIds != null) {
    savedIdsArray = JSON.parse(savedIds);
    const index = savedIdsArray.indexOf(number);
    if (index !== -1) {
      savedIdsArray.splice(index, 1);
      localStorage.setItem("ids", JSON.stringify(savedIdsArray));
    }
  }
};
