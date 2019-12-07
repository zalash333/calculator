const PercentageCurrencyHelper = (usd = null, valueСredit = 1, valueMonth = 1, courseUSD = 1) => {
    const value = (valueСredit + ((valueСredit * 0.16) / 12) * valueMonth)
    if (usd) {
        return Math.round((value) * 10) / 10
    }
    return Math.round((value * courseUSD) * 10) / 10
}

export default PercentageCurrencyHelper;