/*jslint plusplus: true*/
/*global $, draw, scrollToYear, sliderPosToYear, relocate:true*/

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
function Rectangle(x, y, w, h, fill) {
    'use strict';
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#551a8b';
    
    //test function for rectangle draw
    this.drawRect = function (ctx) {
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
    
    //tests to see if a given corrdinate is contained by a rectagle
    this.contains = function (mx, my) {
        return (this.x <= mx) && (this.x + this.w >= mx) &&
                (this.y <= my) && (this.y + this.h >= my);
    };
    
}




function onAxisClick() {
    'use strict';
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
        body = document.getElementsByTagName("body")[0];
    
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
    this.slider = new Rectangle(30, 17, 30, 15);
    //keep trac of if something is being dragged
    this.dragging = false;
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
        } else {
            relocate = false;
            myState.slider.x = mx - myState.slider.w / 2;
            scrollToYear(sliderPosToYear(mx));
            myState.valid = false;
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
        //If the mouse has something slected move that selection
        if (myState.dragging) {
            var mouse = myState.getMouse(e),
                left = 22,
                right = t - 38;
            
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
                scrollToYear(sliderPosToYear(myState.slider.x));
                myState.getMouse(e);
            }
            
        }//!endif
        
    }, true);
    
    /*
    Mouse listener which listens for mouse release
    */
    body.addEventListener('mouseup', function (e) {
        //On mouse release the slider is no longer being dragged
        myState.dragging = false;
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
            draw();
            
            //draw the schroller
            shape.drawRect(ctx);
            
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
        var element = this.canvas,
            offsetX = 0,
            offsetY = 0,
            scrollOffSet = 0,
            mx,
            my;
            
        
        //Compute offset
        while (element.offsetParent) {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
            element = element.offsetParent;
        }
        
        scrollOffSet = document.documentElement.scrollLeft || document.body.scrollLeft;
        
        //Add padding
        offsetX += this.stylePaddingLeft + this.styleBorderLeft +  this.styleLeft + scrollOffSet;
        offsetY += this.stylePaddingTop + this.styleBorderTop +  this.styleTop;
    
        mx = e.pageX - offsetX - 8;
        my = e.pageY - offsetY + 21;
        
        //return location
        return {x: mx, y: my};
    };
    
}//!CanvasState
 