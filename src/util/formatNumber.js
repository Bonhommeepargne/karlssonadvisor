function formatNumber(perf) {

    if (perf === '#N/A') {
        return 0
    } else {
        return Number(Math.round(perf * 10) / 10);
    }

}

export default formatNumber;