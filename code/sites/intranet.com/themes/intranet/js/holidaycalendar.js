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
                eventLimit: false, // allow "more" link when too many events
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
                  /*Enabling ajax behaviour to wish popup links */
                  addAjaxBehaviour();
                  
                 /** This Function hide all tr empty value generated for birthday & annivarsary entries , which were showing unecessary wide spaces.
                  [incase eventLimit=false] that use to make all events individual not consolidated
                  **/
                  disableAllUsersEvent();     

			
                },
            });
        });
    /** Load Calender Data **/
}    

function disableAllUsersEvent(){
  var i=0;
  var maxTdCnt=0;
  var visbleTdCnt=0;
  $('#calendar').find("div.fc-content-skeleton").each(function(i,el){
    maxTdCnt=0;
    visbleTdCnt=0;
    $(el).find('span.fc-title').each(function(i1,el1){

      i=0;
      var $cells = $(el1).parent().parent().parent().parent().find('td');  
      if ($(el1).text().trim()== ''){
        var $cells = $(el1).parent().parent().parent().parent().find('td'); 
        if($cells.length>0) {
          $cells.each(function(ci,cel) {       
            if($(cel).length>0){
              if($(cel).find('span.fc-title').text().trim()!= ''){
                i=1;
                
              }          
            }            
          });
        }   
        if(i==0){
          $(el1).parent().parent().parent().parent().css('display','none');
          //find disabled Tds
          if($cells.length > maxTdCnt) {
            maxTdCnt=$cells.length;            
          }
        }    
      }
      else {

        //add missing td's;
        var headTdObj=$(el1).parent().parent().parent().parent().parent().parent().find('thead tr td');
        var headers=[];
        var index=0;
        var matchIndex=0;
        var left=0;
        var right=0;
        var headerLength=headTdObj.length;
        var presentTD=[];
        if($cells.length < headerLength) {
          //before that check data-date value has multiple row
          if(checkSiblingNodeLength(el1,headerLength)){     
            headTdObj.each(function(ci,cel){    
              headers.push($(cel).attr('data-date'));
              if($(cel).attr('data-date')==$(el1).parent().parent().parent().attr('data-date')){
                matchIndex=index;
                presentTD.push(index);                
              }
              else
              { 
                //if($(cel).length>0){
                  if($cells.parent().find("[data-date='" + $(cel).attr('data-date') + "']").length>0){
                   presentTD.push(index); 
                   console.log('i--'+index);
                }
               index++;
              }
              
              
            });
            var newTrHTML='';
            left=matchIndex-1;
            right=matchIndex+1;    
            visbleTdCnt=headerLength-$cells.length;
            var j=0;
            while (j <= left) { 
              if(jQuery.inArray(j, presentTD) == -1) 
                newTrHTML+='<td></td>';
              j++;
            }
            newTrHTML+=$(el1).parent().parent().parent().parent().html();
            j+=$cells.length;
            while (j <= headerLength-1) {
              if(jQuery.inArray(j, presentTD) == -1) 
                newTrHTML+='<td></td>';
              j++;
            }
            checkOtherSameEventExist(el1);
            $(el1).parent().parent().parent().parent().html(newTrHTML);
            

          }

        }//cell length
      }

    });

  });
}
function checkOtherSameEventExist(el1){
  var holEvent=$(el1).parent().parent().parent().find('.holClass');
  if(holEvent.length>0){
    var moreHolEvent=$(el1).closest('tbody').find('.holClass');
    if(moreHolEvent.length>1){
       $(moreHolEvent).closest('tr:has(td[rowspan])').each(function(ci,cel){ 
         $(cel).children('td').removeAttr("rowspan");
       });     
         
    }
  }
  
  
}

function checkSiblingNodeLength(el1,maxTDLength){
  var data_date=$(el1).parent().parent().parent().attr('data-date');
  var el_val=$(el1).text().trim();
  var tbody=$(el1).parent().parent().parent().parent().parent();
  var addTDStatus= true;
  $(tbody).find("[data-date='" + data_date + "']").each(function(ci,cel) {
   // console.log('searched value'+$(cel).find('span.fc-title').text().trim()+'--comapre to--'+el_val);
    if($(cel).find('span.fc-title').text().trim()!=el_val && $(cel).find('span.fc-title').text().trim()!=''){
     // console.log('going next level'+$(cel).parent().length+'--'+maxTDLength);
      var currentTd=$(cel).parent().find('td');
      if($(currentTd).length==maxTDLength){
        addTDStatus=false;
      }
    }
  });
  return addTDStatus;
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
                            // if clicked date is today then add a wish link.
                            if (dayEvents[i].start.isSame(new Date(), "day")) {
                                if (dayEvents[i].className == 'calendarAnniversary' && ($('#event_type').val()=='event-ann' || $('#event_type').val()=='all')) {
                                    $('.anniversaryAjaxHandler').append('<div class="annUser"><div class="holPic">' + dayEvents[i].userpicture + '</div><div class="holName">' + dayEvents[i].username + '</div><div class="wishLink holName">'+dayEvents[i].wishLink+'</div></div>');
                                    ann_count++;
                                } else if(dayEvents[i].className == 'calendarBirthday' && ($('#event_type').val()=='event-birth' || $('#event_type').val()=='all')) {                              
                                    $('.birthDayAjaxHandler').append('<div class="holUser"><div class="holPic">' + dayEvents[i].userpicture + '</div><div class="holName">' + dayEvents[i].username + '</div><div class="wishLink holName">'+dayEvents[i].wishLink+'</div></div>');
                                    bday_count++;
                                }  
                            }
                            else {
                                if (dayEvents[i].className == 'calendarAnniversary' && ($('#event_type').val()=='event-ann' || $('#event_type').val()=='all')) {
                                    $('.anniversaryAjaxHandler').append('<div class="annUser"><div class="holPic">' + dayEvents[i].userpicture + '</div><div class="holName">' + dayEvents[i].username + '</div></div>');
                                    ann_count++;
                                } else if(dayEvents[i].className == 'calendarBirthday' && ($('#event_type').val()=='event-birth' || $('#event_type').val()=='all')) {                              
                                    $('.birthDayAjaxHandler').append('<div class="holUser"><div class="holPic">' + dayEvents[i].userpicture + '</div><div class="holName">' + dayEvents[i].username + '</div></div>');
                                    bday_count++;
                                }
                            }
                            i++;
                        }
                        if (dayEvents[0].start.isSame(new Date(), "day")) {
                            addAjaxBehaviour();
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
                        if(!onloadcall) {
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
function addAjaxBehaviour() {
  $('.ctools-use-modal:not(.ctools-use-modal-processed)').each(function(i, obj) {
        var url = $(obj).attr('href');
        // This is to pop up the modal as soon as the user clicks the element.
        $(obj).click(Drupal.CTools.Modal.clickAjaxLink);
        var element_settings = {};
        element_settings.url = url;
        element_settings.event = 'click';
        element_settings.progress = { type: 'throbber' };
        var base = url;
        Drupal.ajax[base] = new Drupal.ajax(base, obj, element_settings);
        $(obj).addClass('ctools-use-modal-processed');
    });  
}
})(jQuery);