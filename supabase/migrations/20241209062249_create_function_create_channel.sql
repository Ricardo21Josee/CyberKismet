/*Alternative function*/
create or replace function create_channel(
  user1 uuid,         -- Primer usuario / First user
  user2 uuid,         -- Segundo usuario / Second user
  channel text        -- Nombre o ID del canal / Channel name or ID
)
returns table(channel_url text)
language plpgsql
security definer
as $$
declare
  sendbird_app_id text := 'A51D3F72-8065-4E00-A5AB-F17C569DF69F'; -- Nuevo ID de la app Sendbird
  sendbird_api_token text := '9344a577cb8ffaf8195f12d619a15d09f4e8c27d'; -- Nuevo API token
  sendbird_api_url text; -- URL de la API Sendbird / Sendbird API URL
  sendbird_status int;   -- Código de estado de la respuesta / Response status code
  sendbird_content jsonb; -- Contenido de la respuesta / Response content
  members_url text;      -- URL para obtener miembros del canal / URL to get channel members
  members_status int;    -- Código de estado de miembros / Members status code
  members_content jsonb; -- Contenido de miembros / Members content
  missing_users text[];  -- Usuarios faltantes en el canal / Missing users in the channel
begin
  -- Crea ambos usuarios en Sendbird / Create both users in Sendbird
  perform http((
    'POST',
    'https://api-' || sendbird_app_id || '.sendbird.com/v3/users',
    array[http_header('Api-Token', sendbird_api_token)],
    'application/json',
    json_build_object('user_id', user1::text, 'nickname', user1::text)::text
  )::http_request);

  perform http((
    'POST',
    'https://api-' || sendbird_app_id || '.sendbird.com/v3/users',
    array[http_header('Api-Token', sendbird_api_token)],
    'application/json',
    json_build_object('user_id', user2::text, 'nickname', user2::text)::text
  )::http_request);

  -- Intenta crear el canal de chat / Try to create the chat channel
  sendbird_api_url := 'https://api-' || sendbird_app_id || '.sendbird.com/v3/group_channels';

  select status, content::jsonb into sendbird_status, sendbird_content
  from http((
    'POST',
    sendbird_api_url,
    array[http_header('Api-Token', sendbird_api_token)],
    'application/json',
    json_build_object(
      'user_ids', array[user1::text, user2::text],
      'channel_url', channel
    )::text
  )::http_request);

  -- Si el canal ya existe, revisa los miembros y agrega a los que falten
  -- If the channel already exists, check members and add missing ones
  if sendbird_status != 200 then
    if (sendbird_content->>'code')::int = 400202 then
      -- Obtener miembros actuales del canal / Get current channel members
      members_url := 'https://api-' || sendbird_app_id || '.sendbird.com/v3/group_channels/' || channel || '/members';
      select status, content::jsonb into members_status, members_content
      from http((
        'GET',
        members_url,
        array[http_header('Api-Token', sendbird_api_token)],
        null,
        null
      )::http_request);

      -- Verifica quién falta / Check who is missing
      missing_users := ARRAY[]::text[];
      if NOT EXISTS (
        select 1 from jsonb_array_elements(members_content->'members') as m
        where m->>'user_id' = user1::text
      ) then
        missing_users := array_append(missing_users, user1::text);
      end if;
      if NOT EXISTS (
        select 1 from jsonb_array_elements(members_content->'members') as m
        where m->>'user_id' = user2::text
      ) then
        missing_users := array_append(missing_users, user2::text);
      end if;

      -- Invita a los que falten / Invite missing users
      if array_length(missing_users, 1) > 0 then
        perform http((
          'POST',
          'https://api-' || sendbird_app_id || '.sendbird.com/v3/group_channels/' || channel || '/invite',
          array[http_header('Api-Token', sendbird_api_token)],
          'application/json',
          json_build_object('user_ids', missing_users)::text
        )::http_request);
      end if;
    else
      raise exception 'sendbird error: %', sendbird_content; -- Lanza excepción si hay otro error / Raise exception if other error
    end if;
  end if;

  -- Devuelve la URL del canal creado / Return the created channel URL
  return query
    select channel as channel_url;
end;
$$;





/*Original function*/
/*create or replace function chat.create_channel(
  channel uuid,      -- ID del canal / Channel ID
  user1 uuid,        -- Primer usuario / First user
  user2 uuid         -- Segundo usuario / Second user
)
returns void
language plpgsql
as $$
declare
  sendbird_app_id text;      -- ID de la app Sendbird / Sendbird app ID
  sendbird_api_token text;   -- Token de API Sendbird / Sendbird API token
  sendbird_api_url text;     -- URL de la API Sendbird / Sendbird API URL
  sendbird_status int;       -- Código de estado de la respuesta / Response status code
  sendbird_content jsonb;    -- Contenido de la respuesta / Response content
begin
  select decrypted_secret into sendbird_app_id
  from vault.decrypted_secrets
  where name = 'sendbird_app_id';

  select decrypted_secret into sendbird_api_token
  from vault.decrypted_secrets
  where name = 'sendbird_api_token';

  sendbird_api_url := 'https://api-' || sendbird_app_id || '.sendbird.com/v3/group_channels/';

  select status, content::jsonb into sendbird_status, sendbird_content
  from http((
    'POST',
    sendbird_api_url,
    array[http_header('Api-Token',sendbird_api_token)],
    'application/json',
    json_build_object(
      'user_ids', array[user1::text, user2::text],
      'channel_url', channel
    )::text
  )::http_request);

  if sendbird_status != 200 then
      if (sendbird_content->>'code')::int != 400202 then
        raise exception 'sendbird error: %', sendbird_content;
      end if;
    end if;
end;
$$;
*/