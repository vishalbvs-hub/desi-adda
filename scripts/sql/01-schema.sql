-- ============================================================
-- RESTAURANT ENRICHMENT IMPORT
-- Generated: 2026-03-30T21:25:45.054Z
-- 118 restaurants, 590 reviews
-- ============================================================

-- ── STEP 1: Add new columns to restaurants ──
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS cuisine_type text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS veg_status text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS price_range text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS notable_dishes text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS what_to_order text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS origin_city_match text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS address text;

-- ── STEP 2: Create restaurant_reviews table ──
CREATE TABLE IF NOT EXISTS restaurant_reviews (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  restaurant_google_place_id text NOT NULL,
  author_name text,
  rating numeric,
  review_text text,
  review_time text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE restaurant_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Public read restaurant_reviews" ON restaurant_reviews FOR SELECT USING (true);
