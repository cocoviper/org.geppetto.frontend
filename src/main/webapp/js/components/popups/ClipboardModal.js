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
 ******************************************************************************
 */
 /**
 * Modal used to display info messages received from server
 *
 */
define(function (require) {

    var React = require('react'),
        $ = require('jquery');

    return React.createClass({
        mixins: [
            require('jsx!mixins/bootstrap/modal')
        ],
        
        getDefaultProps: function() {
            return {
                title: 'Message',
                text: '',
                buttonLabel: 'Ok', 
                onClick: function(){}              
            }
        },
        
        render: function (){
        	return <div className="modal fade" id="javascriptEditor">
        			<div className="modal-dialog">
        			<div className="modal-content">
        				<div className="modal-header" id="infomodal-header">
        					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
        					<h3 id="jsEditor-title" className="text-center">{this.props.title}</h3>
        				</div>
        				<div className="modal-body">
	        				<div className="controls">
	        					<textarea id="javascriptCode" name="javascriptCode" className="javascriptCode_loading"></textarea>
	        					<button id="javascriptFullscreen" type="button" className="button icon-fullscreen"></button>
	        				</div>
	        			</div>
        				<div className="modal-footer" id="infomodal-footer">
        			 		<button  id="jsEditor-btn" className="btn btn-warning" data-dismiss="modal" aria-hidden="true"  dangerouslySetInnerHTML={{__html: this.props.buttonLabel}}>
                                                </button>
        			 	</div>
        			 </div>
              		 </div>
        		  </div>
        }
    });
});
