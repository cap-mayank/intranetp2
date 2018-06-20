<?php
/**
 * @file
 * holiday_calendar.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function holiday_calendar_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_calendar:calendar.
  $menu_links['main-menu_calendar:calendar'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'calendar',
    'router_path' => 'calendar',
    'link_title' => 'Calendar',
    'options' => array(
      'identifier' => 'main-menu_calendar:calendar',
      'attributes' => array(),
      'item_attributes' => array(
        'id' => '',
        'class' => '',
        'style' => '',
      ),
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: navigation_calendar:calendar.
  $menu_links['navigation_calendar:calendar'] = array(
    'menu_name' => 'navigation',
    'link_path' => 'calendar',
    'router_path' => 'calendar',
    'link_title' => 'Calendar',
    'options' => array(
      'attributes' => array(
        'title' => 'Display calendar',
      ),
      'identifier' => 'navigation_calendar:calendar',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Calendar');

  return $menu_links;
}
