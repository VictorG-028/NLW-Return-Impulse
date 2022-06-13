import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,test.jpg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback whithout type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,test.jpg',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback whithout comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,test.jpg',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback whith an invalid image', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'not-valid-image.jpg',
    })).rejects.toThrow();
  });
});
