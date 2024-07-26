export const rectangularCollision = (rectangle1: any, rectangle2: any) => {
  return (
    rectangle1.position.x + rectangle1.container.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.container.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.container.height &&
    rectangle1.position.y + rectangle1.container.height >= rectangle2.position.y
  );
};
