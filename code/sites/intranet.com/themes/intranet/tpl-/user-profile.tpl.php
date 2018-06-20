<?php

/**
 * @file
 * Default theme implementation to present all user profile data.
 *
 * This template is used when viewing a registered member's profile page,
 * e.g., example.com/user/123. 123 being the users ID.
 *
 * Use render($user_profile) to print all profile items, or print a subset
 * such as render($user_profile['user_picture']). Always call
 * render($user_profile) at the end in order to print all remaining items. If
 * the item is a category, it will contain all its profile items. By default,
 * $user_profile['summary'] is provided, which contains data on the user's
 * history. Other data can be included by modules. $user_profile['user_picture']
 * is available for showing the account picture.
 *
 * Available variables:
 *   - $user_profile: An array of profile items. Use render() to print them.
 *   - Field variables: for each field instance attached to the user a
 *     corresponding variable is defined; e.g., $account->field_example has a
 *     variable $field_example defined. When needing to access a field's raw
 *     values, developers/themers are strongly encouraged to use these
 *     variables. Otherwise they will have to explicitly specify the desired
 *     field language, e.g. $account->field_example['en'], thus overriding any
 *     language negotiation rule that was previously applied.
 *
 * @see user-profile-category.tpl.php
 *   Where the html is handled for the group.
 * @see user-profile-item.tpl.php
 *   Where the html is handled for each item in the group.
 * @see template_preprocess_user_profile()
 *
 * @ingroup themeable
 */
