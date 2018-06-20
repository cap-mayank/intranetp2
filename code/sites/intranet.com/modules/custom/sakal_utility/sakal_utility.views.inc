<?php
/**
 * @file
 * sakal_utility.views.inc
 */

/**
 * Implements hook_views_post_execute().
 */
function sakal_utility_views_post_execute(&$view) {
  global $base_url;
  if ($view->name == 'policy_and_procedures') {
    /*
     $new_view=array();
    foreach ($view->result as $key => $value) {
      $insert=TRUE;
      $is_pdf= FALSE;
      if ($value->file_managed_field_data_filedepot_folder_file__filedepot_fil_4=='pdf') {   
        $is_pdf=TRUE;
      }
      
      if ($value->downloadroles != 1 && $value->readonly == 1 && $is_pdf==TRUE) {        
        //$view->display['policy_block']->handler->display->handler->handlers['field']['title']->options['alter']['path'] = $base_url."/system/files/filedepot/".
        //$value->file_managed_field_data_filedepot_folder_file__filedepot_fil_6 . "/" . $value->file_managed_field_data_filedepot_folder_file__filedepot_fil_5;
      }
      elseif ($value->readonly == 1 && $value->downloadroles == 1 && $is_pdf==FALSE) {
        $value->file_managed_field_data_filedepot_folder_file__filedepot_fil_2='';
          $value->readonly=0;
      } 
      elseif ($value->downloadroles == 0) { 
          unset($view->result[$key]); 
          $insert=FALSE;
        }
      if (isset($value->file_managed_field_data_filedepot_folder_file__filedepot_fil_2)) {
        $cid=$value->file_managed_field_data_filedepot_folder_file__filedepot_fil_2;
        if ($cid) {
          $value->filedepot_categories_filedepot_files_name=parent_folder($cid);
        }
      }
      if ($insert ==TRUE) {
        if (preg_match('/block/',$view->current_display)) {
          if(count($new_view)<=4) {
           $new_view[]=$value;
          }
        }
        else {
           $new_view[]=$value;
        }
        
      }
      
    }
    $view->result=$new_view;
  */
  }

 
  if($view->name == "birthdays") { 
    if(!empty($view->result)) {
      foreach($view->result as $key=>$value) {  
        if ($view->current_display == 'recent_joiner_monthwise' || $view->current_display == 'anniversary_daywise') {
          // $dt=$value->_field_data['uid']['entity']->field_employee_joining_date['und']['0'];          
          $dt=$view->result[$key]->field_field_employee_joining_date[0]['raw'];
          $dt1=$dt['month'].'/'.$dt['day'].'/'.$dt['year'];
          $formattedDate = date("jS F Y", strtotime($dt1));  
          $formattedDateArr = explode(" ",$formattedDate);  
          $view->result[$key]->field_field_employee_joining_date[0]['raw']['day']=$formattedDateArr[0];
          $view->result[$key]->field_field_employee_joining_date[0]['raw']['month']=$formattedDateArr[1];
          $view->result[$key]->field_field_employee_joining_date[0]['raw']['year']=$formattedDateArr[2];      
        }
        if ($view->current_display == 'birthday_daywise') {
          if (!empty($view->result[$key]->field_birthdays)) {
            $dt=$view->result[$key]->field_birthdays[0]['raw'];
            $dt1=$dt['month'].'/'.$dt['day'].'/'.$dt['year'];
            $formattedDate = date("jS F Y", strtotime($dt1));  
            $formattedDateArr=explode(" ",$formattedDate);     
            $view->result[$key]->field_birthdays[0]['raw']['day']=$formattedDateArr[0];
            $view->result[$key]->field_birthdays[0]['raw']['month']=$formattedDateArr[1];
            $view->result[$key]->field_birthdays[0]['raw']['year']=$formattedDateArr[2];  
          }
        }       
      }   
    }
  }
  

 
}
/*
 * Find root folder of file for document Store
 */
