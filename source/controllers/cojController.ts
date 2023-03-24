import { NextFunction, Request, Response } from 'express';
import { getBlockIdSchedule } from '../services/cojService';

const getScheduleByBlockId = async (req: Request, res: Response, next: NextFunction) => {
    console.log(JSON.stringify(req.body));
    var result: any = await getBlockIdSchedule(req.body.blockId, req.body.stageId, req.body.startDate, req.body.endDate);
    return res.status(result.status).json({
        message: result.data
    });
};

export default { getScheduleByBlockId };
