import { Request, Response } from "express";
import { getRepository } from "typeorm";

import orphanageView from "../views/orphanages_view";
import Orphanage from "../models/Orphanage";
import User from "../models/User";

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ["images"],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const { user_id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends == "true",
      user: user_id,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      user: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return response.json(orphanage);
  },

  async delete(request: Request, response: Response) {
    const { id, user_id } = request.params;

    const userRepository = getRepository(User);
    const orphanageRepository = getRepository(Orphanage);

    const user = await userRepository.findOneOrFail(user_id, {
      relations: ["orphanages"],
    });

    

    await user.orphanages.map((orphanage) => {
      if (orphanage.id === parseInt(id)) {
        
        orphanageRepository.delete(id);
      }
    });

     return response.json({ message: `orphanage deleted` });
  },
};
