SELECT s.session_id, s.valid, s.created_at, u.name 
FROM "enw_session" AS s
INNER JOIN "enw_user"  AS u
USING("user_id");