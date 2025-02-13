const countPages = (total: number, limit: number) => {
  return Math.ceil(total / limit);
};

export default countPages;
