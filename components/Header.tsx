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
    <div className="flex justify-between items-center mb-6">
      <div>
        {email ? (
          <p>Logged in as: {email}</p>
        ) : (
          <p>Not logged in</p>
        )}
      </div>

      {email ? (
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </a>
      )}
    </div>
  );
}