export default function sizeLabel(val) {

    return val > 10000 ? { letter: 'L', color: 'dodgerblue', label: 'Large Cap' } : 
                (val > 2000 ? { letter: 'M', color: 'deepskyblue', label: 'Mid Cap' } : 
                    { letter: 'S', color: 'lightskyblue', label: 'Small Cap' } )

}
