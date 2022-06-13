import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackrepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

const routes = express.Router();

routes.post('/feedback', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  // Declare dependencies
  const prismaFeedbackrepository = new PrismaFeedbackrepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  // Use dependencies
  const submitFeedback = new SubmitFeedbackUseCase(
    prismaFeedbackrepository, nodemailerMailAdapter
  );
  await submitFeedback.execute({
    type,
    comment,
    screenshot
  });


  return res.status(201).json({ msg: "Feedback armazenado" });
});

export { routes };
