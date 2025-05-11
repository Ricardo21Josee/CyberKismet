create or replace function review_profiles()
returns void
language plpgsql
security definer
as $$
declare
  actor uuid;
  loc geography;
  max_distance int;
  skip_status int := 1;
  review_status int := 6;
begin

select profiles.id into actor
from profiles where profiles.user_id = auth.uid();

if actor is null then
  raise exception 'profile not found for user %', auth.uid();
end if;

select location, max_distance_km into loc, max_distance
from profiles
where id = actor;

update interactions
set status_id = review_status, updated_at = now()
where actor_id = actor
  and status_id = skip_status
  and st_dwithin(
    (select location from profiles where profiles.id = interactions.target_id),
    loc,
    max_distance * 1000
  );
end;
$$;
