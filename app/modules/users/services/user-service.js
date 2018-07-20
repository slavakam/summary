import { User } from '../models';

export default {
  async createUser(data) {
    try {
      return await User.create(data);
    } catch (error) {
      throw new AppError({ status: 400, ...error });
    }
  },

  getUserWithPublicFields(params) {
    return User.findOne(params).select({ password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
  },

};
