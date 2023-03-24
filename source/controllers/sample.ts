import { NextFunction, Request, Response } from 'express';
import systemConfigs from '../config/config';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';
const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'pong'
    });
};

const twitter = async (req: Request, res: Response, next: NextFunction) => {
    const credential = new DefaultAzureCredential();

    const vaultName = 'rdvtwitter';
    const url = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(url, credential);

    const secretName = 'developerName';
    const latestSecret = await client.getSecret(secretName);
    console.log(`Latest version of the secret ${secretName}: `, latestSecret);
    const specificSecret = await client.getSecret(secretName, { version: latestSecret.properties.version! });
    console.log(`The secret ${secretName} at the version ${latestSecret.properties.version!}: `, specificSecret);

    return res.status(200).json({
        message: latestSecret.value
    });
};

export default { serverHealthCheck, twitter };
