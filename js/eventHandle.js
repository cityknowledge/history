/*jshint browser: true*/
/*global $, draw, scrollToYear, sliderPosToYear, relocate:true, sliderPosToRealSliderPos*/

//http://simonsarris.com/blog/510-making-html5-canvas-useful

/*
File which defines the slider
Author: August Beers
*/

/*
Class which defines the shape of a rectangle
This enttiry class deliminates the atributes of a
rectangle on a canvas
*/
function Rectangle(x, y, w, h, fill, img) {
    'use strict';
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#551a8b';
    this.img = img || null;
    
    //test function for rectangle draw
    this.drawRect = function (ctx) {
        if (this.img) {
            this.img.onload = function () {ctx.drawImage(img, this.x, this.y, this.w, this.h);};
            ctx.drawImage(img, this.x, this.y, this.w, this.h);
        } else {
            ctx.fillStyle = this.fill;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    };
    
    //tests to see if a given corrdinate is contained by a rectagle
    this.contains = function (mx, my) {
        return (this.x <= mx) && (this.x + this.w >= mx) &&
                (this.y <= my) && (this.y + this.h >= my);
    };
    
}

/*
Class which difines the current state of a canvas
*/
function CanvasState(canvas) {
    'use strict';
    //a copy of the givent canvas
    this.canvas = canvas;
    //the width of the canvas
    this.width = canvas.width;
    //the height of a canvas
    this.height = canvas.height;
    //the ctx of the canvas
    this.ctx = canvas.getContext('2d');
    
    this.leftSide = 400;
    this.rightSide = new Date().getFullYear();
    
    //account for doc padding
    var w = window,
        d = document,
        e = d.documentElement,
        g = $('body'),
        t = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight,
        articles = $("article"),
        x,
        n = y - 280,
        imgs = $("img"),
        h = n - 100,
        myState = this,
        body = document.getElementsByTagName("body")[0],
        left = 22,
        right = t - 38;
    
    if (document.defaultView && document.defaultView.getComputedStyle) {
        //left padding of the canvas
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingLeft, 10) || 0;
        //top padding of the canvas
        this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingTop, 10) || 0;
        //left border of the canvas(may allways resolve to 0)
        this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null).borderLeftWidth, 10) || 0;
        //top border of the canvas(may allways resolve to 0)
        this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null).borderTopWidth, 10) || 0;
        //Fixed position top
        this.styleTop         = y - parseInt($("#timeAxis").css("bottom"), 10) - parseInt($("canvas")[0].getAttribute("height"), 10) || 0;
        //Fixed position left
        this.styleLeft        = parseInt($("#timeAxis").css("margin-left"), 10) || 0;
    }//!if
        
    //keep track of state!
    //if false the canvas must redraw
    this.valid = false; //redraw variable
    
    /*
    Initialize all rectangles here, could be an arrray of sliders instead of one
    */
    var img = new Image();
    img.src = "icon/slider.png";
    this.slider = new Rectangle(0, 5, 10, 40, "rgba(256, 256, 256, 1)", img);
    var img2 = new Image();
    img2.src = "icon/sla.png";
    this.left = new Rectangle(22, 60, 10, 40, "rgba(256, 256, 256, 1)", img2);
    var img3 = new Image();
    img3.src = "icon/sra.png";
    this.right = new Rectangle(t - 44, 60, 10, 40, "rgba(256, 256, 256, 1)", img3);
    //keep trac of if something is being dragged
    this.dragging = false;
    this.dragleft = false;
    this.dragright = false;
    this.dragboth = false;
    //keep track of current selection
    this.selection = null;
    //location of drag change x
    this.dragoffx = 0;
    //location of drage change y
    this.dragoffy = 0;
    
    
    /*
    Event listener for mouse press
    */
    canvas.addEventListener('mousedown', function (e) {
        
        //get the mouse press position
        var mouse = myState.getMouse(e),
            mx = mouse.x,
            my = mouse.y,
            mySel = null,
            npos,
            oldScroll,
            nscroll;
        
        //did the mouse press occur on a slider?
        if (myState.slider.contains(mx, my)) {
            //A selection has occured
            
            mySel = myState.slider;
            //begin to move
            myState.dragoffx = mx - mySel.x;
            myState.dragoffy = mySel.y; //do not change Y
            //set dragging to true
            myState.dragging = true;
            relocate = false;
            //Save the selction
            myState.selection = mySel;
            //
            myState.valid = false;
            return;
        } else if (myState.left.contains(mx, my)) {
            mySel = myState.left;
            myState.dragoffx = mx - mySel.x;
            myState.dragoffy = mySel.y;
            myState.dragleft = true;
            relocate = false;
            myState.selection = mySel;
            myState.valid = false;
            return;
        } else if (myState.right.contains(mx, my)) {
            mySel = myState.right;
            myState.dragoffx = mx - mySel.x;
            myState.dragoffy = mySel.y;
            myState.dragright = true;
            relocate = false;
            myState.selection = mySel;
            myState.valid = false;
            return;
        } else if (new Rectangle(myState.left.x, 60, myState.right.x - myState.left.x, 20).contains(mx, my)) {
            // Between the two bottom sliders
            myState.dragoffx = mx - myState.left.x;
            myState.dragoffy = my - myState.left.y;
            myState.dragboth = true;
            relocate = false;
            myState.selection = {orig: 0, x: 0};
            myState.valid = false;
            return;
        } else {
            // No selection has occurred
            
            if (my <= (0.5 * myState.height) && mx <= right && mx >= left) {
                //in the North half, between the ends of the sliderbar
                relocate = false;
                myState.slider.x = mx - myState.slider.w / 2;
                scrollToYear(sliderPosToRealSliderPos(sliderPosToYear(mx)));
                myState.valid = false;
            }
        }
    
    
    //if no return no selection has occurs then we have unselected        
        if (myState.selection) {
            myState.selection = null;
            myState.valid = false;
        }//!if
        
    }, true);
    
    /*
    Mouse listener which lisens for a mouse move
    */
    body.addEventListener('mousemove', function (e) {
        var mouse = myState.getMouse(e), temp1, temp2;
        
        //If the mouse has something slected move that selection
        if (myState.dragging) {
            
            //try to move the slider
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.valid = false;
            
            //check to so if slider has gone off the timeline on left or right side
            if (myState.selection.x < left - (myState.selection.w / 2)) {
                
                myState.selection.x = left - (myState.selection.w / 2);
                
            } else if (myState.selection.x > right - (myState.selection.w / 2)) {
                
                myState.selection.x = right - (myState.selection.w / 2);
                
            }
            
            //add functionality to scrooll timeline here
            if (myState.dragging) {
                scrollToYear(sliderPosToRealSliderPos(sliderPosToYear(myState.slider.x)));
                myState.getMouse(e);
            }
            
        } else if (myState.dragleft) {
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.valid = false;
            
            if (myState.selection.x < left - (myState.selection.w / 2)) {
                myState.selection.x = left - (myState.selection.w / 2);
            } else if (myState.selection.x >= myState.right.x) {
                myState.selection.x = myState.right.x;
            }
            
            myState.leftSide = Math.floor(sliderPosToYear(myState.selection.x));
            
        } else if (myState.dragright) {
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.valid = false;
            
            if (myState.selection.x < myState.left.x) {
                myState.selection.x = myState.left.x;
            } else if (myState.selection.x > right - (myState.selection.w / 2)) {
                myState.selection.x = right - (myState.selection.w / 2);
            }
            
            myState.rightSide = Math.ceil(sliderPosToYear(myState.selection.x));
        } else if (myState.dragboth) {
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.valid = false;
            temp1 = myState.selection.x + myState.selection.orig;
            temp2 = myState.selection.x + myState.selection.orig + myState.right.x - myState.left.x;
            
            if (temp1 < left - (myState.left.w / 2)) {
                temp1 = left - (myState.left.w / 2);
            }
            if (temp2 < left - (myState.right.w / 2)) {
                temp2 = left - (myState.right.w / 2);
            }
            if (temp2 > right - (myState.right.w / 2)) {
                temp2 = right - myState.right.w / 2;
            }
            if (temp1 > right - (myState.left.w / 2)) {
                temp1 = right - (myState.left.w / 2);
            }
            
            myState.right.x = temp2;
            myState.left.x = temp1;
            
            
            myState.leftSide = Math.floor(sliderPosToYear(myState.left.x));
            myState.rightSide = Math.ceil(sliderPosToYear(myState.right.x));
        }
        
    }, true);
    
    /*
    Mouse listener which listens for mouse release
    */
    body.addEventListener('mouseup', function (e) {
        //On mouse release the slider is no longer being dragged
        myState.dragging = false;
        myState.dragleft = false;
        myState.dragright = false;
        myState.dragboth = false;
        relocate = true;
        
        
    }, true);
    
    /*
    More Canvas State varia le
    */
    //outline of a selection
    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    
    /*
    Interval timer to check if the canvas must redraw, calls draw state
    every 30 milliseconds
    */
    
    this.interval = 30;
    setInterval(function () { myState.drawState(); }, myState.interval);
    
    this.clear = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    
    /*
    Function which checks to see if the Canvas must be redrawn and
    does so if nessisary
    */
    this.drawState = function () {
        
        //If current canvas does not represent canvas state redraw
        if (!this.valid) {
            
            var ctx = this.ctx, shape = this.slider, mySel;
            this.clear();
            
            //draw the timeline
            try {
				draw(myState);
			} catch (e) {
				console.log(e);
				window.setTimeout(this.drawState, 100);
				return;
			}
            
            //draw the schroller
            shape.drawRect(ctx);
            this.left.drawRect(ctx);
            this.right.drawRect(ctx);
			
			//draw the connectors
			ctx.beginPath();
			ctx.strokeStyle = "#ffcc00";
			ctx.moveTo(this.left.x, this.left.y);
			ctx.lineTo(this.right.x + this.right.w, this.right.y);
			ctx.moveTo(this.left.x, this.left.y + this.left.h);
			ctx.lineTo(this.right.x + this.right.w, this.right.y + this.right.h);
			ctx.stroke();
			ctx.closePath();
            
            //check to see if selected
            if (this.selection !== null) {
                mySel = this.selection;
            }
            
            this.valid = true;
            
        }
    };
    
    /*
    Mehthod which returns the current position of the mouse in the
    Canvas
    */
    this.getMouse = function (e) {
        var mx,
            my;
        
        mx = e.clientX - 8;
        my = e.clientY - y + parseInt($("div#timeAxis").css("bottom"), 10) + parseInt($("canvas").css("height"), 10);
        
        //return location
        return {x: mx, y: my};
    };
    
}//!CanvasState
 