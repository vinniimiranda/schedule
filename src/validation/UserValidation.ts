import Joi from 'joi';

export const UserStoreValidation = {
  body: {
    username: Joi.string()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required()
  }
};
