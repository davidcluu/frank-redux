import {Router} from 'express';
import * as PostsController from '../controllers/posts.controller';

const router = new Router();

router.use(PostsController.verifyToken);

router.route('/allPosts').get(PostsController.allPosts);

export default router;
