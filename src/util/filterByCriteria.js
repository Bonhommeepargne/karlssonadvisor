import _ from "lodash";

export default function filterByCriteria(array, vals) {
  
  if ( vals.length > 0 ) {
    var result=[];
    for (let i = 0; i < vals.length; i++) {
        result.push(_.filter( array, vals[i] ));
    }
    return _.flattenDepth(result, 1);
  } else {
    return array
  }

}
