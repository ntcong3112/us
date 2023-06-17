
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date, isFormat){
	
	var minMax = window.dayjs_plugin_minMax;
	var isBetween = window.dayjs_plugin_isBetween;
	dayjs.extend(minMax);
	dayjs.extend(isBetween);
	var dateNow = dayjs();
	var start = dayjs('06/11/2023 00:00:00');
	var month =  dateNow.diff(start, 'month')

	var afterAddMonths = start.add(month, 'month')
	var dayAddMonth = dateNow.diff(afterAddMonths, 'day')


	var day = dateNow.diff(start, 'day')
	var afterAddDay = start.add(day, 'day')
	


	var hours = dateNow.diff(afterAddDay, 'hour')
	var afterAddHours = afterAddDay.add(hours, 'hour')

	var minutes = dateNow.diff(afterAddHours, 'minute')
	var afterAddMinute = afterAddHours.add(minutes, 'minute')

	var seconds = dateNow.diff(afterAddMinute, 'seconds')
	var result;
	if (isFormat) {
		result = "<span class=\"digit\">" + day + "</span> ngày <span class=\"digit\">" + hours + "</span> giờ <span class=\"digit\">" + minutes + "</span> phút <span class=\"digit\">" + seconds + "</span> giây"; 
	} else {
		result = "<span class=\"digit\">" + month + "</span> tháng <span class=\"digit\">" + dayAddMonth + "</span> ngày <span class=\"digit\">" + hours + "</span> giờ <span class=\"digit\">" + minutes + "</span> phút"; 
	}
	

	// var current = Date();
	// var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	// var days = Math.floor(seconds / (3600 * 24));
	// seconds = seconds % (3600 * 24);
	// var hours = Math.floor(seconds / 3600);
	// if (hours < 10) {
	// 	hours = "0" + hours;
	// }
	// seconds = seconds % 3600;
	// var minutes = Math.floor(seconds / 60);
	// if (minutes < 10) {
	// 	minutes = "0" + minutes;
	// }
	// seconds = seconds % 60;
	// if (seconds < 10) {
	// 	seconds = "0" + seconds;
	// }
	// var result = "<span class=\"digit\">" + days + "</span> ngày <span class=\"digit\">" + hours + "</span> giờ <span class=\"digit\">" + minutes + "</span> phút <span class=\"digit\">" + seconds + "</span> giây"; 
	$("#clock").html(result);
}
