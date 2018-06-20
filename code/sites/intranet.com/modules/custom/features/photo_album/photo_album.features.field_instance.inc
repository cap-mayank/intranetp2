<?php
/**
 * @file
 * photo_album.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function photo_album_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'node-photo_album-field_photo_images'.
  $field_instances['node-photo_album-field_photo_images'] = array(
    'bundle' => 'photo_album',
    'deleted' => 0,
    'description' => 'Please upload photo here.
First photo image will be considered as Album cover image.',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'flexslider_fields',
        'settings' => array(
          'caption' => 0,
          'image_style' => 'photo_album_images',
          'optionset' => 'default',
        ),
        'type' => 'flexslider',
        'weight' => 1,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_photo_images',
    'label' => 'Photos',
    'required' => 1,
    'settings' => array(
      'alt_field' => 0,
      'default_image' => 0,
      'file_directory' => '',
      'file_extensions' => 'png gif jpg jpeg',
      'max_filesize' => '6 MB',
      'max_resolution' => '4096x2368',
      'min_resolution' => '480x250',
      'resup' => 0,
      'resup_autostart' => 0,
      'resup_max_filesize' => '6 MB',
      'title_field' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'image',
      'settings' => array(
        'preview_image_style' => 'photo_gallery_grid_image',
        'progress_indicator' => 'throbber',
      ),
      'type' => 'image_image',
      'weight' => 32,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Photos');
  t('Please upload photo here.
First photo image will be considered as Album cover image.');

  return $field_instances;
}
