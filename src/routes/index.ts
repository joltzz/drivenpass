import { Router } from 'express';

import authRouter from "./authRouter"
import credentialRouter from "./credentialRouter"
import safeNotesRouter from "./safeNotesRouter"
import creditCardRouter from "./creditCardRouter"
import wifiRouter from "./wifiRouter"

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(safeNotesRouter);
router.use(creditCardRouter);
router.use(wifiRouter);

export default router;