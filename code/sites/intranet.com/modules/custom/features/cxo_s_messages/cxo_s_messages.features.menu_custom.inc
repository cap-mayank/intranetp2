<?php
/**
 * @file
 * cxo_s_messages.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function cxo_s_messages_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: main-menu.
  $menus['main-menu'] = array(
    'menu_name' => 'main-menu',
    'title' => 'Main menu',
    'description' => 'The <em>Main</em> menu is used on many sites to show the major sections of the site, often in a top navigation bar.',
  );
  // Exported menu: menu-manage-content.
  $menus['menu-manage-content'] = array(
    'menu_name' => 'menu-manage-content',
    'title' => 'Manage Content',
    'description' => 'Manage content only',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Main menu');
  t('Manage Content');
  t('Manage content only');
  t('The <em>Main</em> menu is used on many sites to show the major sections of the site, often in a top navigation bar.');

  return $menus;
}
