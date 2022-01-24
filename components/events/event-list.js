import EventItem from "./event-item";

function EventList({ items }) {
  return (
    <ul>
      {items.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          id={event.id}
          image={event.image}
          date={event.date}
          location={event.location}
        />
      ))}
    </ul>
  );
}

export default EventList;
