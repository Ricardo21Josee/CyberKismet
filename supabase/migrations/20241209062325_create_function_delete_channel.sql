create or replace function delete_channel(
  channel text -- ID o URL del canal a eliminar / Channel ID or URL to delete
)
returns table(channel_url text)
language plpgsql
security definer
as $$
declare
  sendbird_app_id text := 'CD1C9972-DF4E-4F41-919D-CC87C4F0311F'; -- ID de la app Sendbird / Sendbird app ID
  sendbird_api_token text := 'a89015a22202cee4e533e2a9e5482a7705b64ed0'; -- Token de API Sendbird / Sendbird API token
  sendbird_api_url text; -- URL de la API Sendbird / Sendbird API URL
  sendbird_status int;   -- Código de estado de la respuesta / Response status code
  sendbird_content jsonb; -- Contenido de la respuesta / Response content
begin
  -- Construye la URL para eliminar el canal / Build URL to delete the channel
  sendbird_api_url := 'https://api-' || sendbird_app_id || '.sendbird.com/v3/group_channels/' || channel;

  -- Realiza la petición DELETE a la API de Sendbird / Perform DELETE request to Sendbird API
  select status, content::jsonb into sendbird_status, sendbird_content
  from http((
    'DELETE',
    sendbird_api_url,
    array[http_header('Api-Token', sendbird_api_token)],
    'application/json',
    null
  )::http_request);

  -- Si la respuesta no es exitosa, lanza una excepción / If response is not successful, raise exception
  if sendbird_status != 200 then
    raise exception 'sendbird error: %', sendbird_content;
  end if;

  -- Devuelve la URL del canal eliminado / Return the deleted channel URL
  return query
    select channel as channel_url;
end;
$$;




/*Original function*/
/*create or replace function chat.delete_channel(
  channel uuid -- ID del canal a eliminar / Channel ID to delete
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

  sendbird_api_url := 'https://api-' || sendbird_app_id || '.sendbird.com/v3/group_channels/' || channel;

  select status, content::jsonb into sendbird_status, sendbird_content
  from http((
    'DELETE',
    sendbird_api_url,
    array[http_header('Api-Token',sendbird_api_token)],
    'application/json',
    null
  )::http_request);

  if sendbird_status != 200 then
    raise exception 'sendbird error: %', sendbird_content;
  end if;
end;
$$;
*/