module.exports = function dateformatter(day, month, year){
    month = month + 1;
    if(day<10) { day='0'+day }
    if(month<10) { month='0'+month }

    return date = year+'-'+month+'-'+day
}
