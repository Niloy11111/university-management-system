import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemister.interface';
import { AcademicSemester } from './academicSemister.model';
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // vaiya TAcademicSemesterCode import kore pelse video 12.7 a

  // academicSemesterNameCodeMapper['Fall'] = 3
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    // throw new Error('Invalid Semester Code');
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    // throw new Error('Invalid Semester Code');
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist!');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
