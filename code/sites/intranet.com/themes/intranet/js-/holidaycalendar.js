(function ($) {
    var Annowl  = 'NoAnnOwl';
    var Bdayowl = 'NoBdayOwl';
    var locationEventArray = [];
    var holidayEventArray = [];
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

        $('.anniversaryAjaxHandler').css("display", "none");
        $('.birthDayAjaxHandler').css("display", "none");     
        var anniversaryDateArray = [];
        var birthdayDateArray = [];
        

        $.getJSON("/sites/intranet.com/files/event_birth_anniversary.json", function (data) {
            var i = 0, annPresent = 0, birthPresent = 0;
            if(event_type=="hol" || event_type=="unit"){
              var EventsJsons= [];
            }
            else{
              var EventsJsons= data;
            }           
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                },
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                events: EventsJsons,
                eventColor: '#378006',
                displayEventTime: false,       
                eventRender: function (event, element) {
                     element.qtip({
                     content: event.title
                });
                    
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
                  
                         $event_location_filter=['0', event.location].indexOf($('#event_location').val()) >= 0;

                    if($event_type_filter && $event_location_filter){
                      $event_type_filter=true;
                    }
                    else {                      
                      $event_type_filter=false;
                    }
                    
                    if($event_type_filter && event.id==='event-unit'){                      
                       if(locationEventArray.indexOf(event.start['_i']) <= -1 || locationEventArray.length === 0) {
                          locationEventArray.push(event.start['_i']);
                          $event_type_filter=true; 
                        }
                        else
                          $event_type_filter=false;                               
                    } 
                    if($event_type_filter && event.id==='event-hol'){                      
                       if(holidayEventArray.indexOf(event.start['_i']) <= -1 || holidayEventArray.length === 0) {
                          holidayEventArray.push(event.start['_i']);
                          $event_type_filter=true; 
                        }
                        else
                          $event_type_filter=false;                               
                    } 
               
                    return $event_type_filter;
                },
                eventClick: function (calEvent, jsEvent, view) {

                },
                dayClick: function (date, jsEvent, view) {
                  fetchSelectedDayDetails(date,false);    
                },
                eventAfterAllRender: function(){
                  addClassByDate(anniversaryDateArray); 
                  addClassByDate(birthdayDateArray);
                  anniversaryDateArray = [];
                  birthdayDateArray = [];
                  /**/
                  date=Date.now();
                  fetchSelectedDayDetails(date,true);
                  locationEventArray.length = 0;
                  holidayEventArray.length = 0;
                  /**/
                  
                  
                },
            });
        });
    /** Load Calender Data **/
}    
function fetchSelectedDayDetails(date,onloadcall){
  var annPresent=0;
  var birthPresent=0;
  var dayEvents = $('#calendar').fullCalendar('clientEvents', function (event) {
                        if (moment(event.start).isSame(date, 'day')) {
                            if (event.className == 'calendarAnniversary' && ($('#event_location').val()==='0' || event.location===$('#event_location').val())) {
                                annPresent = 1;
                                return event;
                            } else if (event.className == 'calendarBirthday' && ($('#event_location').val()==='0' || event.location===$('#event_location').val()) ) {
                                birthPresent = 1;
                                return event;
                            }
                        }
                    });
                    i = 0;
                    
                        if(Annowl != "NoAnnOwl"){
                            Annowl.data('owlCarousel').destroy();
                            Annowl = "NoAnnOwl";
                        }
                        if(Bdayowl != "NoBdayOwl"){
                            Bdayowl.data('owlCarousel').destroy();
                            Bdayowl = "NoBdayOwl";
                        }
                        $('.clickedDate').css("display", "block");
                        $('.anniversaryAjaxHandler').css("display", "block");                      
                        $('.anniversaryAjaxHandler').css("display", "block").find('div.annUser').remove();
                        
                        $('.birthDayAjaxHandler').css("display", "block");
                        $('.birthDayAjaxHandler').css("display", "block").find('div.holUser').remove();
                        
                        $('.birthdayHolContainer').css("display", "block"); 
                        $('.annHolContainer').css("display", "block");
                        
                    
                    if (dayEvents === undefined || dayEvents.length == 0) {          
                        if($('#event_type').val()=='event-hol'){
                          $('.clickedDate').css("display", "none");
                          $('.anniversaryAjaxHandler').css("display", "none"); 
                          $('.birthDayAjaxHandler').css("display", "none"); 
                          $('.anniversaryAjaxHandler').css("display", "none").find('div.annUser').remove();    
                          $('.birthDayAjaxHandler').css("display", "none").find('div.holUser').remove();
                          $('.birthdayHolContainer').css("display", "none"); 
                          $('.annHolContainer').css("display", "none");
                                
                        }                            
                        else if($('#event_type').val()=='event-ann'){       
                          $('.birthDayAjaxHandler').css("display", "none");                       
                          $('.birthDayAjaxHandler').css("display", "none").find('div.holUser').remove(); 
                          $('.anniversaryAjaxHandler').css("display", "block").find('div.annUser').remove(); 
                          $('.anniversaryAjaxHandler').append('<div class="annUser notAvailable">Not Available</div>');
                          $('.birthdayHolContainer').css("display", "none"); 
                        } 
                        else if($('#event_type').val()=='event-birth'){                          
                          $('.anniversaryAjaxHandler').css("display", "none");                      
                          $('.anniversaryAjaxHandler').css("display", "none").find('div.annUser').remove();
                          $('.birthDayAjaxHandler').css("display", "none").find('div.holUser').remove(); 
                          $('.birthDayAjaxHandler').css("display", "block").find('div.holUser').remove(); 
                          $('.birthDayAjaxHandler').append('<div class="holUser notAvailable">Not Available</div>');
                          $('.annHolContainer').css("display", "none");      
                        }
                        else {
                          $('.anniversaryAjaxHandler').append('<div class="annUser notAvailable">Not Available</div>');
                          $('.birthDayAjaxHandler').append('<div class="holUser notAvailable">Not Available</div>');
                        }

                        if($('#event_type').val()=='event-hol')
                          $('.clickedDate').html('');
                        else
                          $('.clickedDate').html(moment(date).format('DD-MMM-YY '));                            
                        
                        
                    } else {
                        
                        if($('#event_type').val()=='event-hol'){
                          $('.clickedDate').css("display", "none");
                          $('.anniversaryAjaxHandler').css("display", "none"); 
                          $('.birthDayAjaxHandler').css("display", "none");                      
                          $('.anniversaryAjaxHandler').css("display", "none").find('div.annUser').remove();    
                          $('.birthDayAjaxHandler').css("display", "none").find('div.holUser').remove(); 
                          $('.anniversaryAjaxHandler').append('<div class="annUser notAvailable">Not Available</div>');
                          $('.birthDayAjaxHandler').append('<div class="holUser notAvailable">Not Available</div>');
                          $('.birthdayHolContainer').css("display", "none"); 
                          $('.annHolContainer').css("display", "none");
                        }                    
                      
                        if($('#event_type').val()=='event-ann'){
                          $('.birthDayAjaxHandler').css("display", "none");
                          $('.birthdayHolContainer').css("display", "none"); 
                        }
                        if($('#event_type').val()=='event-birth'){
                          $('.anniversaryAjaxHandler').css("display", "none");
                          $('.annHolContainer').css("display", "none");
                        }
                        if (annPresent == 1 && ($('#event_type').val()=='event-ann' || $('#event_type').val()=='all')) {
                          $('.anniversaryAjaxHandler').css("display", "block").find('div.annUser').remove();
                          annPresent = 0;
                        } else if($('#event_type').val()=='event-ann' || $('#event_type').val()=='all') {
                          //$('.anniversaryAjaxHandler').css("display", "none").find('div.annUser').remove();
                          $('.anniversaryAjaxHandler').append('<div class="annUser notAvailable">Not Available</div>');
                        }
                        if (birthPresent == 1 && ($('#event_type').val()=='event-birth' || $('#event_type').val()=='all')) {  
                          $('.birthDayAjaxHandler').css("display", "block").find('div.holUser').remove();
                          birthPresent = 0;
                        } else if($('#event_type').val()=='event-birth' || $('#event_type').val()=='all') {
                          //$('.birthDayAjaxHandler').css("display", "none").find('div.holUser').remove().remove();
                          $('.birthDayAjaxHandler').append('<div class="holUser notAvailable">Not Available</div>');
                        }
                        $('.clickedDate').css("display", "block");
                        if($('#event_type').val()=='event-hol')
                          $('.clickedDate').html('');
                        else
                          $('.clickedDate').html(moment(dayEvents[0].start['_i']).format('DD-MMM-YY '));
                        
                        var bday_count = 0;
                        var ann_count = 0;
                        for (dayEvent in dayEvents) {
                            if (dayEvents[i].className == 'calendarAnniversary' && ($('#event_type').val()=='event-ann' || $('#event_type').val()=='all')) {
                                $('.anniversaryAjaxHandler').append('<div class="annUser"><div class="holPic">' + dayEvents[i].userpicture + '</div><div class="holName">' + dayEvents[i].username + '</div></div>');
                                ann_count++;
                            } else if(dayEvents[i].className == 'calendarBirthday' && ($('#event_type').val()=='event-birth' || $('#event_type').val()=='all')) {                              
                                $('.birthDayAjaxHandler').append('<div class="holUser"><div class="holPic">' + dayEvents[i].userpicture + '</div><div class="holName">' + dayEvents[i].username + '</div></div>');
                                bday_count++;
                            }
                            i++;
                        }
                        if (ann_count > 3) {
                            Annowl = $(".anniversaryAjaxHandler");
                            Annowl.owlCarousel({
								items: 3,
								margin:10,
                            /*itemsCustom : [
                                  [0, 2],
                                  [450, 4],
                                  [600, 7],
                                  [700, 9],
                                  [1000, 10],
                                  [1200, 12],
                                  [1400, 13],
                                  [1600, 15]
                                ],*/

                                navigation : true,
								navigationText: ["<img src='/sites/intranet.com/files/arrow-prev.png'>","<img src='/sites/intranet.com/files/next-arrow.png'>"]

                            });
                        }
                        if (bday_count > 3) {
							
                            Bdayowl = $(".birthDayAjaxHandler");
                            Bdayowl.owlCarousel({
								items: 3,
								margin:10,
                            /*itemsCustom : [
                                  [0, 2],
                                  [450, 4],
                                  [600, 7],
                                  [700, 9],
                                  [1000, 10],
                                  [1200, 12],
                                  [1400, 13],
                                  [1600, 15]
                                ],*/
                                navigation : true,
								navigationText: ["<img src='/sites/intranet.com/files/arrow-prev.png'>","<img src='/sites/intranet.com/files/next-arrow.png'>"]
                            });
                        }
                        if(!onloadcall){
                          $('html, body').animate({
                              scrollTop: $(".newScroll").offset().top
                          }, 1000);
                        }
                        
                    }//else                     
                         
}
function addClassByDate(dateArray) {
  for (i = 0; i < dateArray.length; ++i) {
      // do something with `substr[i]`
      $("[data-date='" + dateArray[i] + "']:not(.hasEvent)").addClass("hasEvent");
    }
}
})(jQuery);