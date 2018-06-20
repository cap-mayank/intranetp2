<?php

/**
 * @file
 * Default theme implementation to display a node.
 */
?>
<div id="node-<?php print $node->nid; ?>" class="holiday_list <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php print $user_picture; ?>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php else: ?>
  <div class="node-title">
    <?php print render($title); ?>
  </div>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <div class="submitted">
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>

    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
     // print render($content);      
    ?>
    
 <?php print render($content['field_calendar_year']); ?>
    <div class="field-item holidayHeader">
        <div class="field-name-field-publishing-date"> 
            <div class="field-items">Date</div>
        </div>
          <div class="field-name-field-holiday-name"> 
			  <div class="field-items">
			  Holiday Name
			  </div>
		  </div>
            <div class="field-name-field-location">
				<div class="field-items">Location</div>
			</div>
    </div>
     <?php print render($content['field_holiday']); ?>
  <?php print render($content['links']); ?>

  <?php print render($content['comments']); ?>

</div>