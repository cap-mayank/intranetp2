<header id="header">
	
	<div class="headerTopContainer">
	<div class="headerTop">
		<div class="logo">
			<?php
				if($logo){
			?>
				<a href="<?php print check_url($front_page); ?>" title="<?php print $site_name; ?>"><img src="<?php print $logo; ?>" alt="<?php print $site_name; ?>" /></a>
			<?php }?>
			<?php if ($site_slogan){ ?>
				<div id="site-slogan"><?php print $site_slogan; ?></div>
			<?php } ?>
		</div>
		
		<div class="c_head clearfix">
				<nav>
					<?php 
						if ($page['main_menu']): 
							$menu_name = variable_get('menu_main_links_source', 'main-menu'); 
							$tree = menu_tree($menu_name); 
							//print render($page['main_menu']);
							print drupal_render($tree, array('links' => $main_menu, 'attributes' => array('id' => 'secondary-menu', 'class' => array('links', 'inline', 'clearfix', 'sf-menu sf-js-enabled sf-shadow')))); 
						endif;
					?>
				</nav>
				<!-- /nav -->
				
			</div>
		<div class="searchRightContainer">	
		<div class="right_bar userMenu">
				<?php
					if ($page['right_bar']):
						print render($page['right_bar']);
					endif;
				?>
				<!-- /social -->
				
				<!-- /date -->
		</div>
		<div class="right_icons">
					<!-- /random post -->
					<div class="search">
						<div class="search_icon"><i class="fa-search"></i></div>
						<div class="s_form">
							<?php
								if ($page['search_form']):
									print render($page['search_form']);
								endif;
							?>
						</div>
						<!-- /s form -->
					</div>
					<!-- /search -->          
           
		</div><!-- Workflow Menu-->
              <div class="grid_12 alpha clearfix" >
                <?php if ($page['workflow_menu']): ?>
      <div class="grid_full omega manage_content_front workflowMenu">
	 
          <?php print render($page['workflow_menu']); ?>
      </div>	 
       <?php endif;        ?>
</div>
          
        <!-- Workflow Menu--> 
				
		
		</div>
	</div>
	</div>
	<div class="a_head">
		<div class="row clearfix headerContainer">
			
			<?php
				if ($page['left_bar']):
			?>
			<div class="breaking_news lefter">
				<div class="freq_out">
					<div class="freq">
						<div class="inner_f"></div>
						<div id="layerBall"></div>
					</div>
				</div>
				
				<?php
					print render($page['left_bar']);
					
				?>
			</div>
			
			<?php
				endif;
			?>
			<!-- /breaking news -->
			
			<!-- /right bar -->
		</div>
		<!-- /row -->
	</div>
	<!-- /a head -->
	<!-- <div class="b_head">
		<div class="row clearfix">
			
			 /logo 
						
			 /ads
		</div>
		 /row
	</div> -->
	<!-- /b head -->
	<div class="row clearfix headerContainer">
	 <div class="" >
	<?php
                if ($page['top_news']):
                  ?>
                <div class="breaking_news lefter">
				<div class="freq_out">
					<div class="freq">
						<div class="inner_f"></div>
						<div id="layerBall"></div>
					</div>
				</div>

                              <?php
                              print render($page['top_news']);
                              ?>
                

                <?php endif; ?>
				</div>
		<span id="date_time"></span>
		<!-- /sticky -->
  </div>
  </div>
	<!-- /row -->
</header>
<div style="clear:both;">

    
   <?php if($messages): ?>
    <div>
    <?php print $messages;?>
    </div>  
  <?php endif; ?>
</div>
<div id="custom-admin-menu">
     <?php $custom_menu = menu_navigation_links('menu-admin-menu');?>
	<?php if ($custom_menu): ?>

	<?php /*print theme('links__system_menu_header_menu', array(
					'links' => $custom_menu,
					'attributes' => array(
				        'class' => array('no-list', 'inline-list', 'align-right', 'sub-nav'),
					),
					));*/
  
//Function to get a super clean array of all of the links in the supplied menu
function clean_navigation($links) {
    $result = array();
    foreach($links as $id => $item) {
	    //print_r($item);
        if ($item['link']['hidden'] == 1) { continue; }
        $new_item = array('title' => $item['link']['title'], 'link_path' => $item['link']['link_path'], 'href' => $item['link']['href']);

        if ($item['below']) {
            $new_item['below'] = clean_navigation($item['below']);
        }
        $result[] = $new_item;
    }
    return $result;
}
//Build the array
$links_array = clean_navigation(menu_tree_all_data('menu-admin-menu'));

//Function to output the array as links
function print_nav($links_array) {
    print '<ul class="menu">';
    foreach($links_array as $id => $item) {
        print '<li class="' . (!empty($item['below']) ? "expanded" : "leaf") . '">';
        print '<a href="/' . $item['href'] . '">' . $item['title'] . '</a>';
        if ($item['below']) {
            print print_nav($item['below']);
        }
        print "</li>";
    }
    print "</ul>";
}
 //print_nav($links_array);
  ?>
<?php endif; ?>
        
</div>
