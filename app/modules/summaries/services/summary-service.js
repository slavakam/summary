import { Summary } from '../models';

export default {
  async createSummary(data) {
    const { userId } = data;
    const summaryCountByUserId = await Summary.count({ userId });

    if (summaryCountByUserId === 3) {
      throw new AppError({ status: 400, message: 'User cannot create more 3 summary' });
    }

    return Summary.create(data);
  },

  updateSummary(data, summary) {
    summary.set(data);

    try {
      return summary.save();
    } catch (error) {
      throw new AppError({ status: 400, ...error });
    }
  },
};
