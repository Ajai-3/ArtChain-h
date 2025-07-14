import { HttpStatus } from '../../constants/httpStatus';
import { Request, Response, NextFunction } from 'express';
import { CreateArtworkSchema } from "../validator/artSchema.validator";
import { CreateArtworkUseCase } from "../../2-application/use-cases/CreateArtworkUseCase";
import { ArtRepositoryImpl } from '../../3-infrastructure/repositories/ArtrepositoryImpl';


const repo = new ArtRepositoryImpl();
const createArtworkUseCase = new CreateArtworkUseCase(repo);   

//#===================================================================================================================
//# CREATE ARTWORK
//#===================================================================================================================
//# POST /api/v1/artwork
//# 
export const ArtworkController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const validation = CreateArtworkSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: validation.error.flatten() });
    }

      const artwork = await createArtworkUseCase.execute(validation.data);
      res.status(HttpStatus.CREATED).json(artwork);
    } catch (error) {
      next(error)
    }
  }
