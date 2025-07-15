import { HttpStatus } from "../../constants/httpStatus";
import { Request, Response, NextFunction } from "express";
import { CreateArtworkSchema } from "../validator/artSchema.validator";
import { CreateArtworkUseCase } from "../../2-application/use-cases/CreateArtworkUseCase";
import { ArtRepositoryImpl } from "../../3-infrastructure/repositories/ArtrepositoryImpl";
import { ART_MESSAGES } from "../../constants/artMessages";
import { FetchArtworksUseCase } from "../../2-application/use-cases/FetchArtworksUseCase";

const repo = new ArtRepositoryImpl();
const fetchArtworksUseCase = new FetchArtworksUseCase(repo);
const createArtworkUseCase = new CreateArtworkUseCase(repo);

//#===================================================================================================================
//# GET ALL ARTWORKS
//#===================================================================================================================
//# GET /api/v1/artwork
//# returns all posts req.header('Authorization')
//# This controller will help you to get all posts
//#===================================================================================================================
export const fetchArtworks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const lastId = req.query.lastId as string | undefined;
    const artworks = await fetchArtworksUseCase.execute(lastId);

    res.status(HttpStatus.OK).json({
      message: ART_MESSAGES.ARTWORK_FETCHED,
      data: artworks,
    });

  } catch (error) {
    next(error);
  }
};

//#===================================================================================================================
//# CREATE ARTWORK
//#===================================================================================================================
//# POST /api/v1/artwork
//#
//# This controller will help you to create a post
//#===================================================================================================================
export const postAnArtwork = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).user.id;
    const data = { ...req.body, userId };

    const result = CreateArtworkSchema.safeParse(data);

    if (!result.success) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: result.error.issues[0]?.message });
    }

    const artwork = await createArtworkUseCase.execute(result.data);

    res.status(HttpStatus.CREATED).json({ message: "Art Created", artwork });
  } catch (error) {
    next(error);
  }
};
