"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchResults from "../actions/searchResults";

interface SearchSuggestion {
  text: string;
  slug?: any;
}

interface SearchBarProps {
  readonly onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  // When the query changes, search for results
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    // Fetching search results (assuming SearchResults returns a list of cars)
    SearchResults(query)
      .then((results: any) => {
        const newSuggestions: SearchSuggestion[] = results.map((car: any) => ({
          text: car.name,
          slug: car.slug?.current,
        }));

        if (newSuggestions.length === 0) {
          setSuggestions([]);
        } else {
          setSuggestions(newSuggestions);
        }

        setShowSuggestions(true);
      })
      .catch(() => {
        setSuggestions([]);
        setShowSuggestions(true);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-5 lg:transform lg:-mt-2 mt-4">
      {/* Search bar */}
      <div
        className="flex items-center justify-between w-[280px] lg:w-[420px] h-[36px]
        lg:rounded-full rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70 
        px-4 relative"
      >
        {/* Search Button */}
        <button>
          <Image
            src="/images/search-normal.png"
            height={24}
            width={24}
            alt="search"
          />
        </button>

        {/* Search Input */}
        <input
          type="text"
          className="absolute bg-transparent lg:w-80 h-10
          placeholder:text-sm placeholder:text-[#596780] placeholder:font-medium placeholder:mx-4
          ml-10 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
          placeholder="Search something here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)} // Show suggestions when focused
        />

        {/* Filter Button */}
        <button>
          <Image
            src="/images/filter.png"
            height={24}
            width={24}
            alt="filter"
            className="hidden lg:flex"
          />
        </button>
      </div>

      {/* Mobile Filter Button */}
      <div
        className="rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70 lg:hidden
        h-10 w-9 flex items-center justify-center relative"
      >
        <button>
          <Image
            src="/images/filter.png"
            height={24}
            width={24}
            alt="filter"
            className="block lg:hidden"
          />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          className="absolute z-30 min-w-96 mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto
        top-5"
        >
          {isLoading && (
            <div className="p-4 text-center text-[#596780]">Loading...</div>
          )}

          {!isLoading && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={`search-item-${index + 1}`}>
                  <Link
                    href={`/detail-car-rent/${suggestion.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      onSearch(suggestion.text);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && suggestions.length === 0 && (
            <div className="p-4 text-center text-[#596780]">No cars found</div>
          )}
        </div>
      )}
    </div>
  );
}

/*Search bar for mobile phones*/

export function SearchBarMobile({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  // When the query changes, search for results
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    // Fetching search results (assuming SearchResults returns a list of cars)
    SearchResults(query)
      .then((results: any) => {
        const newSuggestions: SearchSuggestion[] = results.map((car: any) => ({
          text: car.name,
          slug: car.slug?.current,
        }));

        if (newSuggestions.length === 0) {
          setSuggestions([]);
        } else {
          setSuggestions(newSuggestions);
        }

        setShowSuggestions(true);
      })
      .catch(() => {
        setSuggestions([]);
        setShowSuggestions(true);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /*
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  }; */

  return (
    <div
      className="flex items-center justify-between w-[280px] lg:w-[420px] h-[36px]
               lg:rounded-full rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70 
               px-4 relative"
    >
      <button>
        <Image
          src="/images/search-normal.png"
          height={24}
          width={24}
          alt="search"
        />
      </button>

      <input
        type="text"
        className="absolute bg-transparent lg:w-80 h-10 w-full
             placeholder:text-sm placeholder:text-[#596780] placeholder:font-medium placeholder:mx-4
             ml-10 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
        placeholder="Search something here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          className="absolute z-30 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto
        top-6 left-0"
        >
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={`suggestion-${index + 1}`}>
                  <Link
                    href={`/detail-car-rent/${suggestion.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      onSearch(suggestion.text);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion.text}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center">No cars found</div> // Display message when no results found
          )}
        </div>
      )}
    </div>
  );
}