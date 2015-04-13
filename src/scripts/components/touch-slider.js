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
			"color" : "color-2"
			
		}, 
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 2,
			"color" : "color-1"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 3,
			"color" : "color-2"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 4,
			"color" : "color-1"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 5,
			"color" : "color-2"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 6,
			"color" : "color-1"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 7,
			"color" : "color-2"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 8,
			"color" : "color-1"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 9,
			"color" : "color-2"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 10,
			"color" : "color-1"
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 11,
			"color" : "color-2"		
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 12,
			"color" : "color-1"			
		},
		{
			"url" : "http://placehold.it/1024x768",
			"order" : 13,
			"color" : "color-2"	
		}
];

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var Slide = React.createClass({
	render: function () {
		var style= {
			width: windowWidth,
			webkitTransform: "translateX(" + this.props.translate + ")",
			transition: "-webkit-transform " + this.props.transition + " ease-in-out"
		};
		var cx = React.addons.classSet;
		//var classString = this.props.order ;
		 var classes = cx('single-slide', 'slide-' + this.props.order, this.props.color);
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

// var Slide = React.createClass({
// 	render: function () {
// 		var style= {
// 			webkitTransform: "translateX(" + this.props.translate + ")",
// 			transition: "-webkit-transform " + this.props.transition + " ease-in-out"
// 		};
// 		var cx = React.addons.classSet;
// 		//var classString = this.props.order ;
// 		 var classes = cx('single-slide', 'slide-' + this.props.order);
// 		return (
// 			<div style={style} className={classes}>
// 				<span>{this.props.order}</span>
// 				<img src={this.props.imgBg} />
// 			</div>
// 		);
// 	}
// });

var coord = {};
coord.timer = false;
var SlideList = React.createClass({

	onTouchStart: function (e) {
		 // * get initial x-coordinate on touchstart 
		if (!coord.timer) {
			coord.startX = e.changedTouches[0].pageX;
			// * prevent user to do multiple touch too quickly
			coord.timer = true;
			console.log("touchstart", coord.timer);
		}
		
	},
	onTouchMove: function (e) {
		// * get x-coordinate on touchmove 
		if (coord.timer) {
			coord.endX = e.changedTouches[0].pageX; 
			coord.delta = coord.endX - coord.startX;
			this.setState({
					translate: coord.delta + "px",
					transition: 0
				});
			console.log("touchmove", coord.timer);
		}
		// console.log(coord.delta);
	},
	onTouchEnd: function (e) {
		// *** get x-coordinate on touchend
		coord.endX = e.changedTouches[0].pageX;
		var self = this,
        	direction,
			translateLeft = coord.endX - coord.startX;
		// * prevent user to do multiple touch too quickly
		if (!coord.timer) {
			translateLeft = 0;
		}
		setTimeout(function () {
			coord.timer = false;
			console.log("touchend after", coord.timer);
		}, 1000);
		console.log("touchend before", coord.timer, translateLeft);
		// * get the direction X coordinate on touchend minus X coordinate on touchstart
        if (coord.endX > coord.startX) {
            direction = 'right';
        } else {
            direction = 'left';
        }
        
        // * if endX - startX is less then 150px I reset the slide to 0
        if (Math.abs(translateLeft) < 5) {
        		console.log(Math.abs(translateLeft));
        } else if (Math.abs(translateLeft) < 150) {
            translateLeft = 0;
        } else {
            if (direction === 'left') {
            	// * Last slide shouldn't go right            
            	if (self.state.count === data.length) {
            		translateLeft = 0;
            	} else {
            		translateLeft = '-' + windowWidth + 'px';
            	}
            } else {
            	// * First slide shouldn't go left 
            	if (self.state.count === 1) {
            		translateLeft = 0;
            	} else {
            		translateLeft = windowWidth + 'px';
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
			transform = "-" + windowWidth + "px";
		}
		var slidesToShow = activeSlides(this.state.count);
		var slideWrapperWidth = slidesToShow.length;
		var style = {
			width: windowWidth * slideWrapperWidth + "px",
			height: "768px",
			webkitTransform: "translateX(" + transform + ")"
		};

		return (
			<div id="slide-wrapper" style={style} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>{ slidesToShow.map(function (s) {

				return <Slide imgBg={s.url} order={s.order} color={s.color} translate={this.state.translate} transition={this.state.transition + "s"} />;
			}, this)}</div>
		);
	}
});

React.render(
	<SlideList />, 
	document.getElementById('content')
); // jshint ignore:line

module.exports = SlideList;