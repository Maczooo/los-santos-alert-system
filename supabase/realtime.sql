
-- Enable realtime for the threat_levels table
ALTER TABLE public.threat_levels REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.threat_levels;
