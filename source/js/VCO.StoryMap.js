/*	StoryMap
	Designed and built by Zach Wise at VéritéCo

	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
	
================================================== */


/*	Required Files
	CodeKit Import
	http://incident57.com/codekit/
================================================== */
// @codekit-prepend "core/VCO.js";
// @codekit-prepend "core/VCO.Util.js";
// @codekit-prepend "data/VCO.Data.js";
// @codekit-prepend "core/VCO.Class.js";
// @codekit-prepend "core/VCO.Events.js";
// @codekit-prepend "core/VCO.Browser.js";

// @codekit-prepend "animation/VCO.Ease.js";
// @codekit-prepend "animation/VCO.Animate.js";

// @codekit-prepend "dom/VCO.Point.js";
// @codekit-prepend "dom/VCO.DomMixins.js";
// @codekit-prepend "dom/VCO.Dom.js";
// @codekit-prepend "dom/VCO.DomUtil.js";
// @codekit-prepend "dom/VCO.DomEvent.js";

// @codekit-prepend "media/VCO.MediaType.js";
// @codekit-prepend "media/VCO.Media.js";

// @codekit-prepend "media/types/VCO.Media.Blockquote.js";
// @codekit-prepend "media/types/VCO.Media.Flickr.js";
// @codekit-prepend "media/types/VCO.Media.GoogleDoc.js";
// @codekit-prepend "media/types/VCO.Media.GooglePlus.js";
// @codekit-prepend "media/types/VCO.Media.IFrame.js";
// @codekit-prepend "media/types/VCO.Media.Image.js";
// @codekit-prepend "media/types/VCO.Media.SoundCloud.js";
// @codekit-prepend "media/types/VCO.Media.Storify.js";
// @codekit-prepend "media/types/VCO.Media.Text.js";
// @codekit-prepend "media/types/VCO.Media.Twitter.js";
// @codekit-prepend "media/types/VCO.Media.Vimeo.js";
// @codekit-prepend "media/types/VCO.Media.Vine.js";
// @codekit-prepend "media/types/VCO.Media.Website.js";
// @codekit-prepend "media/types/VCO.Media.Wikipedia.js";
// @codekit-prepend "media/types/VCO.Media.YouTube.js";

// @codekit-prepend "ui/VCO.Draggable.js";
// @codekit-prepend "ui/VCO.SizeBar.js";

// @codekit-prepend "slider/VCO.Slide.js";
// @codekit-prepend "slider/VCO.SlideNav.js";
// @codekit-prepend "slider/VCO.StorySlider.js";

// @codekit-prepend "map/leaflet/VCO.Leaflet.js";

// @codekit-prepend "map/VCO.StamenMaps.js";
// @codekit-prepend "map/VCO.MapMarker.js";
// @codekit-prepend "map/VCO.Map.js";

// @codekit-prepend "map/leaflet/VCO.MapMarker.Leaflet.js";
// @codekit-prepend "map/leaflet/VCO.Map.Leaflet.js";


VCO.StoryMap = VCO.Class.extend({
	
	includes: VCO.Events,
	
	/*	Private Methods
	================================================== */
	initialize: function (elem, data, options) {
		
		// DOM ELEMENTS
		this._el = {
			container: {},
			storyslider: {},
			map: {},
			sizebar: {}
		};
		
		// Determine Container Element
		if (typeof elem === 'object') {
			this._el.container = elem;
		} else {
			this._el.container = VCO.Dom.get(elem);
		}
		
		// Slider
		this._storyslider = {};
		
		// Map
		this._map = {};
		
		// SizeBar
		this._sizebar = {};
		
		// Current Slide
		this.current_slide = 0;
		
		// Data Object
		// Test Data compiled from http://www.pbs.org/marktwain/learnmore/chronology.html
		this.data = {
			uniqueid: 				"",
			slides: 				[
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null, //"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1835",
					location: {
						lat: 				39.491711,
						lon: 				-91.793260,
						name: 				"Florida, Missouri",
						zoom: 				12,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Florida, Missouri",
						text: 				"Born in Florida, Missouri. Halley’s comet visible from earth."
					},
					media: {
						url: 				"https://twitter.com/ThisAmerLife/status/374975945825722368",
						credit:				"Zach Wise",
						caption:			"San Francisco"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null, //"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						color: 				"#8b4513",
						opacity: 			50
					},
					date: 					"1839",
					location: {
						lat: 				39.712304,
						lon: 				-91.358088,
						zoom: 				10,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Hannibal, Missouri",
						text: 				"Moves to Hannibal, Missouri, which later serves as the model town for Tom Sawyer and Huckleberry Finn."
					},
					media: {
						url: 				"http://farm8.staticflickr.com/7076/7074630607_b1c23532e4.jpg",
						credit:				"Zach Wise",
						caption:			"San Francisco"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null, //"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						color: 				null,
						opacity: 			50
					},
					date: 					"1851",
					location: {
						lat: 				39.710083,
						lon: 				-91.357441,
						zoom: 				12,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Hannibal Gazette",
						text: 				"Begins work as a journeyman printer with the Hannibal Gazette. Publishes first sketches."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"Zach Wise",
						caption:			"San Francisco"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					null,
					location: {
						lat: 				40.714353,
						lon: 				-74.005973,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Itinerant Printer",
						text: 				"Visits St. Louis, New York, and Philadelphia as an itinerant printer."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1862",
					location: {
						lat: 				39.309514,
						lon: 				-119.649979,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Virginia City Territorial Enterprise",
						text: 				"Travels around Nevada and California. Takes job as reporter for the Virginia City Territorial Enterprise."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1865",
					location: {
						lat: 				37.774929,
						lon: 				-122.419416,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"San Francisco",
						text: 				"Forced to leave Nevada for breaking dueling laws. Prospects in Calaveras County, settles in San Francisco. Writes for magazines and newspapers."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1866",
					location: {
						lat: 				19.896766,
						lon: 				-155.582782,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Hawaii",
						text: 				"Takes trip to Hawaii as correspondent of the Sacramento Alta Californian. Reports on shipwreck of the Hornet. Gives first public lecture."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1867",
					location: {
						lat: 				54.525961,
						lon: 				15.255119,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Travels",
						text: 				"Travels as correspondent to Europe and the Holy Land on the Quaker City. Sees a picture of Olivia Langdon (Livy). Publishes The Celebrated Jumping Frog of Calaveras County, and Other Sketches. Sales are light."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1868",
					location: {
						lat: 				42.089796,
						lon: 				-76.807734,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Livy",
						text: 				"Lectures across the United States. Meets and falls in love with Livy in Elmira, New York."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1870",
					location: {
						lat: 				42.886447,
						lon: 				-78.878369,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png"
					},
					text: {
						headline: 			"Married",
						text: 				"Marries Livy in Elmira. Her father buys them a house in Buffalo, New York. Son Langdon is born."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1872",
					location: {
						lat: 				41.763711,
						lon: 				-72.685093,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Roughing It",
						text: 				"Moves with Livy to Hartford. Publishes Roughing It. Daughter is born. Son Langdon dies."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1891",
					location: {
						lat: 				54.525961,
						lon: 				15.255119,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png"
					},
					text: {
						headline: 			"Financial",
						text: 				"Leaves Hartford to live in Europe because of financial difficulties."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				null,
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1891",
					location: {
						lat: 				40.714353,
						lon: 				-74.005973,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png"
					},
					text: {
						headline: 			"Livy dies",
						text: 				"Livy dies. Begins dictating autobiography. Moves to New York City."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				},
				{
					uniqueid: 				"",
					background: {			// OPTIONAL
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						color: 				"#cdbfe3",
						opacity: 			50
					},
					date: 					"1891",
					location: {
						lat: 				41.304540,
						lon: 				-73.392898,
						zoom: 				11,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Stormfield",
						text: 				"Moves into Stormfield in Redding, CT. Forms the Angelfish Club for young girls."
					},
					media: {
						url: 				"http://2.bp.blogspot.com/-dxJbW0CG8Zs/TmkoMA5-cPI/AAAAAAAAAqw/fQpsz9GpFdo/s1600/voyage-dans-la-lune-1902-02-g.jpg",
						credit:				"ETC",
						caption:			"something"
					}
				}
			]
		};
	
		this.options = {
			height: 				this._el.container.offsetHeight,
			width: 					this._el.container.offsetWidth,
			map_size_sticky: 		3, // Set as division 1/3 etc
			start_at_slide: 		0,
			// animation
			duration: 				1000,
			ease: 					VCO.Ease.easeInOutQuint,
			// interaction
			dragging: 				true,
			trackResize: 			true,
			map_type: 				"toner-lite",
			map_height: 			300,
			storyslider_height: 	600,
			sizebar_default_y: 		300,
			path_gfx: 				"gfx",
			map_popup: 				false,
			zoom_distance: 			100,
			calculate_zoom: 		true, // Allow map to determine best zoom level between markers (recommended)
			use_custom_markers: 	false, // Allow use of custom map marker icons
			line_color: 			"#0088cc",
			line_weight: 			5,
			line_opacity: 			0.5
			
		};
		
		// Animation Objects
		this.animator_map = null;
		this.animator_storyslider = null;
		
		// Merge Data and Options
		VCO.Util.mergeData(this.options, options);
		VCO.Util.mergeData(this.data, data);
		
		// Set Default Location
		this.options.default_map_location = this.data.slides[0].location;
		
		this._initLayout();
		this._initEvents();
		
	},

	/*	Navigation
	================================================== */
	goTo: function(n) { // number

	},

	updateDisplay: function() {
		this._updateDisplay();
	},
	
	/*	Private Methods
	================================================== */

	// Initialize the layout
	_initLayout: function () {
		
		this._el.container.className += ' vco-storymap';
		
		// Create Layout
		this._el.sizebar		= VCO.Dom.create('div', 'vco-sizebar', this._el.container);
		this._el.map 			= VCO.Dom.create('div', 'vco-map', this._el.container);
		this._el.storyslider 	= VCO.Dom.create('div', 'vco-storyslider', this._el.container);
		
		// Create Map using preferred Map API
		this._map = new VCO.Map.Leaflet(this._el.map, this.data, this.options);
		
		// Create SizeBar
		this._sizebar = new VCO.SizeBar(this._el.sizebar, this._el.container, this.options);
		
		// Create StorySlider
		this._storyslider = new VCO.StorySlider(this._el.storyslider, this.data, this.options);
		
		// Initial Default Layout
		this.options.width = this._el.container.offsetWidth;
		this.options.height = this._el.container.offsetHeight;
		this._el.map.style.height = "1px";
		this._el.storyslider.style.top = "1px";
		
		// Set Default Component Sizes
		this.options.map_height = (this.options.height / this.options.map_size_sticky);
		this.options.storyslider_height = (this.options.height - this._el.sizebar.offsetHeight - this.options.map_height - 1);
		this._sizebar.setSticky(this.options.map_height);
		
		// Update Display
		this._updateDisplay(this.options.map_height, true, 2000);
		
		// Animate Sizebar to Default Location
		this._sizebar.show(2000);
		
		
	},
	
	_initEvents: function () {
		
		// Sidebar Events
		this._sizebar.on('clicked', this._onSizeBar, this);
		this._sizebar.on('move', this._onSizeBarMove, this);
		this._sizebar.on('swipe', this._onSizeBarSwipe, this);
		this._sizebar.on('momentum', this._onSizeBarSwipe, this);
		
		// StorySlider Events
		this._storyslider.on('change', this._onSlideChange, this);
		
		// Map Events
		this._map.on('change', this._onMapChange, this);
	},
	
	// Update View
	_updateDisplay: function(map_height, animate, d) {
		
		var duration 	= this.options.duration,
			self		= this,
			sizebar_height = this._el.sizebar.offsetHeight;
		
		if (d) {
			duration = d;
		}
		
		this.options.width = this._el.container.offsetWidth;
		this.options.height = this._el.container.offsetHeight;
		
		// Set Sticky state of SizeBar
		this._sizebar.setSticky(this._el.container.offsetHeight/this.options.map_size_sticky);
		
		// Map Height
		if (map_height) {
			this.options.map_height = map_height;
		}
		
		// StorySlider Height
		this.options.storyslider_height = (this.options.height - sizebar_height - this.options.map_height- 1);
		
		if (animate) {
			
			// Animate Map
			if (this.animator_map) {
				this.animator_map.stop();
			}
			
			this.animator_map = VCO.Animate(this._el.map, {
				height: 	(map_height- 1) + "px",
				duration: 	duration,
				easing: 	VCO.Ease.easeOutStrong,
				complete: function () {
					self._map.updateDisplay(self.options.width, self.options.map_height, animate, d, sizebar_height);
				}
			});
			
			// Animate StorySlider
			if (this.animator_storyslider) {
				this.animator_storyslider.stop();
			}
			this.animator_storyslider = VCO.Animate(this._el.storyslider, {
				height: 	this.options.storyslider_height + "px",
				top: 		sizebar_height + "px",
				duration: 	duration,
				easing: 	VCO.Ease.easeOutStrong
			});
			
		} else {
			// Map
			this._el.map.style.height = map_height + "px";
			
			// StorySlider
			this._el.storyslider.style.height = this.options.storyslider_height + "px";
			this._el.storyslider.style.top = sizebar_height + "px";
		}
		
		// Update Component Displays
		//this._map.updateDisplay(this.options.width, this.options.map_height, animate, d, sizebar_height);
		this._storyslider.updateDisplay(this.options.width, this.options.storyslider_height, animate );
		this._sizebar.updateDisplay(this.options.width, this.options.height, animate);
		
	},
	
	/*	Events
	================================================== */
	
	_onSlideChange: function(e) {
		if (this.current_slide != e.current_slide) {
			this.current_slide = e.current_slide;
			this._map.goTo(this.current_slide);
			this.fire("change", {current_slide: this.current_slide}, this);
		}
	},
	
	_onMapChange: function(e) {
		if (this.current_slide != e.current_marker) {
			this.current_slide = e.current_marker;
			this._storyslider.goTo(this.current_slide);
			this.fire("change", {current_slide: this.current_slide}, this);
		}
	},
	
	_onSizeBar: function(e) {
		trace("ON SIZEBAR");
	},
	
	_onSizeBarMove: function(e) {
		this._updateDisplay(e.y);
	},
	
	_onSizeBarSwipe: function(e) {
		this._updateDisplay(e.y, true);
	},
	
	_onMouseClick: function(e) {
		
	},
	
	_fireMouseEvent: function (e) {
		if (!this._loaded) {
			return;
		}

		var type = e.type;
		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) {
			return;
		}

		if (type === 'contextmenu') {
			VCO.DomEvent.preventDefault(e);
		}
		
		this.fire(type, {
			latlng: "something", //this.mouseEventToLatLng(e),
			layerPoint: "something else" //this.mouseEventToLayerPoint(e)
		});
	},
	
	_onLoaded: function() {
		this.fire("loaded", this.data);
	}
	
	
});

