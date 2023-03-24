import axios from 'axios';

const cojBaseUrl =
    "https://www.citypower.co.za/_api/web/lists/getByTitle('Loadshedding')/items?$select=SubBlock,Title,StartDateQuery,EndDateQuery&$filter=Title%20eq%20%27Stage[stageId]%27%20and%20substringof(%27[blockId]%27,%20SubBlock)%20and%20StartDateQuery%20gt%20datetime%27[startDate]T00:00:00.000%27%20and%20EndDateQuery%20lt%20datetime%27[endDate]T00:00:00.000%27&$top=2000&$orderby=StartDateQuery";

const config: any = {
    headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'content-type': 'application/json'
    }
};

const getBlockIdSchedule = async (blockId: string, stageId: string, startDate: string, endDate: string) => {
    console.log('Getting data for ', startDate, ' until ', endDate);
    var newUrl = cojBaseUrl.replace('[stageId]', stageId).replace('[blockId]', blockId).replace('[startDate]', startDate).replace('[endDate]', endDate);
    console.log(newUrl);
    return await axios.get(newUrl, config);
};

export { getBlockIdSchedule };
