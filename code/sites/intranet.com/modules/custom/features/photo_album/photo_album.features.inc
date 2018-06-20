<?php
/**
 * @file
 * photo_album.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function photo_album_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function photo_album_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function photo_album_image_default_styles() {
  $styles = array();

  // Exported image style: photo_album_grid_image_106x106.
  $styles['photo_album_grid_image_106x106'] = array(
    'label' => 'photo_album_grid_image_106X106',
    'effects' => array(
      14 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 106,
          'height' => 106,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: photo_album_images.
  $styles['photo_album_images'] = array(
    'label' => 'photo album images',
    'effects' => array(
      13 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 460,
          'height' => 460,
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
function photo_album_node_info() {
  $items = array(
    'photo_album' => array(
      'name' => t('Photo Album'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
