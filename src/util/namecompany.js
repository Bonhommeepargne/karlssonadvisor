export default function namecompany(str) {

    const words = str.split(' ');
    const norm = [];
    const accro = [ 'plc', 's.p.a', 'oyj', 'sa', 'class', 'S.A.', ',',
     'nv', 'asa', 'AB', 'sponsored', 'a.s.', 'ltd', 'ltd.', 'a/s', 'sca', 'ag', 's.p.a.', 'kgaa',
     'd.D.', 'p/f', 'p.l.c.', 'n.v', 'n.v.', 'se', 'spa'];

    let bar = 30;
    let tot = 0;
    let inc = 0;
    for (let i = 0; i < words.length; i++) {
        tot = tot + words[i].length;
        if ( tot > bar ) {
            if ( i == 0 ) {
            norm.push(words[0]);
            }
            break
        } else {
            let test = false;
            accro.forEach((obj) => {
                if ( obj.toLowerCase() === words[i].toLowerCase() ) {
                    test = true;
                }
            })
            if ( test == false ) {
                norm.push(words[i]);
            } else {
                break
            }

        }
    }

    return norm.join(" ");

}