export const getFirstPhoto = (photos = []) => {

  if (photos.length == 1) return 0;

  return (photos || []).reduce((prev, curr) =>
    (prev?.position ?? Number.MAX_SAFE_INTEGER) <
    (curr?.position ?? Number.MAX_SAFE_INTEGER)
      ? prev
      : curr,
  );
};
