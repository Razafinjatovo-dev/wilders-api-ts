import { Request, Response } from "express";
import { dataSource } from "../utils";
import { Grade } from "../entity/Grade";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";

const wilderRepository = dataSource.getRepository(Wilder);
const skillRepository = dataSource.getRepository(Skill);
const gradeRepository = dataSource.getRepository(Grade);

export const gradeController = {
  create: async (req: Request, res: Response) => {
    try {
      const { wilderId, skillId, grade } = req.body;
      // Find the wilder
      const wilderFromDB = await wilderRepository.findOneBy({ id: wilderId });
      // Find the skill
      const skillFromDB = await skillRepository.findOneBy({ id: skillId });

      // Save the grade
      if (wilderFromDB !== null && skillFromDB !== null) {
        await gradeRepository.save({
          grade: grade,
          wilder: wilderFromDB,
          skill: skillFromDB,
        });
        res.status(201).json({ message: "Grade created" });
      }
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },


  update: async (req: Request, res: Response) => {
    try {
      const { gradeId, newGradeValue } = req.query;
      console.log("Updating wilder grade id of  >>>> ", gradeId);
      // Find the grade to be updated
      const gradeToBeUpdated = await gradeRepository.findOneBy({
        id: Number(gradeId),
      });
      if (gradeToBeUpdated !== null && gradeToBeUpdated !== undefined) {
        gradeToBeUpdated.grade = Number(newGradeValue);
        await gradeRepository.save(gradeToBeUpdated);
        return res.status(201).json({ message: "grade updated with success" });
      } else {
        throw new Error("Grade not found");
      }
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },
};
