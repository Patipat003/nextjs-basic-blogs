"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface SearchInputProps {
  initialValue: string;
}

export default function SearchInput({ initialValue }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState(initialValue);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="bg-black/30 rounded-md border-b-2 border-indigo-500 gap-2 py-3 px-4 mt-5 mx-6 w-full md:w-2/4">
      <input
        value={input}
        onChange={handleInputChange}
        type="text"
        placeholder="Search News..."
        className="bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1 w-full"
      />
      {isPending && (
        <div className="absolute right-4">
          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
