/*******************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2011, 2013 OpenWorm.
 * http://openworm.org
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the MIT License
 * which accompanies this distribution, and is available at
 * http://opensource.org/licenses/MIT
 *
 * Contributors:
 *      OpenWorm - http://openworm.org/people.html
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 *******************************************************************************/
/**
 * Controller class for plotting widget. Use to make calls to widget from inside Geppetto.
 *
 * @author Jesus R Martinez (jesus@metacell.us)
 */
define(function(require) {

	var AWidgetController = require('widgets/AWidgetController');
	var Plot = require('widgets/plot/Plot');

	/**
	 * @exports Widgets/Plot/PlotsController
	 */
	return AWidgetController.View.extend ({

		initialize: function() {
			this.widgets = new Array();
		 },
		 
		/**
		 * Creates plotting widget
		 */
		addPlotWidget: function() {

			//Plot widget number
			var index = 1;
			//Name of plotting widget
			var name = "Plot" + index;

			for(var p in this.widgets){
				if(this.widgets[p].getId() == name){
					index++;
					name = "Plot" + index;
				}
			}
			var id = name;

			//create plotting widget
			var p = window[name] = new Plot({id:id, name:name,visible:true});

			//create help command for plot
			p.help = function(){return GEPPETTO.Console.getObjectCommands(id);};

			//store in local stack
			this.widgets.push(p);

			GEPPETTO.WidgetsListener.subscribe(this, id);

			//add commands to console autocomplete and help option
			GEPPETTO.Console.updateCommands("assets/js/widgets/plot/Plot.js", p, id);
			//update tags for autocompletion
			GEPPETTO.Console.updateTags(p.getId(), p);
			return p;
		},

		/**
		 * Receives updates from widget listener class to update plotting widget(s)
		 * 
		 * @param {WIDGET_EVENT_TYPE} event - Event that tells widgets what to do
		 */
		update: function(event) {
			//delete plot widget(s)
			if(event == GEPPETTO.WidgetsListener.WIDGET_EVENT_TYPE.DELETE) {
				this.removeWidgets();
			}

			//reset plot's datasets
			else if(event == GEPPETTO.WidgetsListener.WIDGET_EVENT_TYPE.RESET_DATA) {
				for(var i = 0; i < this.widgets.length; i++) {
					var plot = this.widgets[i];

					plot.cleanDataSets();
				}
			}

			//update plotting widgets
			else if(event == GEPPETTO.WidgetsListener.WIDGET_EVENT_TYPE.UPDATE) {
				//loop through all existing widgets
				for(var i = 0; i < this.widgets.length; i++) {
					var plot = this.widgets[i];

					//update plot with new data set
					plot.updateDataSet();
				}
			}
		}

	});
});
