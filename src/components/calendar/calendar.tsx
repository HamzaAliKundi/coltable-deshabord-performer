import React, { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { events } from './events'

// Set up moment locale and localizer
moment.locale('en-GB')
const localizer = momentLocalizer(moment)

const Calendar = () => {
  const [showModal, setShowModal] = useState(false)
  const [currentView, setCurrentView] = useState(Views.MONTH)
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Custom toolbar component
  const CustomToolbar = ({ onNavigate, onView, view, label }: any) => {
    const goToBack = () => {
      let newDate
      switch(view) {
        case Views.MONTH:
          newDate = moment(currentDate).subtract(1, 'month')
          break
        case Views.WEEK:
          newDate = moment(currentDate).subtract(1, 'week')
          break
        case Views.DAY:
          newDate = moment(currentDate).subtract(1, 'day')
          break
        case Views.AGENDA:
          newDate = moment(currentDate).subtract(1, 'week')
          break
        default:
          newDate = moment(currentDate).subtract(1, 'day')
      }
      setCurrentDate(newDate.toDate())
      onNavigate('PREV')
    }

    const goToNext = () => {
      let newDate
      switch(view) {
        case Views.MONTH:
          newDate = moment(currentDate).add(1, 'month')
          break
        case Views.WEEK:
          newDate = moment(currentDate).add(1, 'week')
          break
        case Views.DAY:
          newDate = moment(currentDate).add(1, 'day')
          break
        case Views.AGENDA:
          newDate = moment(currentDate).add(1, 'week')
          break
        default:
          newDate = moment(currentDate).add(1, 'day')
      }
      setCurrentDate(newDate.toDate())
      onNavigate('NEXT')
    }

    const goToCurrent = () => {
      const newDate = new Date()
      setCurrentDate(newDate)
      onNavigate('TODAY')
    }

    return (
      <div className="rbc-toolbar">
        {/* Left section - Navigation */}
        <div className="rbc-btn-group">
          <button type="button" onClick={goToBack}>Back</button>
          <button type="button" onClick={goToCurrent}>Today</button>
          <button type="button" onClick={goToNext}>Next</button>
        </div>

        {/* Center section - Current Date Range */}
        <span className="rbc-toolbar-label">{label}</span>

        {/* Right section - View Options */}
        <div className="rbc-btn-group view-buttons">
          <button
            type="button"
            onClick={() => onView(Views.MONTH)}
            className={view === Views.MONTH ? 'rbc-active' : ''}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => onView(Views.WEEK)}
            className={view === Views.WEEK ? 'rbc-active' : ''}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => onView(Views.DAY)}
            className={view === Views.DAY ? 'rbc-active' : ''}
          >
            Day
          </button>
          <button
            type="button"
            onClick={() => onView(Views.AGENDA)}
            className={view === Views.AGENDA ? 'rbc-active' : ''}
          >
            List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-12 bg-black">
      <div style={{ height: 700 }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          step={30}
          timeslots={2}
          defaultView={Views.MONTH}
          view={currentView}
          onView={(view: View) => setCurrentView(view)}
          date={currentDate}
          onNavigate={date => setCurrentDate(date)}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          popup={true}
          onShowMore={(events, date) => setShowModal(true)}
          onSelectEvent={event => console.log(event)}
          components={{
            toolbar: CustomToolbar
          }}
          style={{
            margin: '20px',
            padding: '20px',
          }}
          min={new Date(0, 0, 0, 6, 0, 0)} // Start at 6 AM
          max={new Date(0, 0, 0, 20, 0, 0)} // End at 8 PM
          tooltipAccessor={event => event.desc}
          formats={{
            monthHeaderFormat: 'MMMM YYYY',
            dayHeaderFormat: 'dddd • MMMM D, YYYY',
            dayRangeHeaderFormat: ({ start, end }) => 
              `${moment(start).format('MMMM D')} - ${moment(end).format('D, YYYY')}`,
            agendaHeaderFormat: ({ start, end }) =>
              `${moment(start).format('MMMM D')} - ${moment(end).format('D, YYYY')}`,
            agendaDateFormat: 'ddd D MMM',
            agendaTimeFormat: 'HH:mm',
            agendaTimeRangeFormat: ({ start, end }) =>
              `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
          }}
        />
      </div>
    </div>
  )
}

export default Calendar
