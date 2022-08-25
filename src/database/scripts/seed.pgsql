-- delete from "enw_organisation_media";
-- delete from "enw_organisation";
-- delete from "enw_payment";
DELETE FROM "skill";
DELETE FROM "job";
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
("user_id", "name")
VALUES
(1,3, 'Employer 1');

INSERT INTO "job" 
("title", "description", "organisation", "minAge", "maxAge", "salaryRange", "yearsOfExperience", "state", "lastDateOfApplication" )
VALUES 
('Director', 'Director of GST Council Secretariat', '3', '28', '35', '{"start": 2000 , "end": 8000}', '15', 'Goa', '20/10/2022' ),
('Deputy Secretary', 'Deputy Secretary of GST Council Secretariat', '3', '28', '35', '{"start": 2000 , "end": 8000}', '10', 'Goa', '20/10/2022' ),
('Under Secretary', 'Under Secretary of GST Council Secretariat', '3', '28', '35', '{"start": 2000 , "end": 8000}', '8', 'Goa', '20/10/2022' ),
('Assistant Grade II', 'Assistant Grade II at V.V Giri National Labour Institute Noida', '4', '20', '35', '{"start": 2000 , "end": 8000}', '8', 'Bihar', '10/10/2022' ),
('Upper Division Clerk', 'Upper Division Clerk at Indian Pharmacopoeia Commission', '5', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Assam', '5/10/2022' ),
('Assistant', 'Assistant at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '6', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '28/09/2022' ),
('Stenographer Gr.I', 'Stenographer Gr.I at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '6', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '28/09/2022' ),
('Junior Weaver', 'Junior Weaver at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '6', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '28/09/2022' ),
('Ordinary Grade Driver', 'Ordinary Grade Driver at Geological Survey of India Kolkata', '7', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'West Bengal', '27/09/2022' ),
('Community Based Rehabilitation Worker', 'Community Based Rehabilitation Worker at Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', '8', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Delhi', '27/09/2022' );

SELECT * FROM "organisation";

-- DROP TABLE  "organisation_type_id";


-- select n.nspname as enum_schema,  
--     t.typname as enum_name,
--     string_agg(e.enumlabel, ', ') as enum_value
-- from pg_type t 
--     join pg_enum e on t.oid = e.enumtypid  
--     join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
-- group by enum_schema, enum_name;