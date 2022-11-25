import Joi, { ObjectSchema } from "joi";
import { IAuthor } from "../author/interfaces";

export const Schemas = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
  },
};
