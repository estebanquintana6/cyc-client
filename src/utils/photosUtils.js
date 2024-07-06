export const getFirstPhoto = (photos) => {
  return photos.reduce((prev, curr) =>
    (prev.position ?? 0) < (curr.position ?? 0) ? prev : curr,
  );
};
