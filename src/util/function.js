const tabColor = [
    {
        "R": 255,
        "V": 0,
        "B": 0
    },
    {
        "R": 255,
        "V": 42,
        "B": 0
    },
    {
        "R": 255,
        "V": 91,
        "B": 0
    },
    {
        "R": 255,
        "V": 144,
        "B": 0
    },
    {
        "R": 255,
        "V": 198,
        "B": 0
    },
    {
        "R": 200,
        "V": 255,
        "B": 0
    },
    {
        "R": 178,
        "V": 230,
        "B": 0
    },
    {
        "R": 91,
        "V": 200,
        "B": 0
    },
    {
        "R": 50,
        "V": 170,
        "B": 50
    },
    {
        "R": 0,
        "V": 128,
        "B": 0
    }
];

function getColor(u) {
    let v = parseInt(u, 10); 
    let rvb = tabColor[u - 1];
    if (typeof rvb != 'undefined') {
        return 'rgb(' + rvb.R + ',' + rvb.V + ',' + rvb.B + ')';
    } else { return "#CCC" }
}

export {
    getColor,
};