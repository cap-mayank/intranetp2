<?php
/**
 * @file
 * anniversary.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function anniversary_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "flexslider" && $api == "flexslider_default_preset") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function anniversary_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function anniversary_image_default_styles() {
  $styles = array();

  // Exported image style: birthday_90x90.
  $styles['birthday_90x90'] = array(
    'label' => 'birthday_90X90',
    'effects' => array(
      11 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 90,
          'height' => 90,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}
