"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check your email for the login link!");
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Login
      </h1>

      <div className="mt-6 flex flex-col gap-4 max-w-md">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={signIn}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Send Login Link
        </button>
      </div>
    </main>
  );
}