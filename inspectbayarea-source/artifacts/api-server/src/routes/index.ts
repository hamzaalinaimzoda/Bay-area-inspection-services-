import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import bookingRouter from "./booking";
import crmRouter from "./crm";
import quoteRouter from "./quote";
import reviewsRouter from "./reviews";
import bookRouter from "./book";
import bookStartedRouter from "./book-started";
import bookConfirmRouter from "./book-confirm";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(bookingRouter);
router.use(quoteRouter);
router.use(reviewsRouter);
router.use(bookRouter);
router.use(bookStartedRouter);
router.use(bookConfirmRouter);
router.use(crmRouter);

export default router;
