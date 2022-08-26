-- delete from "enw_organisation_media";
-- delete from "enw_organisation";
-- delete from "enw_payment";
DELETE FROM "skill";
DELETE FROM "job";
DELETE FROM "organisation";
delete from "session";
delete from "user";


INSERT INTO "user" 
("id","name", "email", "password","role","is_email_confirmed", "is_phone_confirmed")
VALUES 
(1001, 'Super Admin', 'superadmin.one@enw.in' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '0', TRUE, TRUE),
(1002,  'Admin', 'admin.one@enw.in' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '1', TRUE, TRUE),

(10030,  'GST Council Secretariat', 'employer.one@gmail.com' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '2', TRUE, TRUE),
(10031,  'V.V Giri National Labour Institute Noida', 'employer.two@gmail.com' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '2', TRUE, TRUE),
(10032,  'Indian Pharmacopoeia Commission', 'employer.three@gmail.com' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '2', TRUE, TRUE),
(10033,  'Office of the Development Commissioner for Handlooms, Ministry of Textiles', 'employer.four@gmail.com' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '2', TRUE, TRUE),
(10034,  'Geological Survey of India Kolkata', 'employer.five@gmail.com' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '2', TRUE, TRUE),
(10035,  'Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', 'employer.six@gmail.com' ,'$2b$10$gF/U1DtQiYz8RIGb3igvk.VLYGnUlTpoYrGIsF4Ke5xWBXof4G15m', '2', TRUE, TRUE);


INSERT INTO "user"
("id","name", "phone","role","is_email_confirmed", "is_phone_confirmed")
VALUES
(10041,  'Applicant 1', '6969696960' , '3', TRUE, TRUE),
(10042,  'Applicant 2', '6969696961' , '3', TRUE, TRUE),
(10043,  'Applicant 3', '696969696' , '3', TRUE, TRUE),
(10044,  'Applicant 4', '6969696963' , '3', TRUE, TRUE),
(10045,  'Applicant 5', '6969696964' , '3', TRUE, TRUE),
(10046,  'Applicant 6', '6969696965' , '3', TRUE, TRUE),
(10047,  'Applicant 7', '6969696966' , '3', TRUE, TRUE),
(10048,  'Applicant 8', '6969696967' , '3', TRUE, TRUE),
(10049,  'Applicant 9', '6969696968' , '3', TRUE, TRUE),
(100411,  'Applicant 10', '6969696969' , '3', TRUE, TRUE),
(100412,  'Applicant 11', '6969696910' , '3', TRUE, TRUE),
(100413,  'Applicant 12', '6969696911' , '3', TRUE, TRUE),
(100414,  'Applicant 13', '6969696912' , '3', TRUE, TRUE),
(100415,  'Applicant 14', '6969696913' , '3', TRUE, TRUE),
(100416,  'Applicant 15', '6969696914' , '3', TRUE, TRUE),
(100417,  'Applicant 16', '6969696915' , '3', TRUE, TRUE),
(100418,  'Applicant 17', '6969696916' , '3', TRUE, TRUE),
(100419,  'Applicant 18', '6969696917' , '3', TRUE, TRUE),
(100420,  'Applicant 19', '6969696918' , '3', TRUE, TRUE),
(100421,  'Applicant 20', '6969696919' , '3', TRUE, TRUE);

select * from "user";

INSERT INTO "user"
("id","name", "phone","role","is_email_confirmed", "is_phone_confirmed")
VALUES
(10041,  'Applicant 1', '6969696960' , '3', TRUE, TRUE),
(10042,  'Applicant 2', '6969696961' , '3', TRUE, TRUE),
(10043,  'Applicant 3', '696969696' , '3', TRUE, TRUE),
(10044,  'Applicant 4', '6969696963' , '3', TRUE, TRUE),
(10045,  'Applicant 5', '6969696964' , '3', TRUE, TRUE),
(10046,  'Applicant 6', '6969696965' , '3', TRUE, TRUE),
(10047,  'Applicant 7', '6969696966' , '3', TRUE, TRUE),
(10048,  'Applicant 8', '6969696967' , '3', TRUE, TRUE),
(10049,  'Applicant 9', '6969696968' , '3', TRUE, TRUE),
(100411,  'Applicant 10', '6969696969' , '3', TRUE, TRUE),
(100412,  'Applicant 11', '6969696910' , '3', TRUE, TRUE),
(100413,  'Applicant 12', '6969696911' , '3', TRUE, TRUE),
(100414,  'Applicant 13', '6969696912' , '3', TRUE, TRUE),
(100415,  'Applicant 14', '6969696913' , '3', TRUE, TRUE),
(100416,  'Applicant 15', '6969696914' , '3', TRUE, TRUE),
(100417,  'Applicant 16', '6969696915' , '3', TRUE, TRUE),
(100418,  'Applicant 17', '6969696916' , '3', TRUE, TRUE),
(100419,  'Applicant 18', '6969696917' , '3', TRUE, TRUE),
(100420,  'Applicant 19', '6969696918' , '3', TRUE, TRUE),
(100421,  'Applicant 20', '6969696919' , '3', TRUE, TRUE);


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

select * from "skill";


INSERT INTO "organisation"
("id", "user_id", "description", "organisation_type", "gstNumber", "PANnumber", "companyRegistrationNumber", "location", "address", "industry", "valid")
VALUES
(20030, 10030, 'GST Council Secretariat', '2', ' 07AAGFF2194N1Z1', '3WKEYSJ0R4', '1', 'Goa', '1 M.G. Road, Panaji, Goa', '', TRUE),
(20031, 10031, 'V.V Giri National Labour Institute Noida', '2', ' 07AAKBH1965N1Z1', '3WKGBYJ0R4', '2', 'Delhi', 'RH Marg, New Delhi', 'Education', TRUE),
(20032, 10032, 'Indian Pharmacopoeia Commission', '2', ' 07NHGST3984N1Z1', '3WKLGYO0R4', '3', 'Assam', 'Gera Imperium, Assam', '', TRUE),
(20033, 10033, 'Office of the Development Commissioner for Handlooms, Ministry of Textiles', '3', ' 07AAGFF6582M5Z1', '3WKGFI0R4', '4', 'Punjab', 'Ministry of Textiles, Assembly Complex, Punjab', '', TRUE),
(20034, 10034, 'Geological Survey of India Kolkata', '2', ' 07MCFHY1594N1Z1', '3WLAN0R4', '5', 'West Bengal', 'Kolkata', 'Science and Research', TRUE),
(20035, 10035, 'Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', '2', ' 07ABHST1678N1Z1', '3WIPHJ0R4', '6', 'New Delhi', 'Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', 'Healthcare', TRUE);


INSERT INTO "job" 
("title", "description", "organisationId", "minAge", "maxAge", "salaryRange", "yearsOfExperience", "state", "lastDateOfApplication" )
VALUES 
('Director', 'Director of GST Council Secretariat', '20030', '28', '35', '{"start": 2000 , "end": 8000}', '15', 'Goa', '2022-10-20' ),
('Deputy Secretary', 'Deputy Secretary of GST Council Secretariat', '20030', '28', '35', '{"start": 2000 , "end": 8000}', '10', 'Goa', '2022-10-20' ),
('Under Secretary', 'Under Secretary of GST Council Secretariat', '20030', '28', '35', '{"start": 2000 , "end": 8000}', '8', 'Goa', '2022-10-20' ),
('Assistant Grade II', 'Assistant Grade II at V.V Giri National Labour Institute Noida', '20030', '20', '35', '{"start": 2000 , "end": 8000}', '8', 'Bihar', '2022-10-10' ),
('Upper Division Clerk', 'Upper Division Clerk at Indian Pharmacopoeia Commission', '20030', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Assam', '2022-10-10' ),
('Assistant', 'Assistant at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '20031', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '2022-09-28' ),
('Stenographer Gr.I', 'Stenographer Gr.I at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '20031', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '2022-09-28' ),
('Junior Weaver', 'Junior Weaver at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '20031', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '2022-09-28' ),
('Ordinary Grade Driver', 'Ordinary Grade Driver at Geological Survey of India Kolkata', '20031', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'West Bengal', '2022-09-27' ),
('Community Based Rehabilitation Worker', 'Community Based Rehabilitation Worker at Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', '20031', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Delhi', '2022-09-27' );

-- SELECT * FROM "organisation";

-- DROP TABLE  "organisation_type_id";


-- select n.nspname as enum_schema,  
--     t.typname as enum_name,
--     string_agg(e.enumlabel, ', ') as enum_value
-- from pg_type t 
--     join pg_enum e on t.oid = e.enumtypid  
--     join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
-- group by enum_schema, enum_name;