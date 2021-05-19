
$( document ).ready(function() {
    $("body").click(function() {
        //var currWidth = $("#dot1").css( "width" ).replace(/[^-\d\.]/g, '');
      
        $(".blob").on("contextmenu",function(){
            return false;
         }); 
         

        $('.blob').mousedown(function(event) {
            console.log("wsh")
        var currWidth = $(this).css( "r" ).replace(/[^-\d\.]/g, '');
        console.log(currWidth)
        var newWidth;
        var finalWidth;
        
        
            switch (event.which) {
                case 1:
                    newWidth = parseInt(currWidth) + 50;
                    console.log(newWidth)
                    break;
                case 2:
                    //middle button
                    break;
                case 3:
                    //right mouse button
                    newWidth = parseInt(currWidth) - 50;
                    break;
            }

            finalWidth = newWidth + "px";
            console.log(finalWidth)
            $(this).css({"r": finalWidth})
        });



      });
});

