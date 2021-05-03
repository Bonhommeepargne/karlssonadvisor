import axios from 'axios';

async function getCompanyESG(code) {

    // https://finlive-app.herokuapp.com/ESG/

    var config = {
        method: 'get',
        url: 'http://99.80.211.255:8080/ESG/' + code,
        headers: {
            'pass': 'CALLIBRI'
        }
    };

    return await axios(config);

}

async function getSectorESG(code) {

    // https://finlive-app.herokuapp.com/ESG/

    var config = {
        method: 'get',
        url: 'http://99.80.211.255:8080/ESGSector/' + code,
        headers: {
            'pass': 'CALLIBRI'
        }
    };

    return await axios(config);

}

export { getCompanyESG, getSectorESG };
