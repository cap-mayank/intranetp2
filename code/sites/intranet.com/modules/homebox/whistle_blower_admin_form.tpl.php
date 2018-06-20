<div class="row">
    <div class="small-12 medium-12 large-8 columns">

        <div class="row">
            <div class="small-12 columns">
                <h5>Whistle Blower</h5>
            </div>
        </div>

        <div class="row">
             <div class="small-12 medium-12 large-8 large-offset-2 columns">
                <?php print render($form['whistle_blower_title']); ?>
            </div>
           
        </div>

        <div class="row">
           <div class="small-12 medium-12 large-8 large-offset-2 columns">
                <?php print render($form['whistle_blower_content']); ?>
            </div>

           
        </div>
		 <div class="row">
           <div class="small-12 medium-12 large-8 large-offset-2 columns">
                <?php print render($form['whistle_blower_report_incident_content']); ?>
            </div>

           
        </div>
		 <div class="row">
           <div class="small-12 medium-12 large-8 large-offset-2 columns">
                <?php print render($form['whistle_blower_to_email']); ?>
            </div>

           
        </div>
		
        
    </div>

    <div class="row">
        <div class="small-12 medium-12 large-8 large-offset-2 columns">
            <?php print render($form['submit']); ?>
        </div>
    </div>
</div>

<!-- Render any remaining elements, such as hidden inputs (token, form_id, etc). -->
<?php print drupal_render_children($form); ?>