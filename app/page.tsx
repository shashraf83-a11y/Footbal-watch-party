export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        ⚽ Mumbai Football Watch Party
      </h1>

      <p className="mt-4 text-lg">
        Discover football screenings, join fan groups, and
        watch matches with fellow fans across Mumbai.
      </p>

      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
        Create Event
      </button>

      <h2 className="text-2xl font-bold mt-10">
        Upcoming Events
      </h2>

      <div className="border rounded p-4 mt-4">
        <h3 className="font-bold">
          World Cup Final Screening
        </h3>
        <p>📍 Bandra Sports Cafe</p>
        <p>🕒 8:00 PM</p>
      </div>

      <div className="border rounded p-4 mt-4">
        <h3 className="font-bold">
          Football Fans Meetup
        </h3>
        <p>📍 Navi Mumbai</p>
        <p>🕒 7:00 PM</p>
      </div>
    </main>
  );
}