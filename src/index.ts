import express, {Request,Response} from 'express';
import { dataSource } from "./utils";
import cors from "cors";

// Importing controllers
import {wilderController} from './controller/wilder';
import {skillController} from './controller/skill';
import {gradeController} from './controller/grade';


const app = express();
const port = 5050;


app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res: Response) => {
  res.send('Hello World!')
})
// WILDERS ROUTES

// Create wilder
app.post('/api/wilder/create', wilderController.create)

// Read all wilders
app.get('/api/wilders', wilderController.read)

// Update one wilder 
app.put('/api/wilder/update', wilderController.update)

// Delete one wilder
app.delete('/api/wilder', wilderController.delete)


// SKILLS ROUTES
// Create skill
app.post('/api/skill/create', skillController.create);

// Read skills
app.get('/api/skills', skillController.read);

// Update skill
app.put('/api/skill/update', skillController.update);

// Delete skill
app.delete('/api/skill/delete', skillController.delete);

// Add skill to a wilder
// app.put('/api/add-skill/wilder', skillController.addSkillToWilder)

// SKILLS GRADES 
// Add grade (and so a skill) to a wilder
app.post('/api/grade', gradeController.create)

// Update a wilder's grade
app.put('/api/grade/update', gradeController.update)

const start = async (): Promise<void> => {
  await dataSource.initialize();
  // dataSource
  //   .getRepository(Wilder)
  //   .save({ name: "john doe", description: "lorem ipsum" })
  app.listen(port, () => {
    console.log(`wilders app listening on port ${port}`)
  })
}

void start()