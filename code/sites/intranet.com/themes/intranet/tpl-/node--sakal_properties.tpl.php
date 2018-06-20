<?php

/**
 * @file
 * Default theme implementation to display a node.
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php print $user_picture; ?>

  <?php print render($title_prefix); ?>
 <!-- <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php else: ?>
    <?php print render($title); ?>
  <?php endif; ?>-->
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
      //print render($content);
      echo '<div class="news_image">';
      print render($content['field_image']);
      echo '</div>';
      
      echo '<div class="news_title">';
      print $title; 
      echo '</div>';
      print render($content['field_gallery_image']); 
      print render($content['body']); 
      print render($content['field_link']); 
     
     
 
    ?>

  <?php print render($content['links']); ?>

  <?php print render($content['comments']); ?>

</div>