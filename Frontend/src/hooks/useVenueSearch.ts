import axios from "axios";
import { useEffect, useState } from "react";
import type { Venue } from "../../Component/venueCard";

type VenueSearchFilters = {
  search: string;
  location: string;
  minRating: string;
};

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/venues";

function buildParams(filters: VenueSearchFilters) {
  const params: Record<string, string> = {};

  if (filters.search.trim()) {
    params.search = filters.search.trim();
  }

  if (filters.location.trim()) {
    params.location = filters.location.trim();
  }

  if (filters.minRating.trim()) {
    params.minRating = filters.minRating.trim();
  }

  return params;
}

export default function useVenueSearch(filters: VenueSearchFilters) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadVenues = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(API_URL, {
          params: buildParams(filters),
          signal: controller.signal,
        });

        const data = response.data;
        setVenues(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError("Could not fetch venues right now. Please try again soon.");
      } finally {
        setIsLoading(false);
      }
    };

    loadVenues();
    return () => controller.abort();
  }, [filters]);

  return {
    venues,
    isLoading,
    error,
  };
}

export type { VenueSearchFilters };
