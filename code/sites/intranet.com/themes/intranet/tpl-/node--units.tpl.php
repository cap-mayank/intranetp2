<?php

/**
 * @file
 * Default theme implementation to display a node.
 */
?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
 <!-- <div><?php //print l('Edit', 'node/' . $nid . '/edit'); ?></div>-->
  <?php print render($title_prefix); ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
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
    
        
    <div class="unit-head-details">
      <div class="unitFloatLeft">
      <?php print render($content['field_unit_head_picture']); ?>
      <?php print render($content['field_unit_head']); ?>
	  <?php print render($content['field_unit_email']); ?>
	  <div class="unitclearBoth">
      
    <div class="addressBg">
      <div class="unit-field-label">Contact</div>
    <?php 
    
    if(isset($content['field_unit_contact']['#object']->field_unit_contact['und'][0]['value'])){
      print render($content['field_unit_contact']); 
    } else {
      print '<div class="empty-value">Not Available</div>';    
    }?>  

</div>
</div>
<div class="addressBg">
    <div class="unit-field-label">Address</div>
    <?php 
    if(isset($content['field_unit_address']['#object']->field_unit_address['und'][0]['value'])){ 
      print render($content['field_unit_address']);
    } else {
      print '<div class="empty-value">Not Available</div>';    
    } ?>
    
</div>
          <div class="addressBg">
    <div class="unit-field-label">Location</div>
    <?php 

    if(isset($content['field_location']['#object']->field_location['und'][0]['tid'])){ 
      print '<div class="field field-name-field-unit-address field-type-text-long field-label-hidden">';
      print render($content['field_location']['#object']->field_location['und'][0]['taxonomy_term']->name);
      print '</div>';
    } else {
      print '<div class="empty-value">Not Available</div>';    
    } ?>
    
</div>
           
     <div class="unit-field-label">Establishment Date</div>               
    <?php
    if(isset($content['field_anniversary_date']['#object']->field_anniversary_date['und'][0]['value'])){
      print render($content['field_anniversary_date']);
    } else {
    print '<div class="empty-value">Not Available</div>';       
    }  ?>       
     
      <div class="addressBg">
    <div class="unit-field-label">Establishment Details:</div>
    <?php 
    if(isset($content['field_establishment_details']['#object']->field_establishment_details['und'][0]['value'])){
      print '<div class="field field-name-field-unit-address field-type-text-long field-label-hidden">';
      print $content['field_establishment_details']['#object']->field_establishment_details['und'][0]['value'];
      print '</div>';
    } else {
    print '<div class="empty-value">Not Available</div>';       
    }  ?>
    
</div>
     
     
     
    </div>
    </div>
    
	</div>
	<div class="unitFloatRight">
	<div class="unit-image">
        <?php print render($content['field_unit_images']); ?>  
    </div>
	</div>
	<div class="unitBody">
	<?php print render($content['field_unit_intro']); ?>
    <?php print render($content['body']); ?>
    </div>

  <?php print render($content['links']); ?>

  <?php print render($content['comments']); ?>

</div>