import { Request, Response } from "express";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";
import { dataSource } from "../utils";

const skillRepository = dataSource.getRepository(Skill);
const wilderRepository = dataSource.getRepository(Wilder);

export const skillController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newSkill = new Skill();
      newSkill.name = name;
      const createdSkill = await skillRepository.save(newSkill);
      res.status(201).json({
        message: "skill created with success",
        newSkill: createdSkill,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      console.log("Getting all skills");
      const allSkills = await skillRepository.find();
      console.log("Skills >>>> ", allSkills);
      res.status(201).json({ skills: allSkills });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      // Get the keys received from  request's body
      const { skillId, newName } = req.body;
      // Find the skill to update
      const skillToUpdate = await skillRepository.findOneBy({ id: skillId });
      if (skillToUpdate !== undefined && skillToUpdate !== null) {
        skillToUpdate.name = newName;
        const updatedSkill = await skillRepository.save(skillToUpdate);
        res.status(201).json({
          message: `Skill id ${updatedSkill.id} updated with success`,
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      console.log("so you wanna delete one skill >>>>", req.query.skillId);
      const { skillId } = req.query;
      // Find the skill to delete
      const skillToDelete = await skillRepository.findOneBy({
        id: Number(skillId),
      });
      // Delete a skill if found
      if (skillToDelete !== null && skillToDelete !== undefined) {
         await skillRepository.remove(skillToDelete);
        return res.status(201).json({
          message: `Skill deleted with success`,
        });
      }else{
        throw new Error("Skill not found")
      }
    } catch (error:any) {
        return res.status(400).json({ message: error.message });
    }
  },

  // addSkillToWilder: async (req: Request, res: Response) => {
  //   try {
  //     const { wilderId, skillId } = req.body;
  //     console.log("Adding skill to wilder");
  //     console.log("wilder id >>>> ", wilderId);
  //     console.log("skill id to add >>> ", skillId);
  //     // find the wilder to be added skill
  //     const wilderToUpdate = await wilderRepository.findOneBy({
  //       id: wilderId,
  //     });
  //     console.log(">>>>>wilder to update ", wilderToUpdate);
  //     if (wilderToUpdate === null || wilderToUpdate === undefined) {
  //       throw Error("Skill not found");
  //     }
  //     const skillToAdd = await skillRepository.findOneBy({ id: skillId });
  //     console.log("SKILL TO ADD >>>", skillToAdd);

  //     if (skillToAdd === null || skillToAdd === undefined) {
  //       throw Error("Skill not found");
  //     }

  //     if (wilderToUpdate !== null && wilderToUpdate !== undefined) {
  //       wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
  //       const updatedWilder = await wilderRepository.save(wilderToUpdate);
  //       return res.status(201).json({
  //         message: `Skill added with success to wilder id ${updatedWilder.id}`,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ error });
  //   }
  // },
};
