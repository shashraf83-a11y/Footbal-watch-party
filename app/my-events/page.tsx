import Header from "../../components/Header";
import { supabase } from "../../lib/supabase";

export default async function MyEvents() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="p-10">
        <Header />

        <h1 className="text-3xl font-bold">
          Please login first
        </h1>
      </main>
    );
  }

  const { data: joinedEvents } =
    await supabase
      .from("event_attendees")
      .select(`
        events (
          id,
          title,
          venue,
          event_date,
          event_time,
          image_url
        )
      `)
      .eq("user_id", user.id);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <Header />

      <h1 className="text-4xl font-bold mb-6">
        My Joined Events
      </h1>

      {joinedEvents?.length === 0 && (
        <p>
          You haven't joined any events yet.
        </p>
      )}

      <div className="grid gap-6">
        {joinedEvents?.map((item: any) => {
          const event = item.events;

          return (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-2xl font-bold">
                  {event.title}
                </h2>

                <p className="mt-2">
                  📍 {event.venue}
                </p>

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
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}