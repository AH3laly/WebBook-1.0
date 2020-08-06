/*
* Author: Abdelrahman Helaly
* Contact: < AH3laly@gmail.com , https://Github.com/AH3laly >
* Project: WebBook 1.0
* Description: Simple responsive HTML & JS script to publish Web Books.
* License: Science not for Monopoly.
*/
function webBook(){

    var self = this;
    this.actionToDo = null;
    this.numberOfPages = 10;
    this.pageToGo = 0;
    
    this.init = function(numberOfPages){
        
        if(numberOfPages){
            self.numberOfPages = numberOfPages;
        }
        
        if(parseInt(self.numberOfPages) === 1){
            $(".arrow-next, .arrow-prev").hide();
        }
        
        self.setAvailableArrows();
        self.setArrowsPosition();
        
        $(".arrow-next").click(function(){
            self.setActionToDo("next");
            self.nextPage();
        });
        
        $(".arrow-prev").click(function(){
            self.setActionToDo("prev");
            self.prevPage();
        });
    
    }
    
    this.getCurrentPage = function(){
        return parseInt($("#pageImg").attr("pageNumber"));
    }
    
    this.setCurrentPage = function(pageNumber){
        $("#pageImg").attr("pageNumber",pageNumber);
        self.setAvailableArrows();
    }
    this.setAvailableArrows = function(){
        
        if(parseInt(self.numberOfPages) === 1){
            $(".arrow-next, .arrow-prev").hide();
            return;
        }

        if(self.getCurrentPage() === 1){
            setTimeout(function(){
                $(".arrow-next").show();
                $(".arrow-prev").hide();
            },200);
        }
        
        if(self.getCurrentPage() === parseInt(self.numberOfPages)){
            setTimeout(function(){
                $(".arrow-prev").show();
                $(".arrow-next").hide();
            },200);
        }
    }
    
    this.setArrowsPosition = function(){
        var arrowPositionY = parseInt($("#pageImg").height() / 2);
        $(".arrow-next, .arrow-prev").css("top",arrowPositionY+"px");
    }
    
    this.setActionToDo = function(action){
        self.actionToDo = action;
    }
    
    this.getActionToDo = function(){
        return self.actionToDo;
    }
    
    this.setLoading = function(){
        $("#pageImg").attr("src","images/loader.gif");
        $(".arrow-next, .arrow-prev").hide();
    }
    
    this.clearLoading = function(){
        $(".arrow-next, .arrow-prev").show();
    }
    
    this.loadPage = function(){
        
        self.setCurrentPage(self.pageToGo);
        
        var ImageLoader = new Image();
        ImageLoader.src = "pages/" + self.pageToGo + ".jpg";
        ImageLoader.onload = function(){
            $("#pageImg").attr("src",ImageLoader.src);
            self.clearLoading();
        }
        
    }
    
    this.nextPage = function(){
        
        if(self.getCurrentPage() === self.numberOfPages && self.getActionToDo()  === 'next'){
            return false;
        }
        
        self.pageToGo = self.getCurrentPage() + 1;
        self.setLoading();
        self.loadPage();
        
    }
    
    this.prevPage = function(){
    
        if(self.getCurrentPage() === 1 && self.getActionToDo() === 'prev'){
            return false;
        }
        
        self.pageToGo = self.getCurrentPage() - 1;
        self.setLoading();
        self.loadPage();
    }
    
    return self;
};

