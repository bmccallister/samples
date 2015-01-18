var laptime = 0;			// Current lap top
	var totaltime = 0;			// Total time of all laps
	var laps = [];				// Array of previous laps
	var laprunning = false;		// Tracker for current lap status
	var lapnumber = 0; 			// Current lap iterator
	var monitorInterval = null; // Handle to the interval

	$(document).ready(function() {
		// Event setup
		$('#timetoggle').click(function() {
			toggleTime();
		});
	    $('#lap').click(function() {
			clickLap();
		});
		updateButtons();
	});

	function startLap() {
		laprunning = true;
		updateButtons();
		monitorInterval = setInterval(function() {
			if (laprunning) {					
				laptime+=1;
				totaltime+=1;
				updateTimes();
			}
		}, 10);
	}

	function stopLap() {
		laprunning = false;
		updateButtons();
		clearInterval(monitorInterval);
		$('#lap').text('Reset');
		$('#timetoggle').text('Start');
	}

	function clickLap() {
		if (laprunning) { // Submit lap
			lapnumber++;
			// Save lap
			$('#laps').prepend('<div class="laprow">Lap ' + lapnumber + '<span>' + formatTime(laptime) + '</span></div');
			laptime = 0;
			updateTimes();
		}
		else { // Reset all
			laptime = 0;
			totaltime = 0;
			$('#laps').text('');
			updateTimes();
		}
	}

	function toggleTime() {
		if (laprunning) {
			stopLap();
		}
		else {
			startLap();
		}
	}

	function updateTimes() {
		$('#laptime').text(formatTime(laptime));
		$('#totaltime').text(formatTime(totaltime));
	}

	function updateButtons() {
		if (laprunning) {
			$('#timetoggle').text('Stop');
			$('#lap').text('Lap');
			$('#timetoggle').addClass('running');
		}
		else {
			$('#timetoggle').removeClass('running');
			$('#timetoggle').text('Start');
			$('#lap').text('Reset');
		}
	}

	
	
	// Return a propery formatted time for all instances
	function formatTime(time) {
		var seconds = 0;
		var minutes = 0;
		var milliseconds = 0;

		// Get minutes / seconds / remainder from the total time
		minutes = Math.floor((time / (100*60)) % 60);
		seconds = Math.floor(time / 100);
		milliseconds = (time - seconds*100);
		seconds -= minutes*60;

		// Format output
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		if (milliseconds < 10) {
			milliseconds = '0' + milliseconds;
		}
		return minutes + ':' + seconds + '.' + milliseconds;
	}