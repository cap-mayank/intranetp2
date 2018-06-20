<?php
/**
 * @file
 * units.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function units_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'units';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Units';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Units';
  $handler->display->display_options['use_more'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'View all';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '12';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['pager']['options']['tags']['first'] = '';
  $handler->display->display_options['pager']['options']['tags']['previous'] = 'previous';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'next';
  $handler->display->display_options['pager']['options']['tags']['last'] = '';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Unit Head name */
  $handler->display->display_options['fields']['field_unit_head']['id'] = 'field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['table'] = 'field_data_field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['field'] = 'field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['label'] = 'Head';
  /* Field: Content: Short Introduction */
  $handler->display->display_options['fields']['field_unit_intro']['id'] = 'field_unit_intro';
  $handler->display->display_options['fields']['field_unit_intro']['table'] = 'field_data_field_unit_intro';
  $handler->display->display_options['fields']['field_unit_intro']['field'] = 'field_unit_intro';
  $handler->display->display_options['fields']['field_unit_intro']['label'] = '';
  $handler->display->display_options['fields']['field_unit_intro']['element_label_colon'] = FALSE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['delta']['id'] = 'delta';
  $handler->display->display_options['fields']['delta']['table'] = 'field_data_field_unit_images';
  $handler->display->display_options['fields']['delta']['field'] = 'delta';
  $handler->display->display_options['fields']['delta']['label'] = '';
  $handler->display->display_options['fields']['delta']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'units' => 'units',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['use_more'] = FALSE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['defaults']['use_more_text'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Unit Images */
  $handler->display->display_options['fields']['field_unit_images']['id'] = 'field_unit_images';
  $handler->display->display_options['fields']['field_unit_images']['table'] = 'field_data_field_unit_images';
  $handler->display->display_options['fields']['field_unit_images']['field'] = 'field_unit_images';
  $handler->display->display_options['fields']['field_unit_images']['label'] = '';
  $handler->display->display_options['fields']['field_unit_images']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_unit_images']['empty'] = '<img  src="sites/intranet.com/files/unit-default.jpeg" > ';
  $handler->display->display_options['fields']['field_unit_images']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_unit_images']['settings'] = array(
    'image_style' => 'unit_image_295x150',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_unit_images']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_unit_images']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Unit Head name */
  $handler->display->display_options['fields']['field_unit_head']['id'] = 'field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['table'] = 'field_data_field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['field'] = 'field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['label'] = '';
  $handler->display->display_options['fields']['field_unit_head']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_unit_head']['type'] = 'text_plain';
  /* Field: Content: Unit Email */
  $handler->display->display_options['fields']['field_unit_email']['id'] = 'field_unit_email';
  $handler->display->display_options['fields']['field_unit_email']['table'] = 'field_data_field_unit_email';
  $handler->display->display_options['fields']['field_unit_email']['field'] = 'field_unit_email';
  $handler->display->display_options['fields']['field_unit_email']['label'] = '';
  $handler->display->display_options['fields']['field_unit_email']['element_label_colon'] = FALSE;
  /* Field: Content: Unit Address */
  $handler->display->display_options['fields']['field_unit_address']['id'] = 'field_unit_address';
  $handler->display->display_options['fields']['field_unit_address']['table'] = 'field_data_field_unit_address';
  $handler->display->display_options['fields']['field_unit_address']['field'] = 'field_unit_address';
  $handler->display->display_options['fields']['field_unit_address']['label'] = '';
  $handler->display->display_options['fields']['field_unit_address']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_unit_address']['alter']['text'] = '<span class="qtip-link"><span class="qtip-tooltip">[field_unit_address] </span>[field_unit_address]</span>';
  $handler->display->display_options['fields']['field_unit_address']['alter']['max_length'] = '500';
  $handler->display->display_options['fields']['field_unit_address']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['field_unit_address']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['field_unit_address']['alter']['html'] = TRUE;
  $handler->display->display_options['fields']['field_unit_address']['element_label_colon'] = FALSE;
  /* Field: Content: Unit Contact */
  $handler->display->display_options['fields']['field_unit_contact']['id'] = 'field_unit_contact';
  $handler->display->display_options['fields']['field_unit_contact']['table'] = 'field_data_field_unit_contact';
  $handler->display->display_options['fields']['field_unit_contact']['field'] = 'field_unit_contact';
  $handler->display->display_options['fields']['field_unit_contact']['label'] = '';
  $handler->display->display_options['fields']['field_unit_contact']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'units' => 'units',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Field: Location (field_location) */
  $handler->display->display_options['filters']['field_location_tid']['id'] = 'field_location_tid';
  $handler->display->display_options['filters']['field_location_tid']['table'] = 'field_data_field_location';
  $handler->display->display_options['filters']['field_location_tid']['field'] = 'field_location_tid';
  $handler->display->display_options['filters']['field_location_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_location_tid']['expose']['operator_id'] = 'field_location_tid_op';
  $handler->display->display_options['filters']['field_location_tid']['expose']['label'] = 'Location ';
  $handler->display->display_options['filters']['field_location_tid']['expose']['operator'] = 'field_location_tid_op';
  $handler->display->display_options['filters']['field_location_tid']['expose']['identifier'] = 'field_location_tid';
  $handler->display->display_options['filters']['field_location_tid']['expose']['remember_roles'] = array(
    2 => '2',
    3 => 0,
    7 => 0,
    6 => 0,
    5 => 0,
    4 => 0,
    1 => 0,
  );
  $handler->display->display_options['filters']['field_location_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_location_tid']['vocabulary'] = 'location';
  $handler->display->display_options['path'] = 'units';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Units';
  $handler->display->display_options['menu']['description'] = 'Sakal units';
  $handler->display->display_options['menu']['weight'] = '7';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Unit Images */
  $handler->display->display_options['fields']['field_unit_images']['id'] = 'field_unit_images';
  $handler->display->display_options['fields']['field_unit_images']['table'] = 'field_data_field_unit_images';
  $handler->display->display_options['fields']['field_unit_images']['field'] = 'field_unit_images';
  $handler->display->display_options['fields']['field_unit_images']['label'] = '';
  $handler->display->display_options['fields']['field_unit_images']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_unit_images']['empty'] = '<img  src="sites/intranet.com/files/units-widget.png" > ';
  $handler->display->display_options['fields']['field_unit_images']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_unit_images']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_unit_images']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_unit_images']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Unit Head name */
  $handler->display->display_options['fields']['field_unit_head']['id'] = 'field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['table'] = 'field_data_field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['field'] = 'field_unit_head';
  $handler->display->display_options['fields']['field_unit_head']['label'] = 'Head';
  $export['units'] = $view;

  return $export;
}
