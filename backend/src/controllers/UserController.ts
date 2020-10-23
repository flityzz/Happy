import { Request, Response } from "express";
import { getRepository } from "typeorm";

import * as Yup from "yup";
import User from "../models/User";

export default {
  async index(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find({
      relations: ["orphanages"],
    });

    return response.json(users);
  },

  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getRepository(User);

    const data = {
      email,
      password,
    };

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.json(user);
  },
};
