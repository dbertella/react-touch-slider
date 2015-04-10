'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var _ = require('underscore');

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

React.initializeTouchEvents(true);
// var imageURL = require('../../images/yeoman.png');

// var TestReactApp = React.createClass({
//   render: function() {
//     return (
//       <div className='main'>
//         <ReactTransitionGroup transitionName="fade">
//           <img src={imageURL} />
//         </ReactTransitionGroup>
//       </div>
//     );
//   }
// });
var data = [
	{
			"url" : "http://placehold.it/1024x768",
			"order" : 1,
			"media" : null
			
		}, 
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 2,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 3,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 4,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 5,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 6,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 7,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 8,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 9,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 10,
			"media" : null
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 11,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 12,
			"media" : null		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 13,
			"media" : null		
		}
];

var Slide = React.createClass({
	render: function () {
		var style= {
			webkitTransform: "translateX(" + this.props.translate + ")",
			transition: "-webkit-transform " + this.props.transition + " ease-in-out"
		};
		var cx = React.addons.classSet;
		//var classString = this.props.order ;
		 var classes = cx('single-slide', 'slide-' + this.props.order);
		return (
			<div style={style} className={classes}>
				<span>{this.props.order}</span>
				<img src={this.props.imgBg} />
			</div>
		);
	}
});


var activeSlides = function (slideId) {
	var slideToShow = [];
	if (slideId > 1) {
		slideToShow.push(_.find(data, { "order": slideId -1 }));
	}

	slideToShow.push(_.find(data, { "order": slideId }));
	
	if (slideId < data.length ) {
		slideToShow.push(_.find(data, { "order": slideId + 1 }));
	}
	
	return slideToShow;
};

var Slide = React.createClass({
	render: function () {
		var style= {
			webkitTransform: "translateX(" + this.props.translate + ")",
			transition: "-webkit-transform " + this.props.transition + " ease-in-out"
		};
		var cx = React.addons.classSet;
		//var classString = this.props.order ;
		 var classes = cx('single-slide', 'slide-' + this.props.order);
		return (
			<div style={style} className={classes}>
				<span>{this.props.order}</span>
				<img src={this.props.imgBg} />
			</div>
		);
	}
});



var coord = {};

var SlideList = React.createClass({

	initialCoord: function (e) {
		 // * get initial x-coordinate on touchstart 
		coord.startX = e.changedTouches[0].pageX; 
	},
	onMove: function (e) {
		 // * get x-coordinate on touchmove 
		coord.endX = e.changedTouches[0].pageX; 
		coord.delta = coord.endX - coord.startX;
		this.setState({
				translate: coord.delta + "px",
				transition: 0
			});
	},
	incrementCount: function (e) {
		// *** get x-coordinate on touchend
		coord.endX = e.changedTouches[0].pageX;
		var self = this,
        	direction,
			translateLeft = coord.endX - coord.startX;

		// * get the direction X coordinate on touchend minus X coordinate on touchstart
        if (coord.endX > coord.startX) {
            direction = 'right';
        } else {
            direction = 'left';
        }

        // * if endX - startX is less then 150px I reset the slide to 0
        if (Math.abs(translateLeft) < 150) {
            translateLeft = 0;
            
        } else {
            if (direction === 'left') {
            	// * Last slide shouldn't go right            
            	if (self.state.count === data.length) {
            		translateLeft = 0;
            	} else {
            		translateLeft = '-1024px';
            	}
            } else {
            	// * First slide shouldn't go left 
            	if (self.state.count === 1) {
            		translateLeft = 0;
            	} else {
            		translateLeft = '1024px';
            	}
            }
        } 

		self.setState({
			translate: translateLeft,
			transition: 0.3
		});
		if (translateLeft){
			setTimeout(function () {
				if (direction === 'left') {                  
				    self.setState({
						count: self.state.count + 1,
						translate: 0,
						transition: 0
					});
				} else {                    
				    self.setState({
						count: self.state.count -1,
						translate: 0,
						transition: 0
					});
				}
			}, 300); 
		} else {
			setTimeout(function () {
				self.setState({
					transition: 0
				});
			}, 300); 
		}
		// if (self.state.count <= data.length) {
		// 	self.setState({
		// 		translate: translateLeft,
		// 		transition: 0.3
		// 	});
			
		// } else {
		// 	self.setState({
		// 		translate: translateLeft,
		// 		transition: 0.3
		// 	});
		// }

	},
	getInitialState: function () {
		return {
			count: 1,
			translate: 0,
			transition: 0.3
		};
	},
	
	render: function () {
		var transform,
			transition;
		if (this.state.count === 1) {
			transform = 0;
		} else {
			transform = "-1024px";
		}
		var slidesToShow = activeSlides(this.state.count);
		var slideWrapperWidth = slidesToShow.length;
		var style = {
			width: 1024 * slideWrapperWidth + "px",
			height: "768px",
			webkitTransform: "translateX(" + transform + ")"
		};

		return (
			<div id="slide-wrapper" style={style} onTouchStart={this.initialCoord} onTouchMove={this.onMove} onTouchEnd={this.incrementCount}>{ slidesToShow.map(function (s) {

				return <Slide imgBg={s.url} order={s.order} translate={this.state.translate} transition={this.state.transition + "s"} />;
			}, this)}</div>
		);
	}
});

React.render(
	<SlideList />, 
	document.getElementById('content')
); // jshint ignore:line

module.exports = SlideList;