import React, { useState } from "react"; // React
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Click Date
  const handleDateClick = (info) => {
    alert(`点击了日期: ${info.dateStr}`);
    // 可以在这里弹窗 => 输入事件 => POST 给后端
  };

  // Click Event
  const handleEventClick = (info) => {
    alert(`点击了事件: ${info.event.title}`);
  };

  // Return
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events} // Events
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="600px"
      />
    </div>
  );
};

// Export
export default Calendar;
