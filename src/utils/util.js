export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveLocalStorage = (key, data) => {
  const stringData = JSON.stringify(data);
  return localStorage.setItem(key, stringData);
};
export const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};
export const convertFromSlug =(slug)=> {
  return slug
    .split("-")
    .map((word) =>
      word
        .replace(/^\w/, (c) => c.toUpperCase())
        .replace(/-/g, " ")
    )
    .join(" "); 
}