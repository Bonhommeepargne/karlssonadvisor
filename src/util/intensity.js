export default function intensity(num) {

    let number = [ '-', 'HIGH', 'POOR', 'AVG', 'FAIR', 'GOOD'];
    let color = [ '#C8C8C8', 'red', 'orange', 'yellow', 'lightgreen', 'green' ]

    if ( Number.isInteger( num ) ) {
        return { text: number[num], color: color[num] };
    } else {
        return { text: '-', color: '#C8C8C8' };
    }

}