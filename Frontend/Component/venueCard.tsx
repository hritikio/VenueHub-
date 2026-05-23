export type Venue = {
  _id: string;
  name: string;
  location: string;
  capacity?: string;
  image: string;
  venueUrl: string;
  rating: number;
  reviewCount?: number;
  vegPrice?: number;
  nonVegPrice?: number;
  source?: string;
  fullDayRental?: number;
  halfDayRental?: number;
};

type VenueCardProps = {
  venue: Venue;
};

export default function VenueCard({ venue }: VenueCardProps) {
  const ratingLabel = venue.rating ? venue.rating.toFixed(1) : "New";
  const reviewLabel = venue.reviewCount
    ? `${venue.reviewCount.toLocaleString()} reviews`
    : "No reviews yet";

  return (
    <article className="group overflow-hidden rounded-3xl bg-white/90 shadow-[0_24px_50px_-32px_rgba(54,36,22,0.6)] ring-1 ring-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_36px_60px_-34px_rgba(54,36,22,0.6)]">
      <div className="relative h-52 overflow-hidden cursor-pointer">
        <img
          src={venue.image}
          alt={venue.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          <svg
            className="h-3.5 w-3.5 text-amber-300"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 1.6l2.37 4.8 5.3.77-3.84 3.74.9 5.26L10 13.6l-4.73 2.48.9-5.26L2.34 7.17l5.3-.77L10 1.6z" />
          </svg>
          {ratingLabel}
        </div>
      </div>
      <div className="flex h-full flex-col gap-5 px-6 pb-7 pt-6">
        <div>
          <h3 className="font-display text-[1.35rem] leading-tight text-ink">
            {venue.name}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-stone-500">
            <svg
              className="h-4 w-4 text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2.5c-3.04 0-5.5 2.4-5.5 5.36 0 1.45.62 2.9 1.62 4.13 1.03 1.26 2.44 2.43 3.88 3.41.35.24.65.24 1 0 1.44-.98 2.85-2.15 3.88-3.41 1-1.23 1.62-2.68 1.62-4.13 0-2.96-2.46-5.36-5.5-5.36zm0 3a2.2 2.2 0 100 4.4 2.2 2.2 0 000-4.4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{venue.location}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-stone-600">
          <span className="rounded-full bg-amber-50/80 px-3 py-1 text-amber-900">
            Capacity {venue.capacity}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50/80 px-3 py-1 text-emerald-800">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.5 3c-3.1 0-6 2.1-6 5.5 0 3.2 2.6 6.1 6 8 3.4-1.9 6-4.8 6-8 0-3.4-2.9-5.5-6-5.5zm-.5 2.2c2 0 3.8 1.5 3.8 3.5 0 1.9-1.5 3.8-3.8 5.3-2.3-1.5-3.8-3.4-3.8-5.3 0-2 1.8-3.5 3.8-3.5z" />
            </svg>
            <span>Veg</span>
            <span className="text-emerald-700/80">
              {venue.vegPrice ? `Rs ${venue.vegPrice}` : "N/A"}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 px-3 py-1 text-rose-800">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 3.2c2.4 0 4.2 1.4 4.8 3.5h1.7c2 0 3.5 1.5 3.5 3.6 0 2.3-1.9 4.3-4.7 4.3H7.2c-2.5 0-4.2-1.7-4.2-4 0-2.2 1.6-3.9 3.8-4.2.5-1.8 1.9-3.2 3.8-3.2z" />
            </svg>
            <span>Non-Veg</span>
            <span className="text-rose-700/80">
              {venue.nonVegPrice ? `Rs ${venue.nonVegPrice}` : "N/A"}
            </span>
          </span>
        </div>
        {((venue.halfDayRental ?? 0) > 0 || (venue.fullDayRental ?? 0) > 0) && (
          <div className="grid gap-2 rounded-2xl bg-stone-50 px-4 py-3 text-xs text-stone-600">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.2em] text-stone-400">
                Rentals
              </span>
              {venue.source ? (
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400">
                  {venue.source}
                </span>
              ) : null}
            </div>
            {(venue.halfDayRental ?? 0) > 0 ? (
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-stone-500">
                  <svg
                    className="h-3.5 w-3.5 text-amber-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm.75 4a.75.75 0 00-1.5 0v3.1c0 .2.08.39.22.53l2.2 2.2a.75.75 0 101.06-1.06l-1.98-1.98V6.5z" />
                  </svg>
                  Half day
                </span>
                <span className="font-semibold text-stone-700">
                  Rs {venue.halfDayRental}
                </span>
              </div>
            ) : null}
            {(venue.fullDayRental ?? 0) > 0 ? (
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-stone-500">
                  <svg
                    className="h-3.5 w-3.5 text-amber-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm.75 4a.75.75 0 00-1.5 0v3.1c0 .2.08.39.22.53l2.2 2.2a.75.75 0 101.06-1.06l-1.98-1.98V6.5z" />
                  </svg>
                  Full day
                </span>
                <span className="font-semibold text-stone-700">
                  Rs {venue.fullDayRental}
                </span>
              </div>
            ) : null}
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-stone-600">
          <span>{reviewLabel}</span>
        </div>
        <a
          className="inline-flex w-full items-center justify-center rounded-full bg-amber-200 px-4 py-2 text-sm font-semibold text-amber-950 shadow-[0_18px_30px_-20px_rgba(161,118,70,0.8)] opacity-0 pointer-events-none transition duration-300 translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0"
          href={venue.venueUrl}
          target="_blank"
          rel="noreferrer"
        >
          Book this place
        </a>
        <a
          className="mt-auto inline-flex items-center justify-center rounded-full bg-amber-200 px-4 py-2 text-sm font-semibold text-amber-950 shadow-[0_18px_30px_-20px_rgba(161,118,70,0.8)] transition hover:-translate-y-0.5"
          href={venue.venueUrl}
          target="_blank"
          rel="noreferrer"
        >
          View details
        </a>
      </div>
    </article>
  );
}
