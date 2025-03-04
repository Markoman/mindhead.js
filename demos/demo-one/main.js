
(function($){
	// forgot where I grabbed this average function 
	Array.prototype.avg = function() {
		var av = 0;
		var cnt = 0;
		var len = this.length;
		for (var i = 0; i < len; i++) {
			var e = +this[i];
			if(!e && this[i] !== 0 && this[i] !== '0') e--;
			if (this[i] == e) {av += e; cnt++;}
		}
		return av/cnt;
	}


	sampleRate = 120; // how fast should the number be refreshed from the network and redrawn on screen?
	threshold = 9.5; // a fake number for demo purposes, lower than the threshold triggers visualization
	boxmax = 300; // limit the box size
	boxratio = 5; // multiply the box height if necessary
	queueSize = 20; // quick running average size for demo
	debug = false; // output debug info to console.log?
	data = new Array; //  array to store samples for average/threshold
	
	var refreshId = setInterval(function() {


		sample = random(1);
		height = parseFloat(sample); // make the box bigger

		if (height > boxmax) { height = boxmax; } // cap the height of the box

		if (debug == true) {
			console.log(data);
		}
		if (data.length > queueSize) { 
			data.pop(); 
		}
		var average = Math.round(data.avg()).toFixed(2);
		
		$("#avgval").html(average);

		$("#box").animate({
			height: height * boxratio + "px"
			}, sampleRate);
		$("#avg").animate({
			height: average * boxratio + "px"
			}, sampleRate);			
		
		if (average < threshold) {
			$("#reward").css("background-color", "orange");
		} else {
			$("#reward").css("background-color", "white");
		}
		
		data.unshift(height);
		
	}, sampleRate);


})(jQuery);
