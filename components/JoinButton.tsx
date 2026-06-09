"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  eventId: string;
};

export default function JoinButton({
  eventId,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function joinEvent() {
    setLoading(true);

    // Get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    // Check if already joined
    const { data: existingJoin } =
      await supabase
        .from("event_attendees")
        .select("*")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .single();

    if (existingJoin) {
      alert("You already joined this event");
      setLoading(false);
      return;
    }

    // Insert join
    const { error } = await supabase
      .from("event_attendees")
      .insert([
        {
          event_id: eventId,
          user_id: user.id,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Joined successfully");

      // Refresh page
      window.location.reload();
    }
  }

  return (
    <button
      onClick={joinEvent}
      disabled={loading}
      className="bg-green-600 text-white px-4 py-2 rounded mt-4"
    >
      {loading
        ? "Joining..."
        : "Join Event"}
    </button>
  );
}