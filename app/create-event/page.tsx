"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [description, setDescription] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
let imageUrl = "";

if (imageFile) {
  const fileName = `${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("event-images")
    .upload(fileName, imageFile);

  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  const { data } = supabase.storage
    .from("event-images")
    .getPublicUrl(fileName);

  imageUrl = data.publicUrl;
}
    const { error } = await supabase.from("events").insert([
      {
        title,
        venue,
        image_url: imageUrl,
        event_date: eventDate,
        event_time: eventTime,
        organizer_name: organizerName,
        whatsapp_link: whatsappLink,
        description,
        max_attendees: Number(maxAttendees),
      },
    ]);

   if (error) {
  alert(error.message);
  console.log("FULL ERROR:", error);
  return;
}

    alert("Event created successfully!");

    setTitle("");
    setVenue("");
    setEventDate("");
    setEventTime("");
    setOrganizerName("");
    setWhatsappLink("");
    setDescription("");
    setMaxAttendees("");
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Create Football Watch Party
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-6 max-w-lg"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Event Title"
          className="border p-2 rounded"
        />

        <input
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          type="text"
          placeholder="Venue"
          className="border p-2 rounded"
        />

        <input
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          type="date"
          className="border p-2 rounded"
        />

        <input
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          type="time"
          className="border p-2 rounded"
        />

        <input
          value={organizerName}
          onChange={(e) => setOrganizerName(e.target.value)}
          type="text"
          placeholder="Organizer Name"
          className="border p-2 rounded"
        />

        <input
          value={whatsappLink}
          onChange={(e) => setWhatsappLink(e.target.value)}
          type="text"
          placeholder="WhatsApp Group Link"
          className="border p-2 rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded"
        />

        <input
          value={maxAttendees}
          onChange={(e) => setMaxAttendees(e.target.value)}
          type="number"
          placeholder="Maximum Attendees"
          className="border p-2 rounded"
        />
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  }}
/>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Create Event
        </button>
      </form>
    </main>
  );
}