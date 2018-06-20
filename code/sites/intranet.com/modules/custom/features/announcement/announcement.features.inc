<?php
/**
 * @file
 * announcement.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function announcement_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_validation" && $api == "default_field_validation_rules") {
    return array("version" => "2");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function announcement_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function announcement_image_default_styles() {
  $styles = array();

  // Exported image style: announcement_listing.
  $styles['announcement_listing'] = array(
    'label' => 'announcement_listing',
    'effects' => array(
      8 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 120,
          'height' => 119,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function announcement_node_info() {
  $items = array(
    'announcement' => array(
      'name' => t('Announcement'),
      'base' => 'node_content',
      'description' => t('Manage timely company specific announcements like special exhibition for employees.'),
      'has_title' => '1',
      'title_label' => t('Announcement Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
