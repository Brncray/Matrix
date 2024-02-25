import { Router } from 'express';
import passport from 'passport';
import { isAuthenticated } from '../../utils/middlewares';

const router = Router();


router.get('/', isAuthenticated, (req, res) => res.sendStatus(200), (req, res) => {
    
}); 

export default router; 