import { Career } from '../entity/career';

// ==========ここから追加する==========
export const exitEmptyCareers = (careers: Career[]) =>
  careers.some((c) => isEmptyCareer(c));
// ==========ここまで追加する==========

const isEmptyCareer = (career: Career) => {
  return Object.values(career).every((v) => !v);
};
