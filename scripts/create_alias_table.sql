-- Create user_aliases table
CREATE TABLE IF NOT EXISTS public.user_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alias VARCHAR(80) UNIQUE NOT NULL,
  email VARCHAR(254) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on alias for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_aliases_alias ON public.user_aliases(alias);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_aliases_email ON public.user_aliases(email);
