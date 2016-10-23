import {Router} from 'express';
import * as PostsController from '../controllers/posts.controller';

const router = new Router();

router.use(PostsController.verifyToken);

export default router;
