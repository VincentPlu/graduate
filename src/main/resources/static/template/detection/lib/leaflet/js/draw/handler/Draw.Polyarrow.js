var Arrow=function(){
	var calculator=function(){
		var offset=10;
		var calculateStartPoint=function(current,next){
			var a = Math.atan2((next.y-current.y),(next.x-current.x));
			if(a < 0) {
				a = a + 2 * Math.PI;
			}
			var k = Math.PI / 2 + a;
			
			var x = current.x + offset * Math.cos(k);
			var y = current.y + offset * Math.sin(k);
			return new L.Point(x,y);
		};
		var calculatePoint=function(previous,current,next){
			var a = Math.atan2((next.y-current.y),(next.x-current.x));
			if(a < 0) {
				a = a + 2 * Math.PI;
			}
			var b = Math.atan2((current.y-previous.y), (current.x - previous.x));
			if(b < 0) {
				b = b + 2 * Math.PI;
			}
			if(Math.abs(Math.abs(b - a) - Math.PI) < 1){
				return calculateStartPoint(current,next);
			}
			
			var k = (b - a - Math.PI) / 2;
			
			var r = a + k;
			var d = offset / Math.sin(k);
			var x = current.x + d * Math.cos(r);
			var y = current.y + d * Math.sin(r);
			return new L.Point(x,y);
		};
		var calculateEndPoint=function(previous,current){
			var a = Math.atan2((current.y-previous.y),(current.x-previous.x));
			if(a < 0) {
				a = a + 2 * Math.PI;
			}
			var k = Math.PI / 2 + a;
			
			var x = current.x + offset * Math.cos(k);
			var y = current.y + offset * Math.sin(k);
			return new L.Point(x,y);
		};
		var calculateEndCenterPoint=function(previous,current){
			var a = Math.atan2((current.y-previous.y),(current.x-previous.x));
			if(a < 0) {
				a = a + 2 * Math.PI;
			}
			var k = Math.PI / 2 - a;
			
			var x = current.x + offset * Math.sin(k);
			var y = current.y + offset * Math.cos(k);
			return new L.Point(x,y);
		};
		this.calculatePoints=function(points,distance){
			distance=distance||10;
			var result=[];
			if(points.length>2){
				offset=distance;
				result.push(calculateStartPoint(points[0],points[1]));
				for(var i=1;i<points.length-1;i++){
					result.push(calculatePoint(points[i-1],points[i],points[i+1]));
				}
				result.push(calculateEndPoint(points[points.length-2],points[points.length-1]));
				offset=distance+10;
				result.push(calculateEndPoint(points[points.length-2],points[points.length-1]));
				result.push(calculateEndCenterPoint(points[points.length-2],points[points.length-1]));
				offset=0-offset;
				result.push(calculateEndPoint(points[points.length-2],points[points.length-1]));
				offset=0-distance;
				result.push(calculateEndPoint(points[points.length-2],points[points.length-1]));
				for(var i=points.length-2;i>0;i--){
					result.push(calculatePoint(points[i-1],points[i],points[i+1]));
				}
				result.push(calculateStartPoint(points[0],points[1]));
			}else if(points.length>1){
				var start=points[0];
				var end=points[1];
				offset=distance;
				result.push(calculateStartPoint(start,end));
				result.push(calculateEndPoint(start,end));
				offset=distance+10;
				result.push(calculateEndPoint(start,end));
				result.push(calculateEndCenterPoint(start,end));
				offset=0-offset;
				result.push(calculateEndPoint(start,end));
				offset=0-distance;
				result.push(calculateEndPoint(start,end));
				result.push(calculateStartPoint(start,end));
			}else{
			}
			return result;
		};
	}
	return new calculator();
}();
L.Draw.Polyarrow = L.Draw.Feature.extend({
	statics: {
		TYPE: 'polyline'
	},

	Poly: L.Polyline,

	options: {
		allowIntersection: true,
		repeatMode: false,
		drawError: {
			color: '#b00b00',
			timeout: 2500
		},
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		guidelineDistance: 20,
		maxGuideLineLength: 4000,
		shapeOptions: {
			stroke: true,
			color: 'transparent',
			weight: 10,
			opacity: 0.2,
			fill: false,
			clickable: true
		},
		metric: true, // Whether to use the metric measurement system or imperial
		feet: true, // When not metric, to use feet instead of yards for display.
		nautic: false, // When not metric, not feet use nautic mile for display
		showLength: true, // Whether to display distance in the tooltip
		zIndexOffset: 2000 // This should be > than the highest z-index any map layers
	},
	// @method initialize(): void
	initialize: function (map, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}

		// Need to set this here to ensure the correct message is used.
		this.options.drawError.message = L.drawLocal.draw.handlers.polyline.error;

		// Merge default drawError options with custom options
		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}
		this.arrowOptions={
			subType:"arrow",
			stroke: true,
			color: '#3388ff',
			weight: 24,
			opacity: 0.5,
			fill: false,
			clickable: true
		}
		this.headOptions={
			stroke: true,
			color: '#3388ff',
			weight: 8,
			opacity: 1,
			fill: false
		}
		
		this.leftOptions={
			color: '#3388ff',
			weight: 4,
			opacity: 1,
			offset: -10
		}
		this.rightOptions={
			color: '#3388ff',
			weight: 4,
			opacity: 1,
			offset: 10
		}
		
		if (options && options.color) {
			this.arrowOptions.color=options.color;
			this.headOptions.color=options.color;
			this.leftOptions.color=options.color;
			this.rightOptions.color=options.color;
		}
		if (options && options.type) {
			this.arrowOptions.subType=options.type;
		}
		if (options && options.dashArray) {
			this.arrowOptions.dashArray=options.dashArray;
			this.leftOptions.dashArray=options.dashArray;
			this.rightOptions.dashArray=options.dashArray;
		}
		if(options && options.decorators){
			this.decorators=options.decorators;
		}
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polyline.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._markers = [];

			this._markerGroup = new L.LayerGroup();
			this._map.addLayer(this._markerGroup);

			this._arrow = new L.Polyline([], this.arrowOptions);
			
			this._leftLine= new L.Polyline([], this.leftOptions);
			this._rightLine= new L.Polyline([], this.rightOptions);
			
			this._poly = new L.Polyline([], this.options.shapeOptions);

			this._tooltip.updateContent(this._getTooltipText());

			// Make a transparent marker that will used to catch click events. These click
			// events will create the vertices. We need to do this so we can ensure that
			// we can create vertices over other map layers (markers, vector layers). We
			// also do not want to trigger any click handlers of objects we are clicking on
			// while drawing.
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('mouseout', this._onMouseOut, this)
				.on('mousemove', this._onMouseMove, this) // Necessary to prevent 0.8 stutter
				.on('mousedown', this._onMouseDown, this)
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.8 compatibility
				.addTo(this._map);

			this._map
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.7 compatibility
				.on('mousemove', this._onMouseMove, this)
				.on('zoomlevelschange', this._onZoomEnd, this)
				.on('touchstart', this._onTouch, this)
				.on('zoomend', this._onZoomEnd, this);

		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		this._clearHideErrorTimeout();

		this._cleanUpShape();

		// remove markers from map
		this._map.removeLayer(this._markerGroup);
		delete this._markerGroup;
		delete this._markers;

		this._poly && this._map.removeLayer(this._poly);
		this._leftLine && this._map.removeLayer(this._leftLine);
		this._rightLine && this._map.removeLayer(this._rightLine);
		this._arrow && this._map.removeLayer(this._arrow);
		this._arrowHead && this._map.removeLayer(this._arrowHead);
		
		delete this._poly;

		this._mouseMarker
			.off('mousedown', this._onMouseDown, this)
			.off('mouseout', this._onMouseOut, this)
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this);
		this._map.removeLayer(this._mouseMarker);
		delete this._mouseMarker;

		// clean up DOM
		this._clearGuides();

		this._map
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this)
			.off('zoomlevelschange', this._onZoomEnd, this)
			.off('zoomend', this._onZoomEnd, this)
			.off('touchstart', this._onTouch, this)
			.off('click', this._onTouch, this);
	},

	// @method deleteLastVertex(): void
	// Remove the last vertex from the polyline, removes polyline from map if only one point exists.
	deleteLastVertex: function () {
		if (this._markers.length <= 1) {
			return;
		}

		var lastMarker = this._markers.pop(),
			poly = this._poly,
			// Replaces .spliceLatLngs()
			latlngs = poly.getLatLngs(),
			latlng = latlngs.splice(-1, 1)[0];
		this._poly.setLatLngs(latlngs);

		this._markerGroup.removeLayer(lastMarker);

		if (poly.getLatLngs().length < 2) {
			this._map.removeLayer(poly);
		}

		this._vertexChanged(latlng, false);
	},

	// @method addVertex(): void
	// Add a vertex to the end of the polyline
	addVertex: function (latlng) {
		var markersLength = this._markers.length;
		// markersLength must be greater than or equal to 2 before intersections can occur
		if (markersLength >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(latlng)) {
			this._showErrorTooltip();
			return;
		}
		else if (this._errorShown) {
			this._hideErrorTooltip();
		}

		this._markers.push(this._createMarker(latlng));

		this._poly.addLatLng(latlng);

		if (this._poly.getLatLngs().length === 2) {
			this._map.addLayer(this._poly);
		}

		this._vertexChanged(latlng, true);
	},

	// @method completeShape(): void
	// Closes the polyline between the first and last points
	completeShape: function () {
		if (this._markers.length <= 1) {
			return;
		}

		this._fireCreatedEvent();
		this.disable();

		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_finishShape: function () {
		var latlngs = this._poly._defaultShape ? this._poly._defaultShape() : this._poly.getLatLngs();
		var intersects = this._poly.newLatLngIntersects(latlngs[latlngs.length - 1]);

		if ((!this.options.allowIntersection && intersects) || !this._shapeIsValid()) {
			this._showErrorTooltip();
			return;
		}

		this._fireCreatedEvent();
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	// Called to verify the shape is valid when the user tries to finish it
	// Return false if the shape is not valid
	_shapeIsValid: function () {
		return true;
	},

	_onZoomEnd: function () {
		if (this._markers !== null) {
			this._updateGuide();
		}
	},

	_onMouseMove: function (e) {
		var newPos = this._map.mouseEventToLayerPoint(e.originalEvent);
		var latlng = this._map.layerPointToLatLng(newPos);

		// Save latlng
		// should this be moved to _updateGuide() ?
		this._currentLatLng = latlng;

		this._updateTooltip(latlng);

		// Update the guide line
		this._updateGuide(newPos);

		// Update the mouse marker position
		this._mouseMarker.setLatLng(latlng);

		this._updateArrow(latlng);
		
		L.DomEvent.preventDefault(e.originalEvent);
	},

	_vertexChanged: function (latlng, added) {
		this._map.fire(L.Draw.Event.DRAWVERTEX, { layers: this._markerGroup });
		this._updateFinishHandler();

		this._updateRunningMeasure(latlng, added);

		this._clearGuides();

		this._updateTooltip();
	},

	_onMouseDown: function (e) {
		if (!this._clickHandled && !this._touchHandled && !this._disableMarkers) {
			this._onMouseMove(e);
			this._clickHandled = true;
			this._disableNewMarkers();
			var originalEvent = e.originalEvent;
			var clientX = originalEvent.clientX;
			var clientY = originalEvent.clientY;
			this._startPoint.call(this, clientX, clientY);
		}
	},

	_startPoint: function (clientX, clientY) {
		this._mouseDownOrigin = L.point(clientX, clientY);
	},

	_onMouseUp: function (e) {
		var originalEvent = e.originalEvent;
		var clientX = originalEvent.clientX;
		var clientY = originalEvent.clientY;
		this._endPoint.call(this, clientX, clientY, e);
		this._clickHandled = null;
	},

	_endPoint: function (clientX, clientY, e) {
		if (this._mouseDownOrigin) {
			var dragCheckDistance = L.point(clientX, clientY)
				.distanceTo(this._mouseDownOrigin);
			var lastPtDistance = this._calculateFinishDistance(e.latlng);
			if (lastPtDistance < 10 && L.Browser.touch) {
				this._finishShape();
			} else if (Math.abs(dragCheckDistance) < 9 * (window.devicePixelRatio || 1)) {
				this.addVertex(e.latlng);
			}
			this._enableNewMarkers(); // after a short pause, enable new markers
		}
		this._mouseDownOrigin = null;
	},

	// ontouch prevented by clickHandled flag because some browsers fire both click/touch events,
	// causing unwanted behavior
	_onTouch: function (e) {
		var originalEvent = e.originalEvent;
		var clientX;
		var clientY;
		if (originalEvent.touches && originalEvent.touches[0] && !this._clickHandled && !this._touchHandled && !this._disableMarkers) {
			clientX = originalEvent.touches[0].clientX;
			clientY = originalEvent.touches[0].clientY;
			this._disableNewMarkers();
			this._touchHandled = true;
			this._startPoint.call(this, clientX, clientY);
			this._endPoint.call(this, clientX, clientY, e);
			this._touchHandled = null;
		}
		this._clickHandled = null;
	},

	_onMouseOut: function () {
		if (this._tooltip) {
			this._tooltip._onMouseOut.call(this._tooltip);
		}
	},

	// calculate if we are currently within close enough distance
	// of the closing point (first point for shapes, last point for lines)
	// this is semi-ugly code but the only reliable way i found to get the job done
	// note: calculating point.distanceTo between mouseDownOrigin and last marker did NOT work
	_calculateFinishDistance: function (potentialLatLng) {
		var lastPtDistance
		if (this._markers.length > 0) {
				var finishMarker;
				if (this.type === L.Draw.Polyline.TYPE) {
					finishMarker = this._markers[this._markers.length - 1];
				} else if (this.type === L.Draw.Polygon.TYPE) {
					finishMarker = this._markers[0];
				} else {
					return Infinity;
				}
				var lastMarkerPoint = this._map.latLngToContainerPoint(finishMarker.getLatLng()),
				potentialMarker = new L.Marker(potentialLatLng, {
					icon: this.options.icon,
					zIndexOffset: this.options.zIndexOffset * 2
				});
				var potentialMarkerPint = this._map.latLngToContainerPoint(potentialMarker.getLatLng());
				lastPtDistance = lastMarkerPoint.distanceTo(potentialMarkerPint);
			} else {
				lastPtDistance = Infinity;
			}
			return lastPtDistance;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;
		// The last marker should have a click handler to close the polyline
		if (markerCount > 1) {
			this._markers[markerCount - 1].on('click', this._finishShape, this);
		}

		// Remove the old marker click handler (as only the last point should close the polyline)
		if (markerCount > 2) {
			this._markers[markerCount - 2].off('click', this._finishShape, this);
		}
	},

	_createMarker: function (latlng) {
		var marker = new L.Marker(latlng, {
			icon: this.options.icon,
			zIndexOffset: this.options.zIndexOffset * 2
		});

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_updateGuide: function (newPos) {
		var markerCount = this._markers ? this._markers.length : 0;

		if (markerCount > 0) {
			newPos = newPos || this._map.latLngToLayerPoint(this._currentLatLng);

			// draw the guide line
			this._clearGuides();
			this._drawGuide(
				this._map.latLngToLayerPoint(this._markers[markerCount - 1].getLatLng()),
				newPos
			);
		}
	},
	_toArrowPoints:function(latLngs){
		var finalPoints=[];
		var points=[];
		for(var i in latLngs){
			points.push(this._map.latLngToLayerPoint(latLngs[i]));
		}
		finalPoints=Arrow.calculatePoints(points,8);
		finalLatLngs=[];
		for(var i in finalPoints){
			finalLatLngs.push(this._map.layerPointToLatLng(finalPoints[i]));
		}
		return latLngs;
	},
	//根据当前折线画出箭头样式
	_updateArrow:function(latlng){
		var markerCount = this._markers ? this._markers.length : 0;
		var points=[];
		if (markerCount > 0) {
			for(var i =0;i<markerCount;i++){
				points.push(this._markers[i].getLatLng());
			}
			latlng = latlng || this._currentLatLng
			points.push(latlng);
			// 移除先前的箭头，重新绘制
			var arrowPoints=this._toArrowPoints(points);
			this._arrow.setLatLngs(arrowPoints);
			this._leftLine.setLatLngs(arrowPoints);
			this._rightLine.setLatLngs(arrowPoints);
			
			this._map.addLayer(this._arrow);
			this._map.addLayer(this._leftLine);
			this._map.addLayer(this._rightLine);
			//return;
			if(this.decorators){
				this._decorators=this._decorators||[];
				for(var i in this._decorators){
					this._decorators[i].removeFrom(this._map);
				}
				this._decorators=[];
				for(var i in this.decorators){
					var tempDecorator= L.polylineDecorator(this._arrow, {
						name:this.decorators[i].name,
						patterns:this.decorators[i] .patterns
					}).addTo(this._map);
					this._decorators.push(tempDecorator);
				}
			}
			if(this._arrowHead) this._arrowHead.removeFrom(this._map);
			this._arrowHead= L.polylineDecorator(this._arrow, {
				patterns: [
					{offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 30, polygon: false, pathOptions: this.headOptions})}
				]
			}).addTo(this._map);
		}
	},
	
	_updateTooltip: function (latLng) {
		var text = this._getTooltipText();

		if (latLng) {
			this._tooltip.updatePosition(latLng);
		}

		if (!this._errorShown) {
			this._tooltip.updateContent(text);
		}
	},

	_drawGuide: function (pointA, pointB) {
		var length = Math.floor(Math.sqrt(Math.pow((pointB.x - pointA.x), 2) + Math.pow((pointB.y - pointA.y), 2))),
			guidelineDistance = this.options.guidelineDistance,
			maxGuideLineLength = this.options.maxGuideLineLength,
			// Only draw a guideline with a max length
			i = length > maxGuideLineLength ? length - maxGuideLineLength : guidelineDistance,
			fraction,
			dashPoint,
			dash;

		//create the guides container if we haven't yet
		if (!this._guidesContainer) {
			this._guidesContainer = L.DomUtil.create('div', 'leaflet-draw-guides', this._overlayPane);
		}

		//draw a dash every GuildeLineDistance
		for (; i < length; i += this.options.guidelineDistance) {
			//work out fraction along line we are
			fraction = i / length;

			//calculate new x,y point
			dashPoint = {
				x: Math.floor((pointA.x * (1 - fraction)) + (fraction * pointB.x)),
				y: Math.floor((pointA.y * (1 - fraction)) + (fraction * pointB.y))
			};

			//add guide dash to guide container
			dash = L.DomUtil.create('div', 'leaflet-draw-guide-dash', this._guidesContainer);
			dash.style.backgroundColor =
				!this._errorShown ? this.options.shapeOptions.color : this.options.drawError.color;

			L.DomUtil.setPosition(dash, dashPoint);
		}
	},

	_updateGuideColor: function (color) {
		if (this._guidesContainer) {
			for (var i = 0, l = this._guidesContainer.childNodes.length; i < l; i++) {
				this._guidesContainer.childNodes[i].style.backgroundColor = color;
			}
		}
	},

	// removes all child elements (guide dashes) from the guides container
	_clearGuides: function () {
		if (this._guidesContainer) {
			while (this._guidesContainer.firstChild) {
				this._guidesContainer.removeChild(this._guidesContainer.firstChild);
			}
		}
	},

	_getTooltipText: function () {
		var showLength = this.options.showLength,
			labelText, distanceStr;
		if (L.Browser.touch) {
			showLength = false; // if there's a better place to put this, feel free to move it
		}
		if (this._markers.length === 0) {
			labelText = {
				text: L.drawLocal.draw.handlers.polyline.tooltip.start
			};
		} else {
			distanceStr = showLength ? this._getMeasurementString() : '';

			if (this._markers.length === 1) {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.cont,
					subtext: distanceStr
				};
			} else {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.end,
					subtext: distanceStr
				};
			}
		}
		return labelText;
	},

	_updateRunningMeasure: function (latlng, added) {
		var markersLength = this._markers.length,
			previousMarkerIndex, distance;

		if (this._markers.length === 1) {
			this._measurementRunningTotal = 0;
		} else {
			previousMarkerIndex = markersLength - (added ? 2 : 1);
			distance = latlng.distanceTo(this._markers[previousMarkerIndex].getLatLng());

			this._measurementRunningTotal += distance * (added ? 1 : -1);
		}
	},

	_getMeasurementString: function () {
		var currentLatLng = this._currentLatLng,
			previousLatLng = this._markers[this._markers.length - 1].getLatLng(),
			distance;

		// calculate the distance from the last fixed point to the mouse position
		distance = previousLatLng && currentLatLng && currentLatLng.distanceTo ? this._measurementRunningTotal + currentLatLng.distanceTo(previousLatLng) : this._measurementRunningTotal || 0 ;

		return L.GeometryUtil.readableDistance(distance, this.options.metric, this.options.feet, this.options.nautic, this.options.precision);
	},

	_showErrorTooltip: function () {
		this._errorShown = true;

		// Update tooltip
		this._tooltip
			.showAsError()
			.updateContent({ text: this.options.drawError.message });

		// Update shape
		this._updateGuideColor(this.options.drawError.color);
		this._poly.setStyle({ color: this.options.drawError.color });

		// Hide the error after 2 seconds
		this._clearHideErrorTimeout();
		this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorTooltip, this), this.options.drawError.timeout);
	},

	_hideErrorTooltip: function () {
		this._errorShown = false;

		this._clearHideErrorTimeout();

		// Revert tooltip
		this._tooltip
			.removeError()
			.updateContent(this._getTooltipText());

		// Revert shape
		this._updateGuideColor(this.options.shapeOptions.color);
		this._poly.setStyle({ color: this.options.shapeOptions.color });
	},

	_clearHideErrorTimeout: function () {
		if (this._hideErrorTimeout) {
			clearTimeout(this._hideErrorTimeout);
			this._hideErrorTimeout = null;
		}
	},

	// disable new markers temporarily;
	// this is to prevent duplicated touch/click events in some browsers
	_disableNewMarkers: function () {
		this._disableMarkers = true;
	},

	// see _disableNewMarkers
	_enableNewMarkers: function () {
		setTimeout(function() {
			this._disableMarkers = false;
		}.bind(this), 50);
	},

	_cleanUpShape: function () {
		if (this._markers.length > 1) {
			this._markers[this._markers.length - 1].off('click', this._finishShape, this);
		}
	},

	_fireCreatedEvent: function () {
		var poly = new this.Poly(this._arrow.getLatLngs(), this.arrowOptions);
		
		var leftPolyline = L.polyline(this._arrow.getLatLngs(), this.leftOptions);

		var rightPolyline = L.polyline(this._arrow.getLatLngs(), this.rightOptions);
		
		poly.options.partObjs=[leftPolyline,rightPolyline,L.polylineDecorator(this._arrow, {
			patterns: [
				{offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 30, polygon: false, pathOptions: this.headOptions})}
			]
		})];
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, poly);
	}
});
