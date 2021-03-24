import axios from 'axios';

async function getCompanyESG(code) {

    var config = {
        method: 'get',
        url: 'https://finlive-app.herokuapp.com/ESG/' + code,
        headers: {
            'pass': 'CALLIBRI'
        }
    };

    return await axios(config)
}

export { getCompanyESG };
