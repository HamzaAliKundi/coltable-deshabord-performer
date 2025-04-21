// Get current date info for dynamic events
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()
const currentDate = today.getDate()

export const events = [
  // Today's events
  {
    title: 'Morning Meeting',
    start: new Date(currentYear, currentMonth, currentDate, 9, 0), // 9:00 AM today
    end: new Date(currentYear, currentMonth, currentDate, 10, 30), // 10:30 AM today
    desc: 'Daily standup meeting'
  },
  {
    title: 'Lunch Break',
    start: new Date(currentYear, currentMonth, currentDate, 12, 0), // 12:00 PM today
    end: new Date(currentYear, currentMonth, currentDate, 13, 0), // 1:00 PM today
    desc: 'Lunch time'
  },
  // Tomorrow's events
  {
    title: 'Team Planning',
    start: new Date(currentYear, currentMonth, currentDate + 1, 14, 0), // 2:00 PM tomorrow
    end: new Date(currentYear, currentMonth, currentDate + 1, 15, 30), // 3:30 PM tomorrow
    desc: 'Weekly planning session'
  },
  // This week's events
  {
    title: 'Conference',
    start: new Date(currentYear, currentMonth, currentDate + 2, 9, 0),
    end: new Date(currentYear, currentMonth, currentDate + 2, 17, 0),
    desc: 'Annual tech conference'
  },
  {
    title: 'All Day Event',
    allDay: true,
    start: new Date(currentYear, currentMonth, currentDate + 3),
    end: new Date(currentYear, currentMonth, currentDate + 3),
    desc: 'Full day event'
  },
  // Long running event
  {
    title: 'Training Week',
    start: new Date(currentYear, currentMonth, currentDate + 4),
    end: new Date(currentYear, currentMonth, currentDate + 8),
    desc: 'Annual training program'
  },
  // Specific time events
  {
    title: 'Morning Workshop',
    start: new Date(currentYear, currentMonth, currentDate + 5, 10, 0),
    end: new Date(currentYear, currentMonth, currentDate + 5, 12, 0),
    desc: 'Technical workshop'
  },
  {
    title: 'Late Meeting',
    start: new Date(currentYear, currentMonth, currentDate, 16, 0),
    end: new Date(currentYear, currentMonth, currentDate, 17, 30),
    desc: 'End of day meeting'
  }
] 