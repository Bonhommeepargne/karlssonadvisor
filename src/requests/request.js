import axios from 'axios';

function handleError(res) {
    if (res.length <= 0 || res.data.length <= 0) {
        throw "empty data";
    }
    if (res.data == "Error" || res.data == "error") {
        throw res.data;
    }
}

async function getCompanyESG(code) {

    // https://finlive-app.herokuapp.com/ESG/

    var config = {
        method: 'get',
        url: 'http://99.80.211.255:8080/ESG/' + code,
        headers: {
            'pass': 'CALLIBRI'
        }
    };

    try {
        const res = await axios(config);
        handleError(res);
        return res;
    } catch (e) {
        console.log('Error axios request.js', e);
        return e;
    }

}

async function getSectorESG(type,code) {

    // https://finlive-app.herokuapp.com/ESG/

    var config = {
        method: 'get',
        url: 'http://99.80.211.255:8080/ESGWHERE/' + type + '/' + code ,
        headers: {
            'pass': 'CALLIBRI'
        }
    };
    try {
        const res = await axios(config);
        handleError(res);
        return res;
    } catch (e) {
        console.log('Error axios request.js', e);
        return e;
    }

}

// console.log('masterDataSource :>> ', masterDataSource.length);
async function getAllSecurities() {
    var config = {
        method: 'get',
        url: 'http://99.80.211.255:8080/ESGlist/' ,
        headers: {
            'pass': 'CALLIBRI'
        }
    };

    try {
        const res = await axios(config);
        handleError(res);
        return res;
    } catch (e) {
        console.log('Error axios request.js', e);
        return e;
    }
}

// console.log('masterDataSource :>> ', masterDataSource.length);
async function getUpdateDate() {
    var config = {
        method: 'get',
        url: 'http://99.80.211.255:8080/ESGupdate' ,
        headers: {
            'pass': 'CALLIBRI'
        }
    };

    try {
        const res = await axios(config);
        handleError(res);
        return res;
    } catch (e) {
        console.log('Error axios request.js', e);
        return e;
    }
}

export { getCompanyESG, getSectorESG, getAllSecurities, getUpdateDate };
