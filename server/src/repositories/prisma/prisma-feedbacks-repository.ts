import { myPrismaDB } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbackrepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await myPrismaDB.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    });
  }
}
