import { Summary } from '../models';

export default {
  async createSummary(data) {
    const { userHash } = data;
    const summaryCountByUserHash = await Summary.count({ userHash });

    if (summaryCountByUserHash === 3) {
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

  async search({
    tags,
    size,
    title,
    page,
  }) {
    const query = {
      title: { $regex: title },
    };

    if (tags.length) {
      query.tags = { $in: tags };
    }

    const count = await Summary
      .count(query)
      .sort({ updatedAt: '-1' });
    let pages = count / size;

    if (pages.toString().indexOf('.') !== -1) {
      pages = parseInt(pages) + 1;
    }

    const summaries = await Summary
      .find(query)
      .sort({ updatedAt: '-1' })
      .limit(size)
      .skip((page - 1) * size);

    return {
      summaries,
      count,
      pages,
      page,
    };
  },
};
