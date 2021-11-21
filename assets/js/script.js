$(function () {});
  
// Variables
var today = moment().format("dddd, MMMM Do");
var now = moment().format("H A");
var hoursArray = [9,10,11, 12, 13, 14, 16, 17]

// Local storage JSON
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
  hoursArray = workEvents;
}


// Get current day
$("#currentDay").text(today);

// add color and create textarea 
hoursArray.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row ='<div class="time-block" id="' + 
	index +'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
	timeLabel +'</div><textarea class="form-control ' +
	blockColor + '">' +
	timeBlock.event +'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	$(".container").append(row);
});

// base in time add colors
function colorRow(time) {
	var hoursNow = moment(now, "H A");
	var hourEntry = moment(time, "H A");
	if (hoursNow.isBefore(hourEntry) === true) {
		return "future";
	} else if (hoursNow.isAfter(hourEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

// events save
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	hoursArray[blockID].event = userEntry;

	// Setup localStorage
	localStorage.setItem("workDay", JSON.stringify(hoursArray));
});