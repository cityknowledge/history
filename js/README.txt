This folder contains various code used on the website.


Preamble ---------------------------------------------------
Note that the HTML document located at ../index.html is set
up to use a minified version of this code, located at
min.js. If this code needs to be modified, the minified
version must be recomputed. For debugging purposes, a
comment exists in the HTML document explaining how to use
the unminified versions of this code. 
------------------------------------------------------------

Minification -----------------------------------------------
To minify the code, uglifyjs was used, with the following
command on Windows:

type util.js TimePeriod.js interceptWheel.js size.js draw.js scroll.js windowattr.js eventHandle.js animations.js search.js bookmarks2.js login.js addevent.js text.js encycl.js sticky2.js fbc.js flag.js dates.js random.js controller.js | uglifyjs --mangle --screw-ie8
------------------------------------------------------------

Files ------------------------------------------------------
The code for the website is broken up into several 
individual files, eachrunning a particular part of the code
necessary for the site. These files are enumerated below,
in the order in which they are included on the website:

    util.js ------------------------------------------------
	Contains the utility functions necessary for various
	conversions on the site.
	
	    yearToSliderPos(number) ----------------------------
		This function takes in a year, and will return the
		number of pixels between the left side of the slider
		and the location of that year on the slider. Note
		that this does NOT adjust for the resizing of the
		upper slider.
		----------------------------------------------------
		
		sliderPosToYear(number) ----------------------------
		This function takes in a pixel measurement on the
		slider bar and returns a year. Note that this does
		NOT adjust for the resizing of the upper slider.
		----------------------------------------------------
		
		panelNoToXPos(number) ------------------------------
		This function takes in the number of a panel, 
		numbering from 0 on the left and counting only
		panels that are being shown, and returns the x
		position of the left side of that panel in the body
		of the page.
		----------------------------------------------------
		
		scrollToYear(number) -------------------------------
		Finds the first event that is currently shown in a
		given year, and scrolls to its location on the page.
		If there are no events shown in that year, it will
		scroll to the location of the first event after
		that year.
		----------------------------------------------------
		
		xPosToPanelNumber(number) --------------------------
		Takes in an distance in pixels from the left side of
		the page body and returns the number of the panel
		located there, numbering from 0 at the left and
		counting only panels that are being shown.
		----------------------------------------------------
		
		mouseEventToPanelNumber(object) --------------------
		Takes in a mouse event object (or other object with 
		positioning data in the same style) and returns the
		number of the panel that is vertically aligned to
		the location of that event, numbering from 0 on the
		left and counting only panels that are being shown.
		----------------------------------------------------
		
		getFirstEventShown() -------------------------------
		Returns the number of the first panel being shown on
		the screen (within a tolerance), numbering from 0 on
		the left and counting only panels that are being
		shown.
		----------------------------------------------------
		
		sliderPosToRealSliderPos(number) -------------------
		Performs the correction for the resizing of the
		upper slider when called on the argument to
		yearToSliderPos(number). See existing code for
		examples.
		----------------------------------------------------
		
		realSliderPosToSliderPos(number) -------------------
		Performs the correction for the resizing of the
		upper slider when called on the return value of
		sliderPosToYear(number). See existing code for
		examples.
		----------------------------------------------------
		
		insertSorted(array, value) -------------------------
		Inserts the value into the array by performing
		insertion sort on the array. This assumes that the
		given array is already sorted.
		----------------------------------------------------
		
		calculatePercentileThreshold(number) ---------------
		Calculates the cutoff for deterimining the number of
		views needed for an event to be in the top n%.
		----------------------------------------------------
		
		generateSubset(set, cutoff) ------------------------
		Returns a subset of the given set consisting of all
		elements whose Count member is greater than or
		equal to the cutoff.
		----------------------------------------------------
		
	--------------------------------------------------------
	
	TimePeriod.js ------------------------------------------
	This file contains the TimePeriod pseudoclass and the
	enumeration of time periods used in the timeline. It 
	also contains functions pertaining to TimePeriod 
	objects.
	
		TimePeriod(title, start, end, color) ---------------
		Constructor. Returns a new object whose fields are
		consistent with a time period. The given title, 
		start year, end year, and color will be used.
		
			isInRange(year) --------------------------------
			Returns true if the year is greater than or
			equal to this time period's start year, and less
			than or equal to its end year. Returns false
			otherwise.
			------------------------------------------------
			
			isEventInRange(event) --------------------------
			Returns true if the event's year is greater than
			or equal to this time period's start year, and
			less than or equal to its end year. Returns
			false otherwise.
			------------------------------------------------
		
		----------------------------------------------------
		
		getTimePeriodFromYear(year) ------------------------
		Returns the time period that contains the given 
		year.
		----------------------------------------------------
		
	--------------------------------------------------------
	
	interceptWheel.js --------------------------------------
	This code is taken from the Mozilla Developer Wiki page
	at https://developer.mozilla.org/en-US/docs/Web/Events/wheel.
	It was wretten by Mozilla Contributors, and is licensed
	under CC-0.
	
	Produces necessary functionality for the website to
	intercept input from the mouse scrollwheel without the
	page scrolling.
	
		addWheelListener(elem, callback, useCapture) -------
		Creates a new listener that will get called when the
		scrollwheel is manipulated while the mouse is 
		hovering over elem (usually body). Callback will be
		called when active.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	size.js ------------------------------------------------
	This file is used for resizing objects on the page. As
	most of this functionality was replaced with CSS 
	calculations, it only resizes the canvas element.
	
		size() ---------------------------------------------
		Resizes the canvas element based on the width of the
		page.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	draw.js ------------------------------------------------
	Contains the information necessary to draw the static
	elements of the canvas.
	
		draw(canvasState, mx, my) --------------------------
		Draws the static elements of the canvas based on the
		provided canvasState. Mx and my are legacy
		parameters, and no longer have any effect on the
		usage or result of this function.
		----------------------------------------------------
		
		calculateInterval(range) ---------------------------
		Calculates the year interval between adjacent tick
		marks on the upper timeline based on the range of
		years being displayed on it. In the future, this
		may also take into account the width of the page.
		----------------------------------------------------
		
		drawTicks(left, width, ctx, top, bottom, state) ----
		Calculates how many ticks are drawn, where they get
		drawn, and what years are displayed, based on the
		given left side, total width, context, top, bottom,
		and canvasState.
		----------------------------------------------------
		
		drawTick(x, label, context, top, bottom) -----------
		Draws a single tick at the given x-location with the
		appropriate vertical location based on the given top
		and bottom with the given label on the given 
		context.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	scroll.js ----------------------------------------------
	Contains code related to page scrolling, and the global
	flag shouldScroll.
	
		shouldScroll ---------------------------------------
		True if and only if the active layer is the
		panelset, i.e. if no popups are open.
		----------------------------------------------------
		
		scroll(event) --------------------------------------
		Takes in a scroll event (or similar) and scrolls the
		page horizontally by taking the horizontal scroll
		component and adding it to the horizontal scroll 
		component if and only if shouldScroll is true.
		Otherwise, does nothing.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	windowattr.js ------------------------------------------
	Contains various window attributes and global variables.
	
		scrollVal ------------------------------------------
		The rate at which the page is currently scrolling.
		----------------------------------------------------
		
		relocate -------------------------------------------
		True if and only if dynamic elements on the canvas
		should be allowed to move.
		----------------------------------------------------
		
		controllerLoad() -----------------------------------
		Runs when the controller has loaded. Initializes
		functions for stopping the canvas from causing 
		unintended side-effects. Also introduces an
		interval-repeat to scroll the page by scrollVal * 25
		every 250 milliseconds.
		----------------------------------------------------
		
		onresize() -----------------------------------------
		Called when the window is resized. Calls
		size.js::size() and redraws the canvas.
		----------------------------------------------------
		
		onscroll() -----------------------------------------
		Responsible for moving the slider when the page is
		scrolled.
		----------------------------------------------------
		
		handleParams() -------------------------------------
		Handles parameters placed after a ? in the web
		address. The following parameters are recognized:
		
			event ------------------------------------------
			An event ID, indicating an event to be opened
			automatically when the page is loaded.
			------------------------------------------------
		
		----------------------------------------------------
		
	--------------------------------------------------------
	
	eventHandle.js -----------------------------------------
	Contains code responsible for drawing and storing
	information relating to the dynamic canvas elements.
	
		Rectangle(x, y, width, height, fill, image) --------
		Creates a new object with the properties of a
		rectangle. Can be used to draw a rectangle with the
		given location (x, y), the given width and height,
		the given fill color, and background image.
		Rectangles also have the following member functions:
		
			drawRect(context) ------------------------------
			Draws a rectangle with its width and height at
			the location specified by its x and y with its
			fill color and background image on the given
			context.
			------------------------------------------------
			
			contains(mx, my) -------------------------------
			Returns true if the location mx, my is within
			the rectangle.
			------------------------------------------------
		
		----------------------------------------------------
		
		CanvasState(canvas) --------------------------------
		Creates a new object with the properties of a
		canvas state, associated with the given canvas.
		Also converts the canvas into a sliderbar.
		
			eventListener:mousedown(event) -----------------
			Called when the canvas sliderbar is clicked. 
			Checks and handles the event appropriately, by
			marking a slider as selected if necessary.
			------------------------------------------------
			
			eventListener:mousemove(event) -----------------
			Called when the mouse moves over the canvas
			sliderbar. If a slider is selected, this
			function will move that slider and update the
			page accordingly if necessary.
			------------------------------------------------
			
			eventlistener:mouseup(event) -------------------
			Called when the mouse is released. Unselects
			all sliders.
			------------------------------------------------
			
			clear() ----------------------------------------
			Clears the entire canvas.
			------------------------------------------------
			
			drawState() ------------------------------------
			Draws the dynamic components of the canvas if
			they have been changed, and makes a call to
			draw.js::draw() to draw static elements if
			necessary.
			------------------------------------------------
			
			getMouse(event) --------------------------------
			Returns an object containing the x, y positions
			from a mouse event or similar.
			------------------------------------------------
		
		----------------------------------------------------
		
	--------------------------------------------------------
	
	animations.js ------------------------------------------
	Contains code relevant to animating page elements.
	
		hover(id, selected) --------------------------------
		Applies the hover animation to the element with id
		id. This animation differes based on whether or not
		the element is active or selected, which is conveyed
		using the boolean flag selected.
		----------------------------------------------------
		
		unhover(id, selected) ------------------------------
		Applies the unhover animation to the element with id
		id. This animation differes based on whether or not
		the element is active or selected, which is conveyed
		using the boolean flag selected.
		----------------------------------------------------
		
		unobscure() ----------------------------------------
		Begins the animation which hides the obscure layer
		to unobscure the main timeline layer.
		----------------------------------------------------
		
		hideInfoPanel() ------------------------------------
		Begins the animation to hide the infopanel.
		----------------------------------------------------
		
		enopanim() -----------------------------------------
		Begins the animations related to the opening of the
		encyclopedia panel. The infopanel will resize and 
		move to the left, and the encyclopedia panel will
		fade in.
		----------------------------------------------------
		
		enclanim() -----------------------------------------
		Begins the animations related to the closing of the
		encyclopedia panel. The infopanel will resize and
		center itself, and the encyclopedia panel will fade
		out.
		----------------------------------------------------
		
		toggleAdvSearch() ----------------------------------
		Performs the animation related to showing and hiding
		the advanced search tools at the top of the page,
		accessed by clicking on Mostra/Nasconda segnalibri.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	search.js ----------------------------------------------
	Legacy file.
	
		searchchange() -------------------------------------
		Legacy function. Formerly used to switch between
		the year and keyword search modes manually. This
		process was later automated.
		----------------------------------------------------
		
	--------------------------------------------------------
	
	bookmarks2.js ------------------------------------------
	Contains code for functionality related to bookmarks.
	
		addBookmark(group, key, text) ----------------------
		Adds a bookmark in the given group, associated with
		the given event key, and containing the specified
		text.
		----------------------------------------------------
		
		remBookmark(group, key) ----------------------------
		Removes the bookmark in the given group which was
		associated with the given event key.
		----------------------------------------------------
		
		getBookmarks(group) --------------------------------
		Returns a list of all bookmarks in the given group.
		----------------------------------------------------
		
		getBookmarkText(group, key) ------------------------
		Returns the text associated with the bookmark in the
		given group associated with the given event key.
		----------------------------------------------------
		
		newGroup() -----------------------------------------
		Prompts for a group name and creates a new group
		with that name.
		----------------------------------------------------
		
		getGroups() ----------------------------------------
		Returns a list of group names.
		----------------------------------------------------
		
		getAllBookmarks() ----------------------------------
		Returns a list of all event keys with associated
		bookmarks, regardless of group.
		----------------------------------------------------
		
		hasBookmark(group, key) ----------------------------
		Returns true if there is a bookmark in the specified
		group associated with the given event key.
		----------------------------------------------------
		
	--------------------------------------------------------
	
	login.js -----------------------------------------------
	Contains code related to login information.
	
		loggedIn() -----------------------------------------
		Called when the user logs into the page. Replaces
		the login button with the logout button and unhides
		the add event button.
		----------------------------------------------------
		
		loggedOut() ----------------------------------------
		Called when the user logs out of the page. Replaces
		the logout button with the login button and hides
		the add event button.
		----------------------------------------------------
		
		login() --------------------------------------------
		Attempts to log the user in using the information
		they entered. Uses FireBase.authWithPassword() to do
		so. Check the FireBase documentation online for more
		information.
		----------------------------------------------------
		
		logout() -------------------------------------------
		Logs out the user using FireBase.unauth(). Check the
		FireBase documentation for more information.
		----------------------------------------------------
		
		openLogin() ----------------------------------------
		Shows the login form.
		----------------------------------------------------
		
		closeLogin() ---------------------------------------
		Hides the login form.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	addEvent.js --------------------------------------------
	Contains code related to the functionality of the add
	event form, along with explicit error checking on 
	inputs.
	
		openAEF() ------------------------------------------
		Opens the add event form.
		----------------------------------------------------
		
		closeAEF() -----------------------------------------
		Closes the add event form.
		----------------------------------------------------
		
		addEvent() -----------------------------------------
		Performs error checking on the input, then, if all
		tests pass, it generates a timestamp and submits the
		code to FireBase to add to the records. The checks 
		that are performed are:
		
			Year -------------------------------------------
			Year must not be empty. Year must be a positive
			integer.
			------------------------------------------------
			
			Content ----------------------------------------
			Content must not be empty.
			------------------------------------------------
			
			Citation ---------------------------------------
			Citation must not be empty.
			------------------------------------------------
			
			Month ------------------------------------------
			If present, month must be one of the following:
			Gennaio
			Febbraio
			Marzo
			Aprile
			Maggio
			Giugno
			Luglio
			Agosto
			Settembre
			Ottobre
			Novembre
			Dicembre
			------------------------------------------------
			
			Date -------------------------------------------
			If present, date must be an integer between 0
			and 31. If date is given, month must have been
			given.
			------------------------------------------------
			
		----------------------------------------------------
		
	--------------------------------------------------------
	
	text.js ------------------------------------------------
	Contains code related to the text exporter function.
	
		genFile(joiner) ------------------------------------
		Generates the text of the events, citations, and
		notes and concatenates them. Joiner is the character
		to be used as a line break. Usually, this is either
		"\n" or "<br>".
		----------------------------------------------------
		
		download(filename, text, win) ----------------------
		Generates the body of the file. If win === window,
		then it will download the file automatically.
		Otherwise, it will display a link to the download.
		----------------------------------------------------
		
		presentPage() --------------------------------------
		Opens a new window or tab, depending on the browser,
		and presents the content of the file generated by
		genFile(), along with the link from download().
		----------------------------------------------------
		
		presentDown() --------------------------------------
		Generates the file to download and downloads it.
		----------------------------------------------------
		
	--------------------------------------------------------
	
	encycl.js ----------------------------------------------
	Contains code related to the encyclopedia function.
		
		openEncycl(artname) --------------------------------
		Opens the encyclopedia panel and displays the 
		article with the given name.
		----------------------------------------------------
		
	--------------------------------------------------------
	
	sticky2.js ---------------------------------------------
	Contains code related to the sticky function of
	bookmarks.
	
		stickyText(text) -----------------------------------
		Fills in the text field of the sticky box with the
		given text.
		----------------------------------------------------
		
		stickyButtons(exists, group, key) ------------------
		Puts the buttons in the sticky box.
		----------------------------------------------------
		
		updateSticky(group, key) ---------------------------
		Fills in the sticky panel with the applicable
		information based on the given bookmark group and
		event key.
		----------------------------------------------------
		
		stickySelect() -------------------------------------
		Populates the bookmark groups dropdown box in the
		sticky panel.
		----------------------------------------------------
		
		popsticky() ----------------------------------------
		Opens the stickypanel. Note that this function does
		not follow the normal naming conventions for these
		methods.
		----------------------------------------------------
		
		closeSticky() --------------------------------------
		Closes the sticky panel.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	fbc.js -------------------------------------------------
	Contains main thread information related to FireBase 
	Count augmenter.
	
		sendFBCUD(key, value) ------------------------------
		//Send FireBase Count Update// Spawns a worker 
		(worker/fbcworker.js) which sends an update to 
		FireBase to update the count of the event with the 
		given key to be equal to the given value. Note that 
		this function can fail silently if value is less 
		than the current value.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	flag.js ------------------------------------------------
	Contains main thread code related to the flagging system
	on FireBase.
	
		flag(key) ------------------------------------------
		Prompts the user for a brief description of the
		problem they found with the event in question, and
		then spawns a worker (worker/flagworker.js) which 
		sends an update to FireBase to add the flag to the 
		database.
		----------------------------------------------------
		
	--------------------------------------------------------
	
	dates.js -----------------------------------------------
	Contains code responsible for updating the fields on the
	add event form to contain only valid values.
	
		calcdates() ----------------------------------------
		Checks to see which dates would be valid in the
		selected month, and disables it if there is no month
		selected. The options are numeric, according to  the
		following rules:
		
			aprile, giugno, settembre, novembre ------------
			None, and numbers 1 - 30.
			------------------------------------------------
			
			febbraio ---------------------------------------
			None, and numbers 1 - 29.
			------------------------------------------------
			
			gennaio, marzo, luglio, agosto, ottobre, 
			dicembre ---------------------------------------
			None, and numbers 1 - 31.
			------------------------------------------------
			
		----------------------------------------------------
		
	--------------------------------------------------------
	
	random.js ----------------------------------------------
	Contains code related to the random event feature.
	
		random() -------------------------------------------
		Selects and opens a random event.
		----------------------------------------------------
	
	--------------------------------------------------------
	
	controller.js ------------------------------------------
	Contains the AngularJS controller for the application,
	as well as some global variables.
	
		FB -------------------------------------------------
		The global instance of FireBase, which is used for
		most requests, and to check user authorization on
		login.
		----------------------------------------------------
		
		app ------------------------------------------------
		The instance of the Angular application.
		----------------------------------------------------
		
		maxZoom --------------------------------------------
		Constant marking the maximum zoom level of the
		application.
		----------------------------------------------------
		
		app.controller:controllerTimeline ------------------
		The loading function for the controller.
		
			$scope.zoom ------------------------------------
			The current zoom level of the application
			------------------------------------------------
			
			$scope.search ----------------------------------
			The current search terms of the application
			------------------------------------------------
			
			$scope.actsearch -------------------------------
			Used to store search terms prior to activation.
			------------------------------------------------
			
			$scope.filter ----------------------------------
			The currently shown bookmark group.
			------------------------------------------------
			
			$scope.ipevent ---------------------------------
			The panel number, counting from 1 on the left,
			of the currently open panel. Note that this 
			value is one-indexed, not zero-indexed. Make
			sure you double-check when using this value to
			avoid an off-by-one!!! 0 indicates no open
			event.
			------------------------------------------------
			
			$scope.timePeriods -----------------------------
			The array of time periods.
			------------------------------------------------
			
			$scope.ftype -----------------------------------
			Legacy variable.
			------------------------------------------------
			
			$scope.tp --------------------------------------
			The current time period.
			------------------------------------------------
			
			FB/child:history/on:value(snapshot) ------------
			Called when FireBase data gets back. Causes the
			page to transition from loading screen to main 
			content.
			------------------------------------------------
			
			$scope.getEvents() -----------------------------
			Returns the active events object. These are 
			defined in this table:
			 ______________________________________________
			| View Name               #   Events Object    |
			|----------------------------------------------|
			| Century View            0   $scope.centuries |
			| Most Important Events   1   $scope.events1   |
			| Important Events        2   $scope.events2   |
			| All Events              3   $scope.events    |
			|______________________________________________|
			
			------------------------------------------------
			
			$scope.zoomIn() --------------------------------
			Increases the zoom level if not already at max.
			------------------------------------------------
			
			$scope.callback() ------------------------------
			Note that this function does NOT work as
			intended!!! Do not use without fixing first.
			Intended to make a callback after Angular 
			finishes its current update, or immediately if
			not updating.
			------------------------------------------------
			
			$scope.zoomOut() -------------------------------
			Decreases the zoom level if not already at 0.
			------------------------------------------------
			
			$scope.renderHtml(html_code) -------------------
			Allows html code to be rendered through Angular.
			------------------------------------------------
			
			$scope.scroll(val) -----------------------------
			Sets the global scroll per tick to val.
			------------------------------------------------
			
			$scope.stopScroll() ----------------------------
			Zeros the global scroll per tick.
			------------------------------------------------
			
			$scope.remSpec(string) -------------------------
			Removes special characters from the given string
			and returns the cleaned version.
			------------------------------------------------
			
			$scope.displayInfoPanel(events, panelNo) -------
			Displays the correct event, given the ONE-
			INDEXED panel number and the current events
			object.
			------------------------------------------------
			
			$scope.mouseEventToPanelNo ---------------------
			See util.js::mouseEventToPanelNo(event)
			------------------------------------------------
			
			$scope.hideInfoPanel ---------------------------
			See util.js::hideInfoPanel().
			------------------------------------------------
			
			$scope.obscure() -------------------------------
			Renders the obscure layer, greying out the
			timeline.
			------------------------------------------------
			
			$scope.unobscure -------------------------------
			See animations.js::unobscure().
			------------------------------------------------
			
			$scope.barAct(key) -----------------------------
			Handles functionality of the close, last, and
			next buttons at the top of the info panels.
			------------------------------------------------
			
			$scope.updateSearch(event) ---------------------
			Called when a key is pressed in the search box.
			If the enter key is pressed, copy the value in 
			$scope.actsearch to $scope.search.
			------------------------------------------------
			
			$scope.scrollToYear ----------------------------
			See util.js::scrollToYear(number).
			------------------------------------------------
			
			$scope.zoomWithDest(period) --------------------
			Legacy function. Zooms in, simultaneously
			scrolling to the start of the given time
			period.
			------------------------------------------------
			
			$scope.getFilter() -----------------------------
			Returns the correct search based on whether the
			search should be interpreted as a year search or
			as a keyword search.
			------------------------------------------------
			
			$scope.bookmark() ------------------------------
			Legacy function. No longer works.
			------------------------------------------------
			
			$scope.getGroups() -----------------------------
			See bookmarks2.js::getGroups().
			------------------------------------------------
			
			$scope.hasBookmark(a, b) -----------------------
			See bookmarks2.js::hasBookmark(group, key).
			------------------------------------------------
			
			$scope.getFirstEventShown ----------------------
			See util.js::getFirstEventShown()
			------------------------------------------------
			
			$scope.newGroup --------------------------------
			See bookmarks2.js::newGroup().
			------------------------------------------------
			
			$scope.getText(text) ---------------------------
			Returns a truncated version of the given text
			for rendering on event panels.
			------------------------------------------------
			
			$scope.sendFBCUD -------------------------------
			See fbc.js::sendFBCUD(key, value).
			------------------------------------------------
			
			$scope.auth ------------------------------------
			FireBase authentication data if the user is 
			logged in. False otherwise.
			------------------------------------------------
			
			$scope.getTimePeriodFromYear -------------------
			See TimePeriods.js::getTimePeriodFromYear(year).
			------------------------------------------------
			
			$scope.getColor(event) -------------------------
			Gets the correct color for the given event based
			on the time period to which it belongs.
			------------------------------------------------
			
			$scope.zoomTo(level) ---------------------------
			Zooms directly to the given zoom level. Be
			careful, as this function does not have bounds
			checking!!!
			------------------------------------------------
		
		----------------------------------------------------
		
	--------------------------------------------------------
	
------------------------------------------------------------