delete from "enw_session";
delete from "enw_user";
delete from "enw_organisation_type";
delete from "enw_organisation_attribute";
delete from "enw_organisation_types_on_organisation_attributes";

INSERT INTO "enw_user" 
("name", "email", "password","role","is_email_confirmed")
VALUES 
('Super Admin', 'admin_1@enw.in' ,'$2b$10$k1TLQEOc/jDVCExhba8kqeuCQdBlyytZqExLCt0Fr7GTG4sQDg4WS', '0', TRUE);

INSERT INTO "enw_user" 
("name", "email", "password","role","is_email_confirmed")
VALUES 
('Employer 1', 'employer_1@gmail.com' ,'$2b$10$k1TLQEOc/jDVCExhba8kqeuCQdBlyytZqExLCt0Fr7GTG4sQDg4WS', '2', TRUE);

SELECT * FROM "enw_user";

INSERT INTO "enw_organisation_type"
(organisation_type_id, name)
VALUES
('1', 'Public Sector Undretaking'),
('2', 'Private Sector'),
('3', 'Government Organisation'),
('4', 'Government Ministry');

SELECT * FROM "enw_organisation_type";

INSERT INTO "enw_organisation_attribute"
(organisation_attribute_id, name)
VALUES
('1', 'GST Number'),
('2', 'Company Registration Number'),
('3', 'ISIN'),
('4', 'PAN Number'),
('5', 'Orgnanisation Size'),
('6', 'Headquarters Location'),
('7', 'Industry');

-- DROP TABLE  "organisation_type_id";

INSERT INTO "enw_organisation_types_on_organisation_attributes"
(organisation_type_id,organisation_attribute_id)
VALUES
('1','2'), ('1','3'), ('1','4'), ('1','5'), ('1','6'), ('1','7'),
('2','1'), ('2','2'), ('2','3'), ('2','4'), ('2','5'), ('2','6'), ('2','7'),
('3','5'), ('3','6'), ('3','7'),
('4','5'), ('4','6'), ('4','7');

-- select n.nspname as enum_schema,  
--     t.typname as enum_name,
--     string_agg(e.enumlabel, ', ') as enum_value
-- from pg_type t 
--     join pg_enum e on t.oid = e.enumtypid  
--     join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
-- group by enum_schema, enum_name;