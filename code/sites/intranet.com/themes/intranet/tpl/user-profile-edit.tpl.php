<?php print render($form['form_id']); ?>
<?php print render($form['form_build_id']); ?>
<?php print render($form['form_token']); ?>

<div class="profile"<?php print $attributes; ?>>
<div class="userprofileFieldsContainer">
  <div class="editPictureProfile">
  <?php print render($form['picture']); ?>
  </div>
  <div class="profileDetailEdit">
  <?php print '<span>' .$form['field_first_name']['und'][0] ['value']['#entity']->field_first_name['und'][0] ['value']. '&nbsp;';
		print $form['field_middle_name']['und'][0] ['value']['#entity']->field_middle_name['und'][0] ['value']. '&nbsp;';
		print $form['field_last_name']['und'][0] ['value']['#entity']->field_last_name['und'][0] ['value']. '&nbsp;</span><br/>';
  //print render($form['field_first_name']);
  //print render($form['field_middle_name']);
 // print render($form['field_last_name']);
  print '<span class="noneditDesignation">' .$form['field_emp_id']['und'][0] ['value']['#entity']->field_emp_id['und'][0] ['value']. '</span><br/>';
  print '<span class="noneditDesignation">' .$form['field_designation']['und'][0] ['value']['#entity']->field_designation['und'][0] ['value']. '</span>';
  ?>
  </div>
  </div>
  <div class="profileFields">
	<div class="fieldLeft">
		<div class="contactInfo">
			<h3>Contact Information</h3>
			<?php //print  $form['field__work_location']);
			  print render($form['field_locations']);
			  print render($form['field_email']);
			  print render($form['field_offiice_phone_no']);
			  
			  
		  
		 ?>
		</div>
		
		<div class="personalInfo">
			<h3>Personal Information</h3>
			<?php //print  $form['field__work_location']);
				print render($form['field_first_name']);
				print render($form['field_middle_name']);
				print render($form['field_last_name']);
				print render($form['birthdays']);
				print render($form['field_marital_status']);
				print render($form['field_marriage_date']);
				print render($form['field_blood_group']);
				
				
		 ?>
		</div>
		
	</div>
	<div class="fieldRight">
	
		<div class="workInfo">
			<h3>Work Information</h3>
			<?php //print  $form['field__work_location']);
				if(isset($form['field_department'])) {
          $val=($form['field_department']['und'][0]['value']['#value']!='')?$form['field_department']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_department']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				if(isset($form['field_project'])) {
           $val=($form['field_project']['und'][0]['value']['#value']!='')?$form['field_project']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_project']['und'][0]['#title']. '</label>'. 
			 	  '<span class="nonEditableField">' .$val. '</span>';
				}
				//print render($form['field_department']);
				//print render($form['field_project']);
				
				if(isset($form['field_employee_joining_date'])) {
          $val=($form['field_employee_joining_date']['und'][0]['value']['#value']!='')?$form['field_employee_joining_date']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_employee_joining_date']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				if(isset($form['field_emp_status']) && !empty($form['field_emp_status']['und']['#value'][0])) {
          $val=($form['field_emp_status']['und']['#value'][0]!='')?$form['field_emp_status']['und']['#value'][0]:'No Data';
				  print '<label>' .$form['field_emp_status']['und']['#title']. '</label>'. 
			 	  '<span class="nonEditableField">' .$val. '</span>';
				}			
			?>
		</div>
		
		<div class="groupInfo">
			<h3>Group/Vertical Information</h3>
			<?php //print  $form['field__work_location']);
				if(isset($form['field_employee_group'])) {
          $val=($form['field_employee_group']['und'][0]['value']['#value']!='')?$form['field_employee_group']['und'][0]['value']['#value']:'No Data';
			  	  print '<label>' .$form['field_employee_group']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				if(isset($form['field_ee_sub_group'])) {
          $val=($form['field_ee_sub_group']['und'][0]['value']['#value']!='')?$form['field_ee_sub_group']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_ee_sub_group']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				if(isset($form['field_employee_sub_group'])) {
          $val=($form['field_employee_sub_group']['und'][0]['value']['#value']!='')?$form['field_employee_sub_group']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_employee_sub_group']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				if(isset($form['field_py_area'])) {
          $val=($form['field_py_area']['und'][0]['value']['#value']!='')?$form['field_py_area']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_py_area']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				if(isset($form['field_vertical'])) {
          $val=($form['field_vertical']['und'][0]['value']['#value']!='')?$form['field_vertical']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_vertical']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				
				if(isset($form['field_sub_vertical'])) {
          $val=($form['field_sub_vertical']['und'][0]['value']['#value']!='')?$form['field_sub_vertical']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_sub_vertical']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				
				if(isset($form['field_employee_function'])) {
          $val=($form['field_employee_function']['und'][0]['value']['#value']!='')?$form['field_employee_function']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_employee_function']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				if(isset($form['field_cost_center'])) {
          $val=($form['field_cost_center']['und'][0]['value']['#value']!='')?$form['field_cost_center']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_cost_center']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				
				if(isset($form['field_py_area'])) {
          $val=($form['field_py_area']['und'][0]['value']['#value']!='')?$form['field_py_area']['und'][0]['value']['#value']:'No Data';
				  print '<label>' .$form['field_py_area']['und'][0]['#title']. '</label>'. 
				  '<span class="nonEditableField">' .$val. '</span>';
				}
				
				//print render($form['field_employee_group']);
				//print render($form['field_ee_sub_group']);
				//print render($form['field_employee_sub_group']);
				//print render($form['field_py_area']);
				//print render($form['field_vertical']);
				//print render($form['field_sub_vertical']);
				//print render($form['field_employee_function']);
				//print render($form['field_cost_center']);
				//print render($form['field_py_area']);
				 
		 ?>
		</div>
	</div>
	<div class="profileSave">
	<?php
	print render($form['actions']);
	?>
	</div>
  </div></div>
  <?php
  /*
    foreach ($form as $key => $value){
      echo $key .'<br>';
	  if($key == 'user_picture'){
        continue;
      }
      else{
        print $form[$key]);
      }
    }*/
   ?>
 