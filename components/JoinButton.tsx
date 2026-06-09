"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
eventId: number;
};

export default function JoinButton({
eventId,
}: Props) {
const [joined, setJoined] = useState(false);
const [loading, setLoading] = useState(false);

useEffect(() => {
checkJoined();
}, []);

async function checkJoined() {
const {
data: { user },
} = await supabase.auth.getUser();

```
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
```

}

async function handleJoin() {
setLoading(true);

```
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("Please login first");
  setLoading(false);
  return;
}

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
  setLoading(false);
  return;
}

setJoined(true);
setLoading(false);
```

}

async function handleLeave() {
setLoading(true);

```
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const { error } = await supabase
  .from("event_attendees")
  .delete()
  .eq("event_id", eventId)
  .eq("user_id", user.id);

if (error) {
  alert(error.message);
  setLoading(false);
  return;
}

setJoined(false);
setLoading(false);
```

}

if (joined) {
return ( <button
     onClick={handleLeave}
     className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
   >
Leave Event </button>
);
}

return ( <button
   onClick={handleJoin}
   disabled={loading}
   className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
 >
{loading ? "Loading..." : "Join Event"} </button>
);
}
