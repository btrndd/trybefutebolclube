import { NextFunction, Request, Response } from 'express';
import MatchRequest from '../dtos/MatchRequest';
import EError from '../interfaces/EError';
import HttpException from '../interfaces/HttpException';
import MatchService from '../services/MatchService';

class MatchController {
  _matchService: MatchService;

  constructor(matchService: MatchService) {
    this._matchService = matchService;
  }

  async List(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._matchService.List();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async Add(req: Request, res: Response, next: NextFunction) {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals, inProgress } = req.body;
    try {
      if (inProgress === false) {
        throw new HttpException(EError.invalidData, 'Partida já finalizada.');
      }
      const match = new MatchRequest(+awayTeam, +awayTeamGoals, +homeTeam, +homeTeamGoals);
      console.log(match);
      const response = await this._matchService.Add(match);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchController;
