function getCurrentTime(format) {
    let now = new Date()
    let time = ""
	let [year, month, date, hour, minutes, second] = [
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		now.getHours(),
		now.getMinutes(),
		now.getSeconds()
	]
	
	month = month + 1
	month = month < 10 ? `0${month}` : month
	date = date < 10 ? `0${date}` : date
	hour = hour < 10 ? `0${hour}` : hour
	minutes = minutes < 10 ? `0${minutes}` : minutes
    second = second < 10 ? `0${second}` : second
    if(format === 1){
        time = `${year}-${month}-${date}`
    }
    if(format ===2){
        time = `${year}-${month}-${date} ${hour}:${minutes}:${second}`
    }
    return time
    
}
module.exports = getCurrentTime