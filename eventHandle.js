/*jslint plusplus: true*/
/*global $, draw*/

//http://simonsarris.com/blog/510-making-html5-canvas-useful

/*
File which defines the slider
Author: August Beers
*/

//Class which defines the shape of a rectangle
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

function CanvasState(canvas) {
    'use strict';
    
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
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
        myState = this;
    
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingLeft, 10) || 0;
        this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingTop, 10) || 0;
        this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null).borderLeftWidth, 10) || 0;
        this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null).borderTopWidth, 10) || 0;
        this.styleTop         = y - parseInt($("#timeAxis").css("bottom"), 10) - parseInt($("canvas")[0].getAttribute("height"), 10) || 0;
        this.styleLeft        = parseInt($("#timeAxis").css("margin-left"), 10) || 0;
    }//!if
        
    //keep track of state!
    this.valid = false; //redraw variable
    this.slider = new Rectangle(0, 0, 15, 15);
    this.dragging = false; //keeps track of when dragging occurs
    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;
    
    
    canvas.addEventListener('mousedown', function (e) {
        
        var mouse = myState.getMouse(e),
            mx = mouse.x,
            my = mouse.y,
            mySel = null;
        
        alert(mx + " " + my);
        alert(myState.slider.contains(mx, my));
        if (myState.slider.contains(mx, my)) {
            alert("yo2");
            mySel = myState.slider;
            //begin to move
            myState.dragoffx = mx - mySel.x;
            myState.dragoffy = my - mySel.y;
            myState.dragging = true;
            myState.selection = mySel;
            myState.valid = false;
            myState.valid = false;
            return;
        }//!if
    
    
    //if no return no selection has occured
                            
        if (myState.selection) {
            myState.selection = null;
            myState.valid = false;
        }//!if
        
    }, true);
    
    canvas.addEventListener('mousemove', function (e) {
        if (myState.dragging) {
            var mouse = myState.getMouse(e);
            
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.selection.y = mouse.y - myState.dragoffy;
            
            myState.valid = false;
            
        }//!endif
        
    }, true);
    
    canvas.addEventListener('mouseup', function (e) {
        myState.dragging = false;
    }, true);
    
    //options
    
    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function () { myState.drawState(); }, myState.interval);
    
    this.clear = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    
    this.drawState = function () {
        
        if (!this.valid) {
            
            var ctx = this.ctx, shape = this.slider, mySel;
            this.clear();
            
            //draw the timeline
            draw();
            
            //draw the schroller
            shape.drawRect(ctx);
            
            
            //check to see if selected
            if (this.selection !== null) {
                ctx.strokeStyle = this.selectionColor;
                ctx.lineWidth = this.selectionWidth;
                mySel = this.selection;
                
                ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
                
            }
            
            this.valid = true;
            
        }
    };
    
    this.getMouse = function (e) {
        var element = this.canvas,
            offsetX = 0,
            offsetY = 0,
            mx,
            my;
            
        
        //Compute offset
        while (element.offsetParent) {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
            element = element.offsetParent;
        }
        
        //Add padding
        offsetX += this.stylePaddingLeft + this.styleBorderLeft +  this.styleLeft;
        offsetY += this.stylePaddingTop + this.styleBorderTop +  this.styleTop;
    
        mx = e.pageX - offsetX - 8;
        my = e.pageY - offsetY + 21;
        
        //return location
        return {x: mx, y: my};
    };
    
}//!CanvasState
