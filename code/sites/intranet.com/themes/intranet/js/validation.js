(function ($) {
	  Drupal.behaviors.intranet = {
    attach: function (context, settings) {
		 //alert(settings.intranet.file_global_upload_max_size);
		
		  $(document).ready(function(){
		  var max_size_bytes=settings.intranet_settings.file_global_upload_max_size_bytes;
		  var max_size=settings.intranet_settings.file_global_upload_max_size;
		  $("input[type='file']").each(function( intIndex){
				var $this=	$(this);
			  $this.bind('change', function() {	
			  checkFileSize(this); });
			  
		  });
		  
		  function  checkFileSize(obj){
					//alert(obj.files[0].size);
					if(obj.files[0].size > max_size_bytes){
						alert("Selected file is unbale to upload it exceeds "+max_size+" MB, the maximum allowed size for uploads");
						$(obj).val("");			
					
						return false;
					}
		  }
			
		})
		
		 }
  };

		  
	
})(jQuery);

(function ($, Drupal, window, document, undefined) {
//Configure colorbox call back to resize with custom dimensions 
  $.colorbox.settings.onLoad = function() {
    colorboxResize();
  }
   
  //Customize colorbox dimensions
  var colorboxResize = function(resize) {
    var width = "90%";
    var height = "90%";
    
    if($(window).width() > 960) { width = "500" }
    if($(window).height() > 700) { height = "500" } 
   
    $.colorbox.settings.height = height;
    $.colorbox.settings.width = width;
    
    //if window is resized while lightbox open
    if(resize) {
      $.colorbox.resize({
        'height': height,
        'width': width
      });
    } 
  }
  
  //In case of window being resized
  $(window).resize(function() {
    colorboxResize(true);
  });

})(jQuery, Drupal, this, this.document);