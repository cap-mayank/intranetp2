

<div id="adminOverlay"></div>
          <div class="grid_12 alpha clearfix" >
                <?php if ($page['manage_content']): ?>
      <div class="grid_full omega manage_content_front sideMenu">
	  <span class="icon"></span>
          <?php print render($page['manage_content']); ?>
      </div>	 
       <?php endif;        ?>
</div>
<div id="layout" class="boxed-margin backgroundBlue">

    <?php include_once('header.tpl.php'); ?>
    <!-- /header -->
    <div class="page-content">
        <div class="row clearfix contentMargin">
  
                <div class="grid_12 omega posts righter clearfix">
                    <?php
                    if ($page['content']):
                      if (drupal_is_front_page()) {
                        unset($page['content']['system_main']['default_message']);
                      }
                      print render($page['content']);
                    endif;
                    ?>
                </div><!-- end grid9 -->
                <div class="grid_4 alpha sidebar sidebar_b">
                    <?php
                    if ($page['sidebar_first']):
                    //print render($page['sidebar_first']);
                    endif;
                    ?>

                </div><!-- end grid9 -->

            </div><!-- end grid9 -->

            <div class="grid_3 omega sidebar sidebar_a">
                <?php
                if ($page['sidebar_second']):
                //print render($page['sidebar_second']);
                endif;
                ?>


            </div><!-- /grid3 sidebar A -->

        </div><!-- /row -->

    </div>
    <!-- /end page content -->
    <!-- footer -->
    <?php if ($page['content_bottom']): ?>
      <div class="grid_full omega content_bottom_front">
          <?php print render($page['content_bottom']); ?>
      </div>	
    <?php endif; ?>
    <?php include_once('footer.tpl.php'); ?>
    <!-- /footer -->

</div>