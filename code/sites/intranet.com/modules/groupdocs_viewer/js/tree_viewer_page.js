var groupdocs_viewer_error_counter = 0;

(function ($) {

  Drupal.behaviors.groupdocs_viewer = {
    attach: function (context, settings) {
      loadFileTree($);
    }
  };

})(jQuery);


function loadFileTree($){
    $('.aui-message').remove();
    var parent = $("#groupdocsBrowser");
    var container = $("#groupdocsBrowserInner", parent);
	var basePath = Drupal.settings.basePath;
    var opts = {
        script: basePath + 'groupdocs_viewer/treeviewer/',
        onTreeShow: function(){

        },
        onServerSuccess: function(){
            groupdocs_viewer_error_counter = 0;
            jQuery("a", container).each(function() {
                var self = $(this);
                if(self.parent().hasClass("file")) {
                    self.click(function(e){
                        e.preventDefault();

                        window.parent.jQuery('input[name*=\"groupdocs_embedded_code\"]').val(self.attr('rel'));
                        window.parent.Lightbox.end();
                    })
                }
            });
        },
        onServerError: function(response) {
            groupdocs_viewer_error_counter += 1;
            if(groupdocs_viewer_error_counter < 3) {
                loadFileTree($);
            }
            else {
                var message = "Uh oh, looks like we are currently experiencing \
                 difficulties with our API, please be so kind as to drop an \
                 email to <a href='mailto:support@groupdocs.com'>support@groupdocs.com</a> \
                 to let them know, thanks or \
                 <a href='#' onclick='loadFileTree(jQuery);return false'>click here</a> \
                 to try again.";
                parent.append($("<div class='aui-message warning'>" + message + "</div>"));
            }
        }
    };
    container.fileTree(opts);
}
