import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { models_Project } from "@/api.types.d.ts";

export const getProjects = async (): Promise<models_Project[]> => {
  const res = await axios.get<models_Project[]>(`${DOMAIN}/api/projects`);
  return res.data;
};
