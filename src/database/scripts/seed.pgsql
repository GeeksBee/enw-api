delete from "enw_session";
delete from "enw_user";
INSERT INTO "enw_user" 
("name", "email", "password","role","is_email_confirmed")
VALUES 
('Super Admin', 'admin_1@enw.in' ,'$2b$10$k1TLQEOc/jDVCExhba8kqeuCQdBlyytZqExLCt0Fr7GTG4sQDg4WS', '0', TRUE);
SELECT * FROM "enw_user";

-- select n.nspname as enum_schema,  
--     t.typname as enum_name,
--     string_agg(e.enumlabel, ', ') as enum_value
-- from pg_type t 
--     join pg_enum e on t.oid = e.enumtypid  
--     join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
-- group by enum_schema, enum_name;