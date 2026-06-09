"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Header() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    }

    getUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
  <header className="flex justify-between items-center mb-8 border-b pb-4">
    
    <div className="flex gap-6 items-center">
      <a
        href="/"
        className="font-bold text-xl"
      >
        ⚽ Home
      </a>

      <a
        href="/create-event"
        className="font-semibold text-blue-600"
      >
        Create Event
      </a>

      <a
        href="/my-events"
        className="font-semibold text-blue-600"
      >
        My Events
      </a>
    </div>

    <div className="flex items-center gap-4">
      {email ? (
        <>
          <p className="text-sm">
            {email}
          </p>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </a>
      )}
    </div>
  </header>
);
}