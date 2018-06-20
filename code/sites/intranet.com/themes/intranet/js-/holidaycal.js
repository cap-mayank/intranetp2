(function ($) {
    $(document).ready(function () {
      loadCalenderData();
      $('#event_type').on('change',function(){
      $('#calendar').fullCalendar('rerenderEvents');
})
$('#event_location').on('change',function(){
  $('#calendar').fullCalendar('rerenderEvents');
})
    });
    
function loadCalenderData(){
  /** Load Calender Data **/
        var event_type=$('#event_type').val();

        $('.anniversaryAjaxHandler').css("visibility", "hidden");
        $('.birthDayAjaxHandler').css("visibility", "hidden");
        var holidayEvents = Drupal.settings.holiday_node.holidays_json;
        var anniversaryDateArray = [];
        var birthdayDateArray = [];
        $.getJSON("/sites/intranet.com/files/event_birth_anniversary.json", function (data) {
            var i = 0, annPresent = 0, birthPresent = 0;
            if(event_type=="hol"){
              var EventsJsons= [];
            }
            else{
              var EventsJsons= data;
            }
            for (variable in holidayEvents) {
                var event = {
                    "id": 'event-hol',
                    "title": holidayEvents[i]['field_holiday_name'],
                    "start": holidayEvents[i]['field_publishing_date'],
                    "location": holidayEvents[i]['field_location'],
                }
                EventsJsons.push(event);
                i++;
            }

            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                events: EventsJsons,
                eventColor: '#378006',
                displayEventTime: false,
                eventRender: function (event, element) {
                    if (event.className == 'calendarAnniversary') {  
                       //checking if another anniversary is present on the same day.
                       if (jQuery.inArray(event.start['_i'], anniversaryDateArray) == -1){
                          anniversaryDateArray.push(event.start['_i']); 
                          element.append('<div class="hCalAnniversary"></div>'); 
                       }  
                    } else if (event.className == 'calendarBirthday') {
                        //checking if another birthday is present on the same day.
                      if (jQuery.inArray(event.start['_i'], birthdayDateArray) == -1){
                          birthdayDateArray.push(event.start['_i']); 
                          element.append('<div class="hCalBirthday"></div>'); 
                       } 
                    }
                    $event_type_filter=['all', event.id].indexOf($('#event_type').val()) >= 0;
                       $event_location_filter=1;
                   // if(event.id=='event-hol') {
                     console.log('user-'+event.location+'selected-'+$('#event_location').val());
                         $event_location_filter=['all', event.location].indexOf($('#event_location').val()) >= 0;
                    //}                    
                    if($event_type_filter && $event_location_filter){
                      $event_type_filter=true;
                    }
                    else {                      
                      $event_type_filter=false;
                    }
                    return $event_type_filter;
                },
                eventClick: function (calEvent, jsEvent, view) {

                },
                dayClick: function (date, jsEvent, view) {
                  fetchSelectedDayDetails(date);    
                },
                eventAfterAllRender: function(){
                  anniversaryDateArray = [];
                  birthdayDateArray = [];
                  /**/
                  date=Date.now();
                  fetchSelectedDayDetails(date);
                 
                  /**/
                }
            });
        });
    /** Load Calender Data **/
}    
function fetchSelectedDayDetails(date){
  var annPresent=0;
  var birthPresent=0;
  
   var dayEvents = $('#calendar').fullCalendar('clientEvents', function (event) {
                        if (moment(event.start).isSame(date, 'day')) {
                            if (event.className == 'calendarAnniversary' && event.location==$('#event_location').val()) {
                                annPresent = 1;
                                return event;
                            } else if (event.className == 'calendarBirthday' && event.location==$('#event_location').val()) {
                                birthPresent = 1;
                                return event;
                            }
                        }
                    });
                    i = 0;
                    
                        $('.clickedDate').css("visibility", "visible");
                        $('.anniversaryAjaxHandler').css("visibility", "visible");                      
                        $('.anniversaryAjaxHandler').css("visibility", "visible").children('div.annUser').remove();

                        $('.birthDayAjaxHandler').css("visibility", "visible");
                        $('.birthDayAjaxHandler').css("visibility", "visible").children('div.holUser').remove();
                        
                    
                    if (dayEvents === undefined || dayEvents.length == 0) {              

                             if($('#event_type').val()=='event-hol'){
                              $('.clickedDate').css("visibility", "hidden");
                              $('.anniversaryAjaxHandler').css("visibility", "hidden"); 
                              $('.birthDayAjaxHandler').css("visibility", "hidden"); 
                              $('.anniversaryAjaxHandler').css("visibility", "hidden").children('div.annUser').remove();    
                              $('.birthDayAjaxHandler').css("visibility", "hidden").children('div.holUser').remove();                             
                              
                            }                            
                          else if($('#event_type').val()=='event-ann'){       
                              $('.birthDayAjaxHandler').css("visibility", "hidden");                       
                              $('.birthDayAjaxHandler').css("visibility", "hidden").children('div.holUser').remove(); 
                               $('.anniversaryAjaxHandler').css("visibility", "visible").children('div.annUser').remove(); 
                              $('.anniversaryAjaxHandler').append('<div class="annUser">Not Available</div>');
                            } 
                            else if($('#event_type').val()=='event-birth'){
                             $('.anniversaryAjaxHandler').css("visibility", "hidden");                      
                             $('.anniversaryAjaxHandler').css("visibility", "hidden").children('div.annUser').remove();
                              $('.birthDayAjaxHandler').css("visibility", "visible").children('div.holUser').remove(); 
                             $('.birthDayAjaxHandler').append('<div class="holUser">Not Available</div>');
                             
                            }else
                            {
                                            $('.anniversaryAjaxHandler').append('<div class="annUser">Not Available</div>');
                              $('.birthDayAjaxHandler').append('<div class="holUser">Not Available</div>');
                            }
               
                        
                        
                    } else {
                        
                         if($('#event_type').val()=='event-hol'){
                          $('.clickedDate').css("visibility", "hidden");
                          $('.anniversaryAjaxHandler').css("visibility", "hidden"); 
                          $('.birthDayAjaxHandler').css("visibility", "hidden"); 
                          $('.anniversaryAjaxHandler').css("visibility", "hidden").children('div.annUser').remove();    
                          $('.birthDayAjaxHandler').css("visibility", "hidden").children('div.holUser').remove(); 
                          $('.anniversaryAjaxHandler').append('<div class="annUser">Not Available</div>');
                          $('.birthDayAjaxHandler').append('<div class="holUser">Not Available</div>');
                          
                        }
                      
                     // $('.anniversaryAjaxHandler').css("visibility", "visible");
                     // $('.birthDayAjaxHandler').css("visibility", "visible");
                     //// $('.anniversaryAjaxHandler').css("visibility", "visible").children('div.annUser').remove();
                     // $('.birthDayAjaxHandler').css("visibility", "visible").children('div.holUser').remove();
                      
                      if($('#event_type').val()=='event-ann'){
                        $('.birthDayAjaxHandler').css("visibility", "hidden");
                      }
                       if($('#event_type').val()=='event-birth'){
                        $('.anniversaryAjaxHandler').css("visibility", "hidden");
                      }
                        if (annPresent == 1 && ($('#event_type').val()=='event-ann' || $('#event_type').val()=='all')) {
                            $('.anniversaryAjaxHandler').css("visibility", "visible").children('div.annUser').remove();
                            annPresent = 0;
                        } else if($('#event_type').val()=='event-ann' || $('#event_type').val()=='all') {
                            //$('.anniversaryAjaxHandler').css("visibility", "hidden").children('div.annUser').remove();
                            $('.anniversaryAjaxHandler').append('<div class="annUser">Not Available</div>');
                        }
                        if (birthPresent == 1 && ($('#event_type').val()=='event-birth' || $('#event_type').val()=='all')) {

                            $('.birthDayAjaxHandler').css("visibility", "visible").children('div.holUser').remove();
                            birthPresent = 0;
                        } else if($('#event_type').val()=='event-birth' || $('#event_type').val()=='all') {
                            //$('.birthDayAjaxHandler').css("visibility", "hidden").children('div.holUser').remove().remove();
                            $('.birthDayAjaxHandler').append('<div class="holUser">Not Available</div>');
                        }
                        $('.clickedDate').css("visibility", "visible");
                         if($('#event_type').val()=='event-hol')
                           $('.clickedDate').html('');
                         else
                           $('.clickedDate').html(moment(dayEvents[0].start['_i']).format('DD-MMM-YY '));
                         
                        for (dayEvent in dayEvents) {
                            if (dayEvents[i].className == 'calendarAnniversary' && ($('#event_type').val()=='event-ann' || $('#event_type').val()=='all')) {
                                $('.anniversaryAjaxHandler').append('<div class="annUser"><div class="holPic"><img src="' + dayEvents[i].userpicture + '"/></div><div class="holName">' + dayEvents[i].username + '</div></div>');
                            } else if($('#event_type').val()=='event-birth' || $('#event_type').val()=='all') {
                                $('.birthDayAjaxHandler').append('<div class="holUser"><div class="holPic"><img src="' + dayEvents[i].userpicture + '"/></div><div class="holName">' + dayEvents[i].username + '</div>');
                            }
                            i++;
                        }
                        
                        
                        $('html, body').animate({
                            scrollTop: $(".newScroll").offset().top
                        }, 1000);
                    }
}
})(jQuery);