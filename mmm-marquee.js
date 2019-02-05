// https://github.com/aamirafridi/jQuery.Marquee
Module.register("mmm-marquee",{
	defaults: {
		//duration in milliseconds of the marquee
		duration: 15000,
		//gap in pixels between the tickers
		gap: 50,
		//time in milliseconds before the marquee will start animating
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: "left",
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true,
		message: "",
	},
	getStyles: function() {
		return [this.file("mmm-marquee.css")];
	},
	getScripts: function() {
		return [this.file("vendor/jquery-3.3.1.min.js"), this.file("vendor/jquery.marquee.min.js")];
	},
	// Define required translations.
	getTranslations: function() {
		return {
			en: "translations/en.json",
			de: "translations/de.json",
		};
	},
	// setPosition: function(pos) {
	// 	//Add css to body depending on the set position for notifications
	// 	var sheet = document.createElement("style");
	// 	if (pos === "center") {sheet.innerHTML = ".ns-box {margin-left: auto; margin-right: auto;text-align: center;}";}
	// 	if (pos === "right") {sheet.innerHTML = ".ns-box {margin-left: auto;text-align: right;}";}
	// 	if (pos === "left") {sheet.innerHTML = ".ns-box {margin-right: auto;text-align: left;}";}
	// 	document.body.appendChild(sheet);
	// },
	getTemplate: function() {
		return "mmm-marquee.njk";
	},
	getTemplateData: function() {
		return this.config;
	},
	updateDom: function() {
		$(".module.mmm-marquee .marquee").marquee("destroy");
		$(".module.mmm-marquee .marquee").html(this.config.message);
		$(".module.mmm-marquee .marquee").marquee(this.config);
	},
	notificationReceived: function(notification, payload, sender) {
		Log.log("notificationReceived ${notification}");
		if (notification === "SHOW_MARQUEE") {
			this.config.message = payload.message;
			this.updateDom();
			this.show();
		} else if (notification === "HIDE_MARQUEE") {
			this.hide();
		}
	},
	start: function() {
		this.hide();
		$(".module.mmm-marquee .marquee").marquee(this.config);
		Log.info("Starting module: " + this.name);
	}

});
