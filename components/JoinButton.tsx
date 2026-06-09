"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  eventId: number;
};

export default function JoinButton({
  eventId,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function joinEvent() {
    try {
      setLoading(true);

      const name = prompt(
        "Enter your name"
      );

      if (!name) return;

      const { error } = await supabase
        .from("event_attendees")
        .insert([
          {
            event_id: eventId,
            attendee_name: name,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Joined successfully!");

      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={joinEvent}
      disabled={loading}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
    >
      {loading ? "Joining..." : "Join Event"}
    </button>
  );
}