import moment from 'moment'

export default function dataGraph( arrayData, dateNum) {

    let tab = [];
    for (let i = 13 ; i < arrayData.length ;i++ ) {
        tab.push({ month:  moment(dateNum,'YYYYMMDD').clone().subtract(arrayData.length - i -1, 'months').format('MMM') , 
         decile: arrayData[i] });
    }

    // console.log(tab)

    return tab

}