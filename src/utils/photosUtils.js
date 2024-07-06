export const getFirstPhoto = (photos = []) => {
  return photos.reduce((prev, curr) =>
    (prev.position ?? Number.MAX_SAFE_INTEGER) <
    (curr.position ?? Number.MAX_SAFE_INTEGER)
      ? prev
      : curr,
  );
};
