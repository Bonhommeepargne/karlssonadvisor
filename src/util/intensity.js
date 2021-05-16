export default function intensity(num) {

    number = [ '-', 'HIGH', 'POOR', 'AVG', 'FAIR', 'GOOD'];
    color = [ '#C8C8C8', 'red', 'orange', 'yellow', 'lightgreen', 'green' ]

    if ( Number.isInteger( num ) ) {
        return { text: number[num], color: color[num] };
    } else {
        return { text: '-', color: '#C8C8C8' };
    }

}