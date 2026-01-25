-- Migration: Add age_verified column to initial_signups table
-- Description: Adds age_verified column to track whether user has passed age verification (16+)

ALTER TABLE public.initial_signups
ADD COLUMN IF NOT EXISTS age_verified BOOLEAN DEFAULT FALSE;

-- Add age_verification_date to track when verification occurred
ALTER TABLE public.initial_signups
ADD COLUMN IF NOT EXISTS age_verification_date TIMESTAMP DEFAULT NULL;
