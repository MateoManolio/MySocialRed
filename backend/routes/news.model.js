import { Router } from 'express';
import * as NewsController from '../controllers/news.controller.js';

export const router = Router();

router.get('/', NewsController.getAllNews);
router.get('/:id', NewsController.getNewById);
router.post('/', NewsController.createNew);
router.put('/:id', NewsController.updateNew);
router.delete('/:id', NewsController.deleteNew);
