<?php
/**
 * @file
 * units.qtip_default.inc
 */

/**
 * Implements hook_qtip_default_qtips().
 */
function units_qtip_default_qtips() {
  $export = array();

  $qtip = new stdClass();
  $qtip->disabled = FALSE; /* Edit this to true to make a default qtip disabled initially */
  $qtip->api_version = 1.0;
  $qtip->machine_name = 'roomtitle';
  $qtip->name = 'roomtitle';
  $qtip->settings = array(
    'content' => array(
      'button' => 0,
    ),
    'style' => array(
      'tip' => array(
        'width' => '6',
        'height' => '6',
        'border' => '',
        'corner_position' => '',
        'mimic' => '',
        'offset' => '',
        'corner' => 0,
      ),
      'classes' => '',
      'classes_custom' => '',
      'shadow' => 'qtip-shadow',
      'rounded_corners' => 'qtip-rounded',
    ),
    'position' => array(
      'at' => 'bottom right',
      'my' => '',
      'viewport' => 0,
      'target' => 0,
      'adjust' => array(
        'method' => '',
      ),
    ),
    'show' => array(
      'event' => array(
        'mouseenter' => 'mouseenter',
        'focus' => 0,
        'click' => 0,
      ),
      'solo' => 0,
      'ready' => 0,
    ),
    'hide' => array(
      'event' => array(
        'mouseleave' => 'mouseleave',
        'unfocus' => 0,
        'blur' => 0,
        'click' => 0,
      ),
      'fixed' => 0,
      'delay' => '',
      'inactive' => '',
    ),
    'miscellaneous' => array(
      'button_title_text' => '',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('roomtitle');

  $export['roomtitle'] = $qtip;

  return $export;
}
