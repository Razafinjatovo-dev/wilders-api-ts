import { Request, Response } from "express";
import { Wilder } from "../entity/Wilder";
import { dataSource } from "../utils";
import axios from "axios";

// interface IController {
//     [key: string]: (arg0: Request, arg1: Response) => {};
// }

interface SkillInterface {
  skillId: number;
  grade: number;
}

const wilderRepository = dataSource.getRepository(Wilder);
// const skillRepository = dataSource.getRepository(Skill);

export const wilderController = {
  create: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const wilder = new Wilder();
      const { name, description, skills } = req.body;
      wilder.name = name;
      wilder.description = description;
      const wilderCreated = await wilderRepository.save(wilder);

      if (wilderCreated !== undefined && wilderCreated !== null) {
        skills.forEach(async (skill: SkillInterface) => {
          const payload = {
            wilderId: wilderCreated.id,
            skillId: skill.skillId,
            grade: skill.grade,
          };
          await axios.post(
            "http://localhost:5050/api/grade/",
            payload
          );
        });
      } else {
        throw new Error("Wilder creation failed");
      }

      return res.status(201).send("Wilder created with success");
    } catch (error: any) {
      return res.json(error.message);
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const allWilders = await wilderRepository.find({
        relations: {
          grades: {
            skill: true,
          },
        },
      });
      return res.status(200).json({ wilders: allWilders });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      // Get the keys received from  request's body
      console.log(">>>> req body >>>>", req.body);
      const { wilderId, name, description } = req.body;
      // Find the wilder to update
      const wilderToUpdate = await wilderRepository.findOneBy({ id: wilderId });

      console.log(">>>wilder to update >>>> ", wilderToUpdate);
      // Check if wilder requested exists
      if (wilderToUpdate === null || wilderToUpdate === undefined) {
        return res.status(404).json({ message: "Wilder not found" });
      }
      // Update the wilder
      wilderToUpdate.name = name;
      wilderToUpdate.description = description;
      const wilderNewVersion = await wilderRepository.save(wilderToUpdate);
      console.log("New version >>>> ", wilderNewVersion);
      // Send response to client
      return res
        .status(201)
        .json({ message: "update sucess", newVersion: wilderNewVersion });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },

  delete: async (req: Request, res: Response) => {
    console.log("so you wanna delete something >>>>", req.query.wilderId);
    const { wilderId } = req.query;
    try {
      // Find the wilder to delete
      const wilderToRemove = await wilderRepository.findOneBy({
        id: Number(wilderId),
      });
      // Delete the  wilder if found
      if (wilderToRemove !== null && wilderToRemove !== undefined) {
        await wilderRepository.remove(wilderToRemove);
        return res.status(201).json({
          message: `Wilder with id ${wilderToRemove.id} deleted with success`,
        });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
};
