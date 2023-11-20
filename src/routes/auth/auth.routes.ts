import { Router } from 'express'
import AuthController from '../../controllers/auth/auth.controller'
import authMiddleware from '../../middlewere/auth.middleware'

const authRoutes = Router()

authRoutes.post('/register',authMiddleware, AuthController.register)//em uso
authRoutes.post('/login',authMiddleware, AuthController.login)
authRoutes.post('/refresh',authMiddleware, AuthController.refresh)
authRoutes.post('/logout',authMiddleware, AuthController.logout)

export default authRoutes