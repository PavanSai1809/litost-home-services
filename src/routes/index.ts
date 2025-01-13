import express from 'express';
import healthCheck from '../controllers/health-check/routes';
import user from '../controllers/user/routes';
import section from '../controllers/sections/routes';

const router = express.Router();

export const routes = () => {
  router.use('/health-check', healthCheck);
  router.use('/user', user);
  router.use('/section', section);
  return router;
};
