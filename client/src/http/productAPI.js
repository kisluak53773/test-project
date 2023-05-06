import { authHost, host } from "./index";

export const createType = async (type) => {
  const { data } = await authHost.post("api/type", type);
  return data;
};

export const createProduct = async (product) => {
  const { data } = await authHost.post("api/product", product);
  return data;
};

export const getTypes = async () => {
  const { data } = await host.get("api/type");
  return data;
};

export const getProducts = async (typeId) => {
  const { data } = await host.get("api/product", { params: { typeId } });
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await authHost.delete(`api/product/${id}`);
  return data;
};

export const deleteType = async (id) => {
  const { data } = await authHost.delete(`api/type/${id}`);
  return data;
};
