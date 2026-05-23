import { useEffect, useMemo, useRef, useState } from "react";
import VenueCard from "../Component/venueCard";
import useVenueSearch, {
  type VenueSearchFilters,
} from "./hooks/useVenueSearch";

const PAGE_SIZE = 30;

type PaginationItem = number | "ellipsis";

function getPageItems<T>(items: T[], page: number, pageSize: number) {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

function getPaginationItems(
  totalPages: number,
  currentPage: number,
  siblingCount = 1,
  boundaryCount = 2,
): PaginationItem[] {
  if (totalPages <= 0) {
    return [];
  }

  const pages = new Set<number>();
  const startBoundary = Math.min(boundaryCount, totalPages);
  const endBoundaryStart = Math.max(totalPages - boundaryCount + 1, 1);

  for (let page = 1; page <= startBoundary; page += 1) {
    pages.add(page);
  }

  for (let page = endBoundaryStart; page <= totalPages; page += 1) {
    pages.add(page);
  }

  const siblingStart = Math.max(currentPage - siblingCount, 1);
  const siblingEnd = Math.min(currentPage + siblingCount, totalPages);
  for (let page = siblingStart; page <= siblingEnd; page += 1) {
    pages.add(page);
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);
  const items: PaginationItem[] = [];
  let previousPage = 0;

  sortedPages.forEach((page) => {
    if (previousPage && page - previousPage > 1) {
      items.push("ellipsis");
    }
    items.push(page);
    previousPage = page;
  });

  return items;
}
console.log("Using API URL:", import.meta.env.VITE_API_URL);

function App() {
  const listingsRef = useRef<HTMLElement | null>(null);
  const [filters, setFilters] = useState<VenueSearchFilters>({
    search: "",
    location: "",
    minRating: "",
  });
  const [draftFilters, setDraftFilters] = useState<VenueSearchFilters>(filters);
  const [currentPage, setCurrentPage] = useState(1);
  const { venues, isLoading, error } = useVenueSearch(filters);

  const totalPages = Math.max(1, Math.ceil(venues.length / PAGE_SIZE));
  const paginationItems = useMemo(
    () => getPaginationItems(totalPages, currentPage),
    [totalPages, currentPage],
  );
  const pageVenues = useMemo(
    () => getPageItems(venues, currentPage, PAGE_SIZE),
    [venues, currentPage],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [venues]);

  const applyFilters = (nextFilters: VenueSearchFilters) => {
    setDraftFilters(nextFilters);
    setFilters(nextFilters);
    setCurrentPage(1);
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExploreClick = () => {
    applyFilters({ search: "", location: "", minRating: "" });
  };

  const handleTopRatedClick = () => {
    applyFilters({ ...draftFilters, minRating: "4.5" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#fff7ec_0%,_#f7f1ea_52%,_#f3ede5_100%)]">
      <div className="pointer-events-none absolute -top-32 right-[-120px] h-80 w-80 rounded-full bg-amber-200/40 blur-3xl " />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-96 w-96 rounded-full bg-stone-200/60 blur-3xl" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
        <header className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Curated venues, ready to book
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
              Find a venue that feels like your next celebration.
            </h1>
            <p className="mt-4 max-w-xl text-base text-stone-600">
              Live listings from the backend, styled for quick comparison and
              effortless booking decisions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-full bg-amber-200 px-5 py-2 text-sm font-semibold text-amber-950 shadow-[0_18px_30px_-20px_rgba(161,118,70,0.8)] transition hover:-translate-y-0.5"
                type="button"
                onClick={handleExploreClick}
              >
                Explore destinations
              </button>
              <button
                className="rounded-full border border-stone-300 px-5 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
                type="button"
                onClick={handleTopRatedClick}
              >
                Top rated
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-white/85 p-8 shadow-[0_24px_50px_-32px_rgba(54,36,22,0.6)]">
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-amber-200/50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-stone-200/60 blur-2xl" />
            <div className="relative flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                  Pune picks
                </p>
                <h2 className="mt-3 font-display text-2xl text-ink">
                  Stay score
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Based on guest ratings from venues across Pune.
                </p>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-semibold text-ink">9.2</p>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
                  Exceptional
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Updated this week</span>
                <span>Top 30 venues</span>
              </div>
            </div>
          </div>
        </header>

        <section ref={listingsRef} className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-ink">
                Featured venues
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                Search by venue name, location, or rating.
              </p>
            </div>
            <div className="rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
              New arrivals
            </div>
          </div>

          <form
            className="grid gap-4 rounded-3xl bg-white/80 p-5 shadow-[0_16px_30px_-24px_rgba(54,36,22,0.5)] md:grid-cols-[1.6fr_1fr_0.8fr_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              setFilters(draftFilters);
            }}
          >
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Search
              <input
                className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-sm font-normal text-stone-700 outline-none transition focus:border-amber-200"
                placeholder="Hotel Sadanand, Sky Lite..."
                value={draftFilters.search}
                onChange={(event) =>
                  setDraftFilters((prev) => ({
                    ...prev,
                    search: event.target.value,
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Location
              <input
                className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-sm font-normal text-stone-700 outline-none transition focus:border-amber-200"
                placeholder="Balewadi, Pune"
                value={draftFilters.location}
                onChange={(event) =>
                  setDraftFilters((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Min rating
              <select
                className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-sm font-normal text-stone-700 outline-none transition focus:border-amber-200"
                value={draftFilters.minRating}
                onChange={(event) =>
                  setDraftFilters((prev) => ({
                    ...prev,
                    minRating: event.target.value,
                  }))
                }
              >
                <option value="">Any</option>
                <option value="4">4+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>
            </label>
            <div className="flex items-end">
              <button
                className="w-full rounded-full bg-amber-200 px-5 py-2 text-sm font-semibold text-amber-950 shadow-[0_18px_30px_-20px_rgba(161,118,70,0.8)] transition hover:-translate-y-0.5"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          {isLoading ? (
            <div className="rounded-3xl bg-white/70 p-8 text-center text-sm text-stone-600 shadow-[0_16px_30px_-24px_rgba(54,36,22,0.5)]">
              Loading venues from the backend...
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-white/70 p-8 text-center text-sm text-rose-700 shadow-[0_16px_30px_-24px_rgba(54,36,22,0.5)]">
              {error}
            </div>
          ) : venues.length === 0 ? (
            <div className="rounded-3xl bg-white/70 p-8 text-center text-sm text-stone-600 shadow-[0_16px_30px_-24px_rgba(54,36,22,0.5)]">
              No venues found yet. Run the scraper or add venues in the backend.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageVenues.map((venue) => (
                <VenueCard key={venue._id} venue={venue} />
              ))}
            </div>
          )}

          {!isLoading && !error && venues.length > PAGE_SIZE ? (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-ink transition disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {paginationItems.map((item, index) => {
                if (item === "ellipsis") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-sm font-semibold text-stone-500"
                    >
                      ...
                    </span>
                  );
                }

                const isActive = item === currentPage;

                return (
                  <button
                    key={`page-${item}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-amber-200 text-amber-950 shadow-[0_18px_30px_-20px_rgba(161,118,70,0.8)]"
                        : "border border-stone-300 text-ink"
                    }`}
                    type="button"
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </button>
                );
              })}
              <button
                className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-ink transition disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
