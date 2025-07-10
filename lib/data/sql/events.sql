CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

INSERT INTO events (id, name, description, date, created_at, updated_at) VALUES
  ('b1a1c1d2-1234-4e5f-8a9b-1c2d3e4f5a6b', 'Tech Conference', 'A conference about the latest in tech.', '2025-08-15T09:00:00+00:00', now(), now()),
  ('c2b2d2e3-2345-5f6a-9b8c-2d3e4f5a6b7c', 'Startup Meetup', 'Networking event for startups.', '2025-09-10T18:30:00+00:00', now(), now()),
  ('d3c3e3f4-3456-6a7b-8c9d-3e4f5a6b7c8d', 'AI Workshop', 'Hands-on workshop on AI and ML.', '2025-10-05T14:00:00+00:00', now(), now());