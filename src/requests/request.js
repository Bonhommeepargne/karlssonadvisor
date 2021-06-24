import axios from 'axios';

function handleError(res) {
    if (res.length <= 0 || res.data.length <= 0) {
        throw "empty data";
    }
    if (res.data == "Error" || res.data == "error") {
        throw res.data;
    }
}

let apiUrl = "http://99.80.211.255:8080"; // api Heroku
if (__DEV__) {
    apiUrl = "http://99.80.211.255:8080"; // (utiliser localhost:8080 pour dev )
}

async function getCompanyESG(code) {

    // https://finlive-app.herokuapp.com/ESG/

    var config = {
        method: 'get',
        url: apiUrl + '/ESG/' + code,
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
        url: apiUrl + '/ESGWHERE/' + type + '/' + code ,
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
        url: apiUrl + '/ESGlist/' ,
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
        url: apiUrl + '/ESGupdate' ,
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

async function sendEmail(data) {
    var config = {
        method: 'post',
        url: apiUrl + '/sendemail' ,
        headers: {
            'pass': 'CALLIBRI'
        },
        data: data
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

export { getCompanyESG, getSectorESG, getAllSecurities, getUpdateDate, sendEmail };
