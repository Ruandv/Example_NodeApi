import { NextFunction, Request, Response } from 'express';
import { authenticateUserAccount } from '../repository/registration';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    authenticateUserAccount(req.body.name, req.body.password, (err: Error | undefined, rows: any[]) => {
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Invalid details supplied'
            });
        }
        return res.status(200).json({
            message: rows.length
        });
    });
};

export default { authenticate };
