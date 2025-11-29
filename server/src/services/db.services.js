export const isExists = async (Model, filter) => {
  const exists = await Model.exists(filter);
  return exists;
};

export const findOne = async (Model, filter, projection = null) => {
  const document = await Model.findOne(filter, projection);
  return document;
};
