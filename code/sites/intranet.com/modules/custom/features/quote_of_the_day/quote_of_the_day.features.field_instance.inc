<?php
/**
 * @file
 * quote_of_the_day.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function quote_of_the_day_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'node-quote-body'.
  $field_instances['node-quote-body'] = array(
    'bundle' => 'quote',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Please enter the quote along with optional specification of credits.',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
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
    'field_name' => 'body',
    'label' => 'Quote',
    'required' => 1,
    'settings' => array(
      'display_summary' => 0,
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'rows' => 20,
        'summary_rows' => 5,
      ),
      'type' => 'text_textarea_with_summary',
      'weight' => 2,
    ),
  );

  // Exported field_instance: 'node-quote-field_quote_image'.
  $field_instances['node-quote-field_quote_image'] = array(
    'bundle' => 'quote',
    'deleted' => 0,
    'description' => 'Please upload image',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'image',
        'settings' => array(
          'image_link' => '',
          'image_style' => 'homepage_cxo_company_quotes',
        ),
        'type' => 'image',
        'weight' => 0,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_quote_image',
    'label' => 'Image',
    'required' => 1,
    'settings' => array(
      'alt_field' => 0,
      'default_image' => 0,
      'file_directory' => '',
      'file_extensions' => 'png gif jpg jpeg',
      'max_filesize' => '4 MB',
      'max_resolution' => '4096x2368',
      'min_resolution' => '180x180',
      'resup' => 0,
      'resup_autostart' => 0,
      'resup_max_filesize' => '',
      'title_field' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'image',
      'settings' => array(
        'preview_image_style' => 'thumbnail',
        'progress_indicator' => 'throbber',
      ),
      'type' => 'image_image',
      'weight' => 1,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Image');
  t('Please enter the quote along with optional specification of credits.');
  t('Please upload image');
  t('Quote');

  return $field_instances;
}
