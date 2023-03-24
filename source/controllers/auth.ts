import { NextFunction, Request, Response } from 'express';

const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    //should go to google
    console.log('HELLO THERE');
    const GoogleClientId = process.env.GOOGLE_CLIENT_ID
    fetch(
        {
            url: `https://accounts.google.com/o/oauth2/auth?client_id=${GoogleClientId}.apps.googleusercontent.com`,
            method: 'post'
        } as RequestInfo,
        {}
    );
    //     .then((response) => {
    //       // Ensure service worker exists, and that we really are getting a JS file.
    //       const contentType = response.headers.get('content-type');
    //       if (
    //         response.status === 404 ||
    //         (contentType != null && contentType.indexOf('javascript') === -1)
    //       ) {
    //         // No service worker found. Probably a different app. Reload the page.

    //         } else {
    //         // Service worker found. Proceed as normal.
    //         console.log("WE GOT IT WORKING!!!!")
    //       }
    //     })
    //     .catch(() => {
    //       console.log('No internet connection found. App is running in offline mode. ');
    //     });
    return res.status(200).json({
        message: 22
    });
};

const callback = async (req: Request, res: Response, next: NextFunction) => {
    //Thanks google
};

export default { callback, googleAuth };
