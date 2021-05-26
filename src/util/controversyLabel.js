export default function controversyLabel(val) {

    if ( val == 'Red' ) {
      return 'ALERT'
    } else if ( val == 'Orange') {
      return "WATCH"
    } else if ( val == 'Yellow') {
      return "FAIR"
    } else if ( val == 'Green') {
      return "NONE"
    } else { 
      return "-"
    }

  }