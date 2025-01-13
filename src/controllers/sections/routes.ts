import * as express from 'express';
import controller from './controller';

const router = express.Router();
const { getSectionsWithContent, getFooterDetails } = controller;

router.get('/sections', getSectionsWithContent);
router.get('/footer/:id', getFooterDetails);

export default router;