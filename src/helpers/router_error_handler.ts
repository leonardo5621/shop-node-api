import { Request, Response } from 'express';

export const routerTo =
  (controller: (req: Request, res: Response) => Promise<any>) =>
  async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