?>
<div class="profile"<?php print $attributes; ?>>
<div class="userprofileFieldsContainer">
  <?php print render($user_profile['user_picture']);
  global $base_url;
  ?>
  <div class="editProfileInfo"><a href="<?php echo '/user/'.$user_profile['birthdays']['#object']->uid.'/edit';?>"><span class="profileEditIcon"></span>Edit Profile</a></div>
  
  <?php //print  render($user_profile['field_first_name']);
  //print '<label>' .render($user_profile['field_first_name']['#title']).'</label>';
  print '<div class="profileInformation"><div class=" firstName">'.render($user_profile['field_first_name']['#items'][0]['value']). 
  '</div> <div class=" firstName">' .render($user_profile['field_middle_name']['#items'][0]['value']). '</div>'.
  '<div class=" firstName">' .render($user_profile['field_last_name']['#items'][0]['value']). '</div>'.
  '<div class=" designation">' .render($user_profile['field_emp_id']['#items'][0]['value']). '</div>';
  print '<div class=" designation">'.render($user_profile['field_designation']['#items'][0]['value']). '</div></div>';
  ?>
  </div>
  <div class="profileFields">
	<div class="fieldLeft">
		<div class="contactInfo">
			<h3>Contact Information</h3>
			<?php //print  render($user_profile['field__work_location']);
        $contactInfo=0;
        if(isset($user_profile['field__work_location']['#items'][0]['value']) && $user_profile['field__work_location']['#items'][0]['value']!=''){
			    print '<label>' .render($user_profile['field__work_location']['#title']). '</label>';
			    print '<div class="profileindField">'.render($user_profile['field__work_location']['#items'][0]['value']). '</div>';
          $contactInfo++;
        }
			  if(isset($user_profile['field_email']['#items'][0]['value']) && $user_profile['field_email']['#items'][0]['value']!=''){
			    print '<label>' .render($user_profile['field_email']['#title']). '</label>';
			    print '<div class="profileindField">'.render($user_profile['field_email']['#items'][0]['value']). '</div>';
          $contactInfo++;
        }
        if(isset($user_profile['field_offiice_phone_no']['#items'][0]['value']) && $user_profile['field_offiice_phone_no']['#items'][0]['value']!=''){
			    print '<label>' .render($user_profile['field_offiice_phone_no']['#title']). '</label>';
			    print '<div class="profileindField">'.render($user_profile['field_offiice_phone_no']['#items'][0]['value']). '</div>';
          $contactInfo++;
        }
			  
        if(isset($user_profile['timezone']['#items'][0]['value']) && $user_profile['timezone']['#items'][0]['value']!=''){
			    print '<label>' .render($user_profile['timezone']['#title']). '</label>';
			    print '<div class="profileindField">'.render($user_profile['timezone']['#items'][0]['value']). '</div>';
          $contactInfo++;
        }
		    if($contactInfo==0){
          print '<div class="">Not Available</div>';
        }
		 ?>
		</div>
		
		<div class="personalInfo">
			<h3>Personal Information</h3>
			<?php //print  render($user_profile['field__work_location']);
      $personalInfo=0;
      $user_profile['birthdays'][0]['#markup']=str_replace("/"," ",$user_profile['birthdays'][0]['#markup']);  
      if($user_profile['birthdays']['#items'][0]['day']!=0){
				print '<label>' .render($user_profile['birthdays']['#title']). '</label>';
				print '<div class="profileindField">'. render($user_profile['birthdays']). '</div>';
        $personalInfo++;
      }
      if(isset($user_profile['field_marital_status']['#items'][0]['value']) && $user_profile['field_marital_status']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_marital_status']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_marital_status']['#items'][0]['value']). '</div>';
        $personalInfo++;
      }
      if($user_profile['field_marriage_date']['#items'][0]['day']!=0){
				print '<label>' .render($user_profile['field_marriage_date']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_marriage_date']). '</div>';
      }
      if(isset($user_profile['field_blood_group']['#items'][0]['value']) && $user_profile['field_blood_group']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_blood_group']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_blood_group']['#items'][0]['value']). '</div>';
        $personalInfo++;
      }      
      if($personalInfo==0){
        print '<div class="">Not Available</div>';
      }
      
		 ?>
		</div>
		
	</div>
	<div class="fieldRight">
		<div class="workInfo">
			<h3>Work Information</h3>
			<?php //print  render($user_profile['field__work_location']);
      $workInfo=0;
      if(isset($user_profile['field_department']['#items'][0]['value']) && $user_profile['field_department']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_department']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_department']['#items'][0]['value']). '</div>';
        $workInfo++;
      }  
			if(isset($user_profile['field_project']['#items'][0]['value']) && $user_profile['field_project']['#items'][0]['value']!=''){	  
				print '<label>' .render($user_profile['field_project']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_project']['#items'][0]['value']). '</div>';
        $workInfo++;
      }	

			if($user_profile['field_employee_joining_date']['#items'][0]['day']!=0){
				print '<label>' .render($user_profile['field_employee_joining_date']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_employee_joining_date']). '</div>';
        $workInfo++;
      }
      if(isset($user_profile['field_emp_status']['#items'][0]['value']) && $user_profile['field_emp_status']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_emp_status']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_emp_status']['#items'][0]['value']). '</div>';
        $workInfo++;
      }
      if($workInfo==0){
        print '<div class="">Not Available</div>';
      }
		 ?>
		</div>
		
		<div class="groupInfo">
			<h3>Group/Vertical Information</h3>
			<?php //print  render($user_profile['field__work_location']);
      $groupInfo=0;
      if(isset($user_profile['field_employee_group']['#items'][0]['value']) && $user_profile['field_employee_group']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_employee_group']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_employee_group']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }
      if(isset($user_profile['field_ee_sub_group']['#items'][0]['value']) && $user_profile['field_ee_sub_group']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_ee_sub_group']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_ee_sub_group']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }  
			if(isset($user_profile['field_employee_sub_group']['#items'][0]['value']) && $user_profile['field_employee_sub_group']['#items'][0]['value']!=''){	  
				print '<label>' .render($user_profile['field_employee_sub_group']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_employee_sub_group']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }
      if(isset($user_profile['field_py_area']['#items'][0]['value']) && $user_profile['field_py_area']['#items'][0]['value']!=''){			  
				print '<label>' .render($user_profile['field_py_area']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_py_area']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }  
      if(isset($user_profile['field_vertical']['#items'][0]['value']) && $user_profile['field_vertical']['#items'][0]['value']!=''){				
				print '<label>' .render($user_profile['field_vertical']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_vertical']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }
      if(isset($user_profile['field_sub_vertical']['#items'][0]['value']) && $user_profile['field_sub_vertical']['#items'][0]['value']!=''){				
				print '<label>' .render($user_profile['field_sub_vertical']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_sub_vertical']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }  
			
      if(isset($user_profile['field_employee_function']['#items'][0]['value']) && $user_profile['field_employee_function']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_employee_function']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_employee_function']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }
      if(isset($user_profile['field_cost_center']['#items'][0]['value']) && $user_profile['field_cost_center']['#items'][0]['value']!=''){				
				print '<label>' .render($user_profile['field_cost_center']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_cost_center']['#items'][0]['value']). '</div>';
        $groupInfo++;
      }  
			
      if(isset($user_profile['field_py_area']['#items'][0]['value']) && $user_profile['field_py_area']['#items'][0]['value']!=''){
				print '<label>' .render($user_profile['field_py_area']['#title']). '</label>';
				print '<div class="profileindField">'.render($user_profile['field_py_area']['#items'][0]['value']). '</div>';
        $groupInfo++;
      } 
      if($groupInfo==0){
        print '<div class="">Not Available</div>';
      }
		 ?>
		</div>
	</div>
  </div>
  <?php
  /*
    foreach ($user_profile as $key => $value){
      echo $key .'<br>';
	  if($key == 'user_picture'){
        continue;
      }
      else{
        print render($user_profile[$key]);
      }
    }*/
   ?>
  </div>
</div>
