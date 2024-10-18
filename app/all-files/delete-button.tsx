"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  url: string;
};

export default function DeleteButton({ url }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        // HIT OUR API ENDPOINT TO DELETE OUR FILE
        await fetch(`/api/file`, {
          method: "DELETE",
          body: JSON.stringify({
            url,
          }),
        });
        router.refresh();
      }}
    >
      <Button>DELETE</Button>
    </button>
  );
}
