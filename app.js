function createCalendarEvent(){

    //----------- APP CONFIGs --------------//
  
    const calendarId = "";
    const rangeName = "";
    const yearRecurrence = 2; //For how many years should calendar event be recurrent? (min. 1) 
    
    //-------------------------------------//
  
    let calendar = CalendarApp.getCalendarById(calendarId);
  
    function convertDate(date) {
      
      let stringArray = date.toString().replace("'", "").split('/');
  
  
      let today = new Date();
      let year = today.getFullYear();
  
  
      //Check if current year's birthday has already past
      if(Number(stringArray[1]) > (today.getMonth() + 1) && Number(stringArray[0]) > today.getDate()){
        year++;
      }
    
      let formattedDate = new Date(`${year}-${stringArray[1]}-${stringArray[0]}`);
  
      let result = new Date(formattedDate);
  
      //Add one day to set right date
      result.setDate(result.getDate() + 1);
  
      return result;
    }
  
      let events = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(rangeName).getValues();
      events.forEach(e => {
        let date = convertDate(e[1]);
        let eventTitle = e[2];
  
        let eventSearch = calendar.getEventsForDay(date);
        let eventAlreadyCreated = false;
  
        //Check if event has already been created
        eventSearch.forEach(item => {
          if (item.getTitle() == eventTitle) eventAlreadyCreated = true; 
        })
  
        if(!eventAlreadyCreated){
          for(let i = 1; i <= yearRecurrence; i++){
            calendar.createAllDayEvent(eventTitle, date);
            let newDate = new Date(date);
            date = new Date(newDate.setFullYear(date.getFullYear() + 1));
          }
          
        }
          
      })
    
  }