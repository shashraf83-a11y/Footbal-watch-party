import Header from "../components/Header";
import JoinButton from "../components/JoinButton";
import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  const eventsWithCounts = await Promise.all(
    (events || []).map(async (event) => {
      const { count } = await supabase
        .from("event_attendees")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("event_id", event.id);

      return {
        ...event,
        attendeeCount: count || 0,
      };
    })
  );

  return (
    <main className="p-10">
      <Header />

      <h1 className="text-4xl font-bold">
        ⚽ Mumbai Football Watch Party
      </h1>

      <p className="mt-4 text-lg">
        Discover football screenings,
        join fan groups,
        and watch matches with fellow fans across Mumbai.
      </p>

      <a
        href="/create-event"
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Event
      </a>

      <h2 className="text-2xl font-bold mt-10">
        Upcoming Events
      </h2>

      {eventsWithCounts.length === 0 && (
        <p className="mt-4">
          No events yet.
        </p>
      )}

      {eventsWithCounts.map((event) => (
        <div
          key={event.id}
          className="border rounded p-4 mt-4"
        >
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
          )}

          <h3 className="font-bold text-xl">
            {event.title}
          </h3>

          <p>📍 {event.venue}</p>

          <p>
            📅{" "}
            {new Date(
              event.event_date
            ).toLocaleDateString()}
          </p>

          <p>
            ⏰{" "}
            {new Date(
              `1970-01-01T${event.event_time}`
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {event.organizer_name && (
            <p>
              👤 Organizer:{" "}
              {event.organizer_name}
            </p>
          )}

          {event.max_attendees > 0 && (
            <p>
              👥 Max Attendees:{" "}
              {event.max_attendees}
            </p>
          )}

          <p>
            🙋 Attendees:{" "}
            {event.attendeeCount}
          </p>

          <JoinButton
            eventId={event.id}
          />

          <p className="mt-2">
            {event.description}
          </p>

          {event.whatsapp_link && (
            <a
              href={event.whatsapp_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Join WhatsApp Group
            </a>
          )}
        </div>
      ))}
    </main>
  );
}