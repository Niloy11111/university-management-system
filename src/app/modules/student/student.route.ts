import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { StudentControllers } from './student-controller';
import { updateStudentValidationSchema } from './student.zod.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
