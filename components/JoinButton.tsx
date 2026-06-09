"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  eventId: string;
};

export default function JoinButton({
  eventId,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [joined, setJoined] =
    useState(false);

  useEffect(() => {
    checkJoined();
  }, []);

  async function checkJoined() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("event_attendees")
      .select("*")
      .eq("event_id", eventId)
      .eq("user_id", user.id)
      .single();

    if (data) {
      setJoined(true);
    }
  }

  async function handleJoin() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    if (joined) {
      const { error } = await supabase
        .from("event_attendees")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", user.id);

      if (error) {
        alert(error.message);
      } else {
        setJoined(false);
      }
    } else {
      const { error } = await supabase
        .from("event_attendees")
        .insert([
          {
            event_id: eventId,
            user_id: user.id,
          },
        ]);

      if (error) {
        alert(error.message);
      } else {
        setJoined(true);
      }
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`mt-4 px-4 py-2 rounded text-white ${
        joined
          ? "bg-red-600"
          : "bg-green-600"
      }`}
    >
      {loading
        ? "Loading..."
        : joined
        ? "Leave Event"
        : "Join Event"}
    </button>
  );
}