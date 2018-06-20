<?php
/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup templates
 */
?>
<div class="grid_9 omega sidebar sidebar_b mainContent calender_page">

  <?php 
  $theme_path=drupal_get_path('theme', 'intranet');
    $js_path = $theme_path.'/js/owl.carousel.min.js';
    drupal_add_js($js_path);
    ctools_include('ajax');
      ctools_include('modal');
      // Add CTools' javascript to the page.
      ctools_modal_add_js();
      // Create our own javascript that will be used to theme a modal.
      $happy_style = array(
        'happy-modal-style' => array(
          'modalSize' => array(
            'type' => 'fixed',
            'width' => 550,
            'height' => 300,
            'addWidth' => 10,
            'addHeight' => 10,
            'contentRight' => 0,
            'contentBottom' => 0,
          ),
          'modalOptions' => array(
            'opacity' => .6,
            'background-color' => '#684C31',
          ),
          'animation' => 'fadeIn',
          'modalTheme' => 'happy_modal',
          // Customize the AJAX throbber like so:
          // This function assumes the images are inside the module directory's "images"
          // directory:
           //ctools_image_path($image, $module = 'anniversary_wish', $dir = 'images');
          //'throbber' => theme('image', array('path' => ctools_image_path('ajax-loader.gif', 'anniversary_wish'), 'alt' => t('Loading...'), 'title' => t('Loading'))),
          //'closeImage' => theme('image', array('path' => ctools_image_path('modal-close.png', 'anniversary_wish'), 'alt' => t('Close window'), 'title' => t('Close window'))),
          ),
         );
          // Add the settings array defined above to Drupal 7's JS settings:
          drupal_add_js($happy_style, 'setting');
          ctools_add_js('anniversary_wish', 'anniversary_wish');
  ?>
  <div id="filterCalender">
  <form name="calenderFilter" id="calenderFilter">
  <div id="filter_type" class="calender-filter-fields">
  Display:
<select name="event_type" id="event_type">
<option value="all" selected>All</option>
<option value="event-hol">Holiday</option>
<option value="event-birth">Birthday</option>
<option value="event-ann">Anniversary </option>
<option value="event-unit">Office Anniversary</option>
</select>
</div>
<div id="filter_location" class="calender-filter-fields">
Location:
<?php print $location_options; ?>
</div>

  </form></div>
  <div id='calendar' class="calender-filter-fields"></div>
  <?php
      // Hide comments, tags, and links now so that we can render them later.
  
    libraries_load('fullcalendar');
    
    drupal_add_js($theme_path.'/js/holidaycalendar.js', 'file');
  ?>
  <div class="newScroll" >               
      HIHIEIEIEI
  </div>
  <div class="birthdayHolContainer">
  <div class="holLogo">
    <div class="holBirthdayLogo"></div>
	<span class="birthdayText">Birthday</Span>
  </div>  
  <div class="birthDayAjaxHandler">
		
  </div>
  </div>
  <div class="annHolContainer">
  <div class="holLogo">
    <div class="holAnniLogo"></div>
	<span class="annText">Anniversary</Span>
  </div>
  <div class="anniversaryAjaxHandler">
  
  </div>
  </div>

</div>
<?php 
 $block = module_invoke('views', 'block_view', 'holiday_calendar-block');
if(!empty($block['content'])){ ?>
<div style="float:right;" class="grid_3 omega sidebar sidebar_a node-type-holiday-calendar">    
    <div class="widget block block-views contextual-links-region">
        <div class="title"><h4>Holiday Calendar</h4></div>
  <?php   
    print render($block['content']);
  ?>
    </div>
</div>
<?php } ?>