import { defaultData } from "../cat-config";
import { listContainerType, renderManagerType } from "../cat-type";

export const keyDown = (option: renderManagerType) => {
  const keyW = (listContainer: listContainerType) => {
    listContainer.forEach((container) => {
      container.position.y += -(option.speed || defaultData.speed);
    });
  };
  const keyS = (listContainer: listContainerType) => {
    listContainer.forEach((container) => {
      container.position.y += option.speed || defaultData.speed;
    });
  };
  const keyA = (listContainer: listContainerType) => {
    listContainer.forEach((container) => {
      container.position.x += -(option.speed || defaultData.speed);
    });
  };
  const keyD = (listContainer: listContainerType) => {
    listContainer.forEach((container) => {
      container.position.x += option.speed || defaultData.speed;
    });
  };
  return {
    keyW,
    keyS,
    keyA,
    keyD,
  };
};
