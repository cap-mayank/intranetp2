<div id="adminOverlay"></div>
  <div class="grid_12 alpha clearfix">
         <?php if ($page['manage_content']): ?>
      <div class="grid_full omega manage_content_front sideMenu ipmenu" >
	  <span class="icon" style="margin-top: 119px; left:5px;"></span>
          <?php print render($page['manage_content']); ?>
      </div>	 
       <?php endif;        ?>
      </div> 
<div id="layout" class="boxed-margin">
 
  <?php include_once('header.tpl.php'); ?>
  <!-- /header -->
  
  <div class="page-content">
    <div class="row clearfix contentMarginIP">
    
				<div class="clearfix">
<?php
         
            if ($breadcrumb):
              //print $breadcrumb;
            endif; 
            print render($page['breadcrumb']); //rendering custom region for breadcrumb.
            if ($page['content']):
              if (drupal_is_front_page()) {
                unset($page['content']['system_main']['default_message']);
              }
            endif;
          ?>
          </div>
		  
          <?php if (!empty($node)) : ?>
          <div class="grid_full page_title">	
            <?php
              $node_type = node_type_get_name($node->type);
              if ($node_type == "Cluster Of Links") {
                print "All Applications";
              }
              else if ($node->type == 'room_reservations_room') {
                print ' Reservable Room';
              }
              else {
                if($node_type != "Filedepot Folder")
                  print drupal_get_title();
              }
            ?>
        </div>
           <?php if (!empty($tabs['#primary']) || !empty($tabs['#secondary'])):
				?>
				
				<?php $current_url=url($_GET['q']);
              if (!preg_match('/node/',$current_url))
                print render($tabs);
				?>
				
				<?php
              endif;
			  ?>
        <?php endif; ?>

        <?php if ($page['sidebar_first']): ?>
          <div class="grid_2 omega sidebar sidebar_b">
              <?php print render($page['sidebar_first']); ?>
          </div><!-- end grid9 -->
        <?php endif; ?>
        <?php if ($page['sidebar_second']): ?>
          <div class="grid_3 omega sidebar sidebar_a" style="float:right;">
              <?php print render($page['sidebar_second']); ?>
          </div><!-- /grid3 sidebar A -->
          <div class="grid_9 omega sidebar sidebar_b mainContent">
            <?php else: ?>
              <div class="grid_full omega sidebar sidebar_b mainContent">
                <?php endif; ?>

                <?php if (drupal_get_title()) : ?>
                 <?php  // print '<div class="title colordefault" style="clear: both;"><h4>' . drupal_get_title() . '</h4></div>'; ?>
                <?php endif;?>  


                <?php print render($page['content']); ?>
            </div><!-- end grid9 -->


        </div><!-- end grid9 -->
      </div><!-- /row -->
    </div>
  </div><!-- /end page content -->
<!-- footer -->
<?php include_once('footer.tpl.php'); ?>
<!-- /footer -->
</div>