import formatNumber from './formatNumber';
import namecompany from './namecompany';

export default function transformData( dataLoaded ) {

    let dataObj = [];

    for (let t=0; t< dataLoaded.length; t++ ) {
        let obj = dataLoaded[t];
        obj.ind = t;
        obj.Perf1M = formatNumber(dataLoaded[t].Perf1M);
        obj.Perf3M = formatNumber(dataLoaded[t].Perf3M);
        obj.Perf1Y = formatNumber(dataLoaded[t].Perf1Y);
        obj.Perf6M = formatNumber(dataLoaded[t].Perf6M);
        obj.PerfYTD = formatNumber(dataLoaded[t].PerfYTD);
        obj.Perf3Y = formatNumber(dataLoaded[t].Perf3Y);
        obj.Name = namecompany(dataLoaded[t].NAME);
        obj.Rank = dataLoaded[t].intensityRank[1];
        obj.Int = formatNumber(dataLoaded[t].intensityAverage[1]);
        obj.SharS =  formatNumber(( dataLoaded[t].salesAverage[1] / dataLoaded[t].totalSalesGroup[1] ) * 100);
        obj.SharC =  formatNumber(( dataLoaded[t].carbonAverage[1] / dataLoaded[t].totalCarbonGroup[1] ) * 100);
        obj.Carbon = Number((Math.abs(dataLoaded[t].carbonAverage[1])/1000).toFixed(1));
        obj.s = parseInt(dataLoaded[t].Market_Cap/100)/10;
        dataObj.push(obj);
      }

    return dataObj
}