function parent_folder($child_id) {
  $pid='';
  $pid = db_query("
    select name, cid, @parent:=pid as prnt
    from
    (select @parent:= :cid ) a
    join
    (select * from {filedepot_categories} order by cid desc) b
    where
    @parent=cid having prnt=0", array(":cid" => $child_id))->fetchField();
  return $pid;
}

/**
 * Implements hook_views_data().
 * Exposed custom table in the view for document store filedepot_files
 * Exposed custom table for role base functionality of document store  filedepot_access
 */
function sakal_utility_views_data() {
  global $user;
  $data = array();
  $data['filedepot_files']['table']['base'] = array(
    'field' => 'fid',
    'title' => t('Filedepot Files'),
    'help' => t("Filedepot files base table"),
  );
  $data['filedepot_files']['table']['join']['file_managed'] = array(
    'left_field' => 'fid',
    'field' => 'drupal_fid',
  );
  $data['filedepot_files']['drupal_fid'] = array(
    'title' => t('Drupal File Id'),
    'help' => t('Some example content that references a node.'),
    'field' => array(
    'handler' => 'views_handler_field_numeric',
    'click sortable' => TRUE,
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );
  
  // Example integer field.
  $data['filedepot_files']['version'] = array(
    'title' => t('File Version'),
    'help' => t('File Version'),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );
  $data['filedepot_files']['cid'] = array(
    'title' => t('Category Id'),
    'help' => t('Some example content that references a node.'),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ),
    'relationship' => array(
      'base' => 'filedepot_categories', // The name of the table to join with.
      'base field' => 'cid', // The name of the field on the joined table.
      'field' => 'cid', //-- see hook_views_data_alter(); not needed here.
      'handler' => 'views_handler_relationship',
      'label' => t('Default label for the relationship'),
      'title' => t('Title shown when adding the relationship'),
      'help' => t('More information on this relationship'),
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
   
  );
  
  $data['filedepot_files']['readroles'] = array(
    'title' => t('Readonly permission'),
    'help' => t('Readonly Permission.'),
    'field' => array(
        'handler' => 'views_handler_field',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_string',
    ),
  );
  $data['filedepot_files']['downloadroles'] = array(
    'title' => t('Download permission'),
    'help' => t('Download Permission.'),
    'field' => array(
        'handler' => 'views_handler_field',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_string',
    ),
  );
   $data['filedepot_files']['extension'] = array(
    'title' => t('File Extension'),
    'help' => t('File Extension.'),
    'field' => array(
        'handler' => 'views_handler_field',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_string',
    ),
);
  
 // Applied Role base access 
 $data['filedepot_access']['table']['group'] = t('Filedepot Access');
 $data['filedepot_access']['table']['base'] = array(
    'field' => 'fid',
    'title' => t('Filedepot Access'),
    'help' => t("Filedepot Accesss base table"),
    );
  $data['filedepot_access']['table']['join']['filedepot_categories'] = array(
    'left_field' => 'cid',
    'field' => 'catid',
    );
    $data['filedepot_access']['catid'] = array(
    'title' => t('Access Category Id'),
    'help' => t('Some example content that references a node.'),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ),
    'relationship' => array(
      'base' => 'filedepot_categories', // The name of the table to join with.
      'base field' => 'cid', // The name of the field on the joined table.
      'field' => 'catid', //-- see hook_views_data_alter(); not needed here.
      'handler' => 'views_handler_relationship',
      'label' => t('filedepot_categories with filedepot_access'),
      'title' => t('filedepot_categories with filedepot_access'),
      'help' => t('More information on this relationship'),
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
   
  );
  
   $data['filedepot_access']['permid'] = array(
    'title' => t('Permission Id'),
    'help' => t('Permission id.'),
    'field' => array(
    'handler' => 'views_handler_field_numeric',
    'click sortable' => TRUE,
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
    'relationship' => array(
      'base' => 'users', // The name of the table to join with.
      'base field' => 'uid', // The name of the field on the joined table.
      'field' => 'permid', //-- see hook_views_data_alter(); not needed here.
      'handler' => 'views_handler_relationship',
      'label' => t('filedepot_access_users'),
      'title' => t('filedepot_access_users'),
      'help' => t('More information on this relationship'),
    ),
   );
    $data['filedepot_access']['view'] = array(
    'title' => t('View Access'),
    'help' => t('View Access.'),
    'field' => array(
    'handler' => 'views_handler_field_numeric',
    'click sortable' => TRUE,
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
   );
   
   $data['filedepot_access']['permtype'] = array(
    'title' => t('Permission Type'),
    'help' => t('Permission Type.'),
    'field' => array(
        'handler' => 'views_handler_field',
    ),
    'sort' => array(
        'handler' => 'views_handler_sort',
    ),
    'filter' => array(
        'handler' => 'views_handler_filter_string',
    ),
);
  return $data;
}


/**
 * Implementation of hook_views_pre_render()
 * To remove file extension from file title
 */
function sakal_utility_views_pre_render(&$view) {
  global $base_url;
  $results = &$view->result;
  if (count($results)>0 && $view->name=='policy_and_procedures' ) {
    foreach ($results as $key => $result) {
      if (isset($result->file_managed_field_data_filedepot_folder_file__filedepot_fil_1)) {
         $view->result[$key]->file_managed_field_data_filedepot_folder_file__filedepot_fil_1 =
          preg_replace('/\\.[^.\\s]{3,4}$/',
            '',
            $result->file_managed_field_data_filedepot_folder_file__filedepot_fil_1);       
     
      }
    }
  }

  //$nodes = node_load_multiple(array_keys($result['node']));
  // Get current year and get the corresponding published holiday calendar which will be unique.
  if ($view->name == "birthdays" && $view-> current_display != "recent_joiner_monthwise") {
		$query = new EntityFieldQuery();
    /*Previous code to link anniversary widgets to latest published calendar. Now we are  using fixed link (/calendar)*/
		/*$result = $query->entityCondition('entity_type', 'node')
			->entityCondition('bundle', 'holiday_calendar')
			->propertyCondition('status', NODE_PUBLISHED)
			->fieldCondition('field_calendar_year','value',date("Y").'-01-01 00:00:00','=')
			->execute();
		$node_id = 0;
    if (isset($result['node'])) {
      $nids = array_keys($result['node']);
      $node_id = node_load($nids[0])->nid;	
    }*/
		$view->display_handler->set_option('link_display', 'custom_url');
		$view->display_handler->set_option('link_url', '/calendar');
	}
  
   
  //Sorting the dates in ascending order for holiday calendar widget.
  if ($view->name == "holiday_calendar") {
    usort($view->result[0]->_field_data['nid']['entity']->field_holiday['und'], 'holiday_date_compare');
  }
  if ($view->name == 'holiday_calendar') {
    global $user;
    $user_details=user_load($user->uid);
    if(isset($user_details->field_locations['und'][0]['tid']))
      $location_id=$user_details->field_locations['und'][0]['tid'];
    else
      $location_id='';
    //get tid of location having 'All' terms
    $terms = taxonomy_get_term_by_name("All");
    $all_term = current($terms);
    $all_location_id= $all_term->tid;

    if(!is_numeric($location_id)) $location_id=7;

      $newArray=array();

      foreach($view->result[0]->_field_data['nid']['entity']->field_holiday['und'] as $key=>$value) {  
        if(isset($view->result[0]->_field_data['nid']['entity']->field_holiday['und'][$key]['field_location']['und']['0']['tid'])){ 
          if($view->result[0]->_field_data['nid']['entity']->field_holiday['und'][$key]['field_location']['und']['0']['tid'] == $location_id || $view->result[0]->_field_data['nid']['entity']->field_holiday['und'][$key]['field_location']['und']['0']['tid'] == $all_location_id){
            $newArray[]=$view->result[0]->_field_data['nid']['entity']->field_holiday['und'][$key];
          }
        }
      }
     if(!empty($newArray)){
      $view->result[0]->_field_data['nid']['entity']->field_holiday['und'] =$newArray;
     }
     else {
       $view->result=array();
     }
  }
    if ($view->name == 'content_list') {
      $content_type=$view->args[0];
      $content_type=str_replace('_', '-', $content_type);
      $content_type=str_replace(' ', '-', $content_type);     
      $header_option=($view->display_handler->get_option('header'));
      $header_option['area']['content']='<a href="/node/add/'.$content_type.'">Add Content</a>';

      $view->display_handler->set_option('header',array('text'=>$header_option));
      $view->query->pager->display->handler->handlers['header']['area']->options['content']='<a href="/node/add/'.$content_type.'">Add Content</a>'; 
    }
   

}
/**
 * Implementation of hook_views_query_alter()
 * To document store applied role base constraint
 */
function sakal_utility_views_query_alter(&$view, &$query) {
  global $user;
  if ($view->name == "policy_and_procedures" ) {
    $rids = array_keys($user->roles);    
    $subexpression=array();
    foreach ($rids as $key => $values) {
      $subexpression[]= "IF( 
      IF(
      file_managed_field_data_filedepot_folder_file__filedepot_files.readroles IS NULL, 0,
      FIND_IN_SET(
      '" . $values . "',file_managed_field_data_filedepot_folder_file__filedepot_files.readroles
      )
      )>0,1,0
      )";
    }
    $subexpression=implode(' , ', $subexpression);
    $query->set_distinct(TRUE);
    $query->add_field('', 'IF(GREATEST(' . $subexpression . ')>0,1,0)', 'readonly');
     
    $subexpression=array();
    foreach ($rids as $key => $values) {
      $subexpression[]= "IF(
      IF(
      file_managed_field_data_filedepot_folder_file__filedepot_files.downloadroles IS NULL,0, 
      FIND_IN_SET(
      '" . $values . "',file_managed_field_data_filedepot_folder_file__filedepot_files.downloadroles
      )
      )>0,1,0)";
    }
    $subexpression=implode(' , ', $subexpression);
    $query->add_field('', 'IF(GREATEST(' . $subexpression . ')>0,1,0)', 'downloadroles');
    $query->add_where_expression(0, "filedepot_categories_filedepot_files__filedepot_access.permid in ( :user_role)", array(':user_role' => $rids));
  if ( $view->current_display=='block_1' || $view->current_display=='page_1' )
   $query->add_where_expression(0,"filedepot_categories_filedepot_files.name = :folder_name",array(':folder_name' =>'Newsletter'));
  else
    $query->add_where_expression(0,"filedepot_categories_filedepot_files.name != :folder_name",array(':folder_name' =>'Newsletter'));
  }
// $query->add_having_expression(null,"file_managed_field_data_filedepot_folder_file__filedepot_fil_4!='pdf' AND downloadroles>0");
// $query->add_having_expression(null,"file_managed_field_data_filedepot_folder_file__filedepot_fil_4='pdf' AND (downloadroles>0 OR readonly>0)");
 
}
/**
 * Implementation of sakal_utility_views_pre_execute()
 * To apply filter on selected resultset
 */
function sakal_utility_views_pre_execute(&$view){
  if ($view->name == "policy_and_procedures" ) {
    $inner1 = $view->build_info['query'];
    $inner2 = $view->build_info['count_query'];

    $inner1->range();
    $query= db_select($inner1, 'inner_query')
      ->fields('inner_query');
    $condition="(file_managed_field_data_filedepot_folder_file__filedepot_fil_4!='pdf' AND downloadroles>0) OR (file_managed_field_data_filedepot_folder_file__filedepot_fil_4='pdf' AND (downloadroles>0 OR readonly>0)) ";
    $query->where($condition);
    $current_page= (isset($_GET['page'])) ? $_GET['page'] : 0;
    $start=$current_page*$view->get_items_per_page();
    $query->range($start,$view->get_items_per_page());
    $view->build_info['query']=$query;
    
    $query1= db_select($inner1, 'inner_query1')
      ->fields('COUNT(*)');
    $condition="(file_managed_field_data_filedepot_folder_file__filedepot_fil_4!='pdf' AND downloadroles>0) OR (file_managed_field_data_filedepot_folder_file__filedepot_fil_4='pdf' AND (downloadroles>0 OR readonly>0)) ";
    $query1->where($condition);  
    $view->build_info['count_query']=$query1;
        
  }  
  
}
/*
 * Compares holidat dates and returns for ascending order.
 */
function holiday_date_compare($a, $b)
{
  if (!isset($a['field_publishing_date']['und'][0]['value']) || !isset($b['field_publishing_date']['und'][0]['value'])) {
    return 0;
  }
  else {
    $t1 = strtotime($a['field_publishing_date']['und'][0]['value']);
    $t2 = strtotime($b['field_publishing_date']['und'][0]['value']);
    return $t1 - $t2;
  }  
}  

function holiday_date_compare_pattern_two($a, $b)
{
  if (!isset($a['field_publishing_date']['#object']->field_publishing_date['und'][0]['value']) || !isset($b['field_publishing_date']['#object']->field_publishing_date['und'][0]['value'])) {
    return 0;
  }
  else {
    $t1 = strtotime($a['field_publishing_date']['#object']->field_publishing_date['und'][0]['value']);
    $t2 = strtotime($b['field_publishing_date']['#object']->field_publishing_date['und'][0]['value']);
    return $t1 - $t2;
  }  
} 

