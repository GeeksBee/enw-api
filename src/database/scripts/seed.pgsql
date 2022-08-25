-- delete from "enw_organisation_media";
-- delete from "enw_organisation";
-- delete from "enw_payment";
DELETE FROM "skill";
DELETE FROM "organisation";
delete from "enw_session";
delete from "enw_user";


INSERT INTO "enw_user" 
("user_id","name", "email", "password","role","is_email_confirmed", "is_phone_confirmed")
VALUES 
(1, 'Super Admin', 'superadmin.one@enw.in' ,'$2b$10$k1TLQEOc/jDVCExhba8kqeuCQdBlyytZqExLCt0Fr7GTG4sQDg4WS', '0', TRUE, TRUE),
(2,  'Admin', 'admin.one@enw.in' ,'$2b$10$k1TLQEOc/jDVCExhba8kqeuCQdBlyytZqExLCt0Fr7GTG4sQDg4WS', '1', TRUE, TRUE),
(3,  'Employer 1', 'employer.one@gmail.com' ,'$2b$10$k1TLQEOc/jDVCExhba8kqeuCQdBlyytZqExLCt0Fr7GTG4sQDg4WS', '2', TRUE, TRUE),
(4,  'Applicant 1', 'applicant.one@gmail.com' ,'$2b$10$k1TLQEOc/jDVCExhba8kqeuCQdBlyytZqExLCt0Fr7GTG4sQDg4WS', '3', TRUE, TRUE);


INSERT INTO "skill"
("name")
VALUES 
('Typing'),
('Stenographer'),
('Accounting'),
('English'),
('Hindi'),
('Driver'),
('Technician'),
('IT');


SELECT * FROM "enw_user";

INSERT INTO "organisation"
("user_id")
VALUES
(3);

SELECT * FROM "organisation";

-- DROP TABLE  "organisation_type_id";


-- select n.nspname as enum_schema,  
--     t.typname as enum_name,
--     string_agg(e.enumlabel, ', ') as enum_value
-- from pg_type t 
--     join pg_enum e on t.oid = e.enumtypid  
--     join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
-- group by enum_schema, enum_name;