# Scheduler project breakdown

## Components

- Button
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button

- State:
- Props:
Base uses no props and is considered the default button
Confirm uses the confirm prop to apply the .button--confirm modifier class
Danger uses the danger prop to apply the .button--danger modifier class
Clickable uses the onClick prop to handle the button click event
Disabled uses the disabled prop to apply the disabled attribute to the button element

- Used by:

### DayList

- State:
- Props: 

days:Array a list of day objects (each object includes an id, name, and spots)
day:String the currently selected day
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

The DayList is responsible for rendering a list of DayListItem components. It doesn't have any styles of its own so we don't need a DayList.scss file.
 
- Used by: Application

### DayListItem
 /home/pgarcia/lighthouse/w7/scheduler/src/components/DayListItem.js
- State:
- Props:
name:String the name of the day
spots:Number the number of spots remaining
selected:Boolean true or false declaring that this day is selected
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

- Used by: DayListItem

### InterviewerList

- State:
- Props:

Our InterviewerList takes in three props:

interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id

- Used by:

### InterviewerListItem

- State:
- Props:

Our InterviewerListItem component takes in the following props:

id:number - the id of the interviewer
name:string - the name of the interviewer
avatar:url - a url to an image of the interviewer
selected:boolean - to determine if an interview is selected or not
setInterviewer:function - sets the interviewer upon selection

- Used by:

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State:
- Props:
team
- Used by:

### Appointment/Empty

- State:
- Props:
onAdd:Function 
- Used by:

### Appointment/Show

- State:
- Props:

student:String eg. "Lydia Miller-Jones"
interviewer:Object we can use the interview object that already exists in stories/index.js for this
onEdit:Function to be called when the user clicks the Edit button
onDelete:Function to be called when the user clicks the Delete button

- Used by:

### Appointment/Form

- State:
name:String
interviewer:Number
- Props:
name:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function
setName:Function
setInterviewer:Function

/////////////// Edit:
  name:String
  interviewers:Array
  interviewer:Number
  onSave:Function
  onCancel:Function
////////////// Create 
interviewers:Array
onSave:Function
onCancel:Function

- Used by:

### Appointment/Status

- State:
- Props:
message:String eg. "Deleting"
- Used by:

### Appointment/Error

- State:
- Props:
message:String eg. "Could not delete appointment."
onClose:Function to be called when the user clicks the Close button
- Used by:

### Appointment/Confirm

- State:
- Props:

message:String eg. "Delete the appointment?"
onConfirm:Function to be called when the user clicks the Confirm button
onCancel:Function to be called when the user clicks the Cancel button

- Used by: