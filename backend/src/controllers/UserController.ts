import { json, Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

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

    const hash = await hashSync(password, 10);

    const data = {
      email,
      password: hash,
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

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ email: email });

    if (user.email) {
      const hash = user.password.toString();
      if (bcrypt.compareSync(password, hash)) {
        // Passwords match
        const token = jwt.sign({ id: user.id }, "secret", {
          expiresIn: 86400,
        });

        return response.json(token)
      } else {
        return response.json({ message: "password dont match" });
      }
    } 
  },
};
