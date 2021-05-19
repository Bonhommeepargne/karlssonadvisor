import _ from 'lodash';
import transformData from './transformData';
import { getSectorESG } from '../requests/request';

export default async function findCompany(sectorArray, item) {

    let row = -1;
    let col = -1;

    for (let i = 0; i < sectorArray.length; i++) {
        if (item.s == sectorArray[i][0].SASBIndustryGroupCode) {
            row = i;
            for (let j = 0; j < sectorArray[i].length; j++) {
                if (item.c == sectorArray[i][j].Sedol7) {
                    col = j;
                    return { tab: null, coord: { row, col }}
                }
            }
        }
    }

    let ESGData = await getSectorESG('SASBIndustryGroupCode', item.s)
    let dataObj = transformData(ESGData.data);
    row = sectorArray.length;
    col = _.findIndex(dataObj, function (o) { return o.Sedol7 == item.c; });
    return { tab: dataObj, coord: { row, col }}

}