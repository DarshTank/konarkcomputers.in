"use client";

import { useState, useEffect, useMemo } from "react";
import { Star, ExternalLink, MessageSquarePlus, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import styles from "./GoogleReviews.module.css";

interface Review {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  initials?: string;
  owner_reply?: string;
}

export function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(4.7);
  const [total, setTotal] = useState(274);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>("All");

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Konark+Computers+Shrimad+Bhavan+Dhebar+Rd+Rajkot";

  const tags = [
    { label: "All", count: null },
    { label: "reasonable rate", count: 9 },
    { label: "support after sell", count: 2 },
    { label: "genuine advice", count: 2 },
    { label: "friendly owner", count: 2 },
    { label: "cooperative staff", count: 2 },
    { label: "value for money", count: 2 },
    { label: "work quality", count: 4 },
    { label: "humble behavior", count: 2 },
    { label: "adapter", count: 2 },
  ];

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) setReviews(data.reviews);
        if (data.rating) setRating(data.rating);
        if (data.total) setTotal(data.total);
      })
      .catch((err) => console.error("Failed to load Google reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredReviews = useMemo(() => {
    if (activeTag === "All") return reviews;
    const tagLower = activeTag.toLowerCase();

    const keywordsMap: Record<string, string[]> = {
      "reasonable rate": ["reasonable", "rate", "price", "charge"],
      "support after sell": ["support after sell", "after sales", "after sell", "support"],
      "genuine advice": ["genuine", "advice", "honest"],
      "friendly owner": ["owner", "friendly", "omesh"],
      "cooperative staff": ["staff", "cooperative", "technician"],
      "value for money": ["value", "money", "worth"],
      "work quality": ["work quality", "work", "quality", "service"],
      "humble behavior": ["humble", "behavior", "polite"],
      "adapter": ["adapter", "charger", "power"],
    };

    const searchTerms = keywordsMap[tagLower] || [tagLower];
    return reviews.filter((r) =>
      searchTerms.some((term) => r.text.toLowerCase().includes(term))
    );
  }, [reviews, activeTag]);

  return (
    <section className={styles.reviewsSection}>
      <div className="container">
        <AnimatedSection>
          <div className={styles.reviewsHeader}>
            <div className={styles.googleBrand}>
              <svg className={styles.googleGLogo} viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div>
                <span className={styles.googleTitle}>Google Reviews</span>
                <div className={styles.ratingRow}>
                  <span className={styles.ratingScore}>{rating.toFixed(1)}</span>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={styles.starIcon}
                        fill="#F59E0B"
                        color="#F59E0B"
                      />
                    ))}
                  </div>
                  <span className={styles.totalReviews}>({total} reviews)</span>
                </div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                style={{ gap: "var(--space-2)", fontSize: "var(--text-xs)" }}
              >
                <MessageSquarePlus size={16} />
                Write a Review
              </a>
            </div>
          </div>

          {/* Topic Tags Pill Bar */}
          <div className={styles.tagBar}>
            {tags.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTag(t.label)}
                className={`${styles.tagPill} ${
                  activeTag === t.label ? styles.tagPillActive : ""
                } ${t.label === "All" ? styles.tagPillAll : ""}`}
              >
                <span>{t.label}</span>
                {t.count !== null && (
                  <span className={styles.tagCount}>{t.count}</span>
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {loading ? (
          <div className={styles.loadingSkeleton}>
            <p>Loading live Google reviews...</p>
          </div>
        ) : (
          <div className={styles.reviewsGrid}>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className={styles.reviewCard}>
                  <div className={styles.cardTop}>
                    <div className={styles.authorGroup}>
                      <div className={styles.avatar}>
                        {review.profile_photo_url && !review.profile_photo_url.includes("default-user") ? (
                          <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className={styles.avatarImg}
                          />
                        ) : (
                          review.initials || review.author_name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h4 className={styles.authorName}>
                          {review.author_name}
                          <CheckCircle2 size={14} className={styles.verifiedBadge} />
                        </h4>
                        <span className={styles.reviewDate}>
                          {review.relative_time_description}
                        </span>
                      </div>
                    </div>
                    <div className={styles.cardStars}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#F59E0B"
                          color="#F59E0B"
                        />
                      ))}
                    </div>
                  </div>

                  <p className={styles.reviewText}>&quot;{review.text}&quot;</p>
                </div>
              </AnimatedSection>
            ))
          ) : (
            <p className={styles.noReviewsMsg}>No reviews matching &quot;{activeTag}&quot;. <button onClick={() => setActiveTag("All")} className={styles.resetBtn}>Reset filter</button></p>
          )}
          </div>
        )}

        <div className={styles.footerLinkRow}>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAllLink}
          >
            View all Google reviews
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
