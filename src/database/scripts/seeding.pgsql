INSERT INTO "job" 
("title", "description", "organisation_id", "minAge", "maxAge", "salaryRange", "yearsOfExperience", "state", "lastDateOfApplication" )
VALUES 
('Director', 'Director of GST Council Secretariat', '3', '28', '35', '{"start": 2000 , "end": 8000}', '15', 'Goa', '2022-10-12' ),
('Deputy Secretary', 'Deputy Secretary of GST Council Secretariat', '3', '28', '35', '{"start": 2000 , "end": 8000}', '10', 'Goa', '2022-10-20' ),
('Under Secretary', 'Under Secretary of GST Council Secretariat', '3', '28', '35', '{"start": 2000 , "end": 8000}', '8', 'Goa', '2022-10-18' ),
('Assistant Grade II', 'Assistant Grade II at V.V Giri National Labour Institute Noida', '4', '20', '35', '{"start": 2000 , "end": 8000}', '8', 'Bihar', '2022-10-10' ),
('Upper Division Clerk', 'Upper Division Clerk at Indian Pharmacopoeia Commission', '5', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Assam', '2022-10-05' ),
('Assistant', 'Assistant at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '6', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '2022-09-22' ),
('Stenographer Gr.I', 'Stenographer Gr.I at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '6', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '2022-09-28' ),
('Junior Weaver', 'Junior Weaver at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '6', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '2022-09-28' ),
('Ordinary Grade Driver', 'Ordinary Grade Driver at Geological Survey of India Kolkata', '7', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'West Bengal', '2022-07-23' ),
('Community Based Rehabilitation Worker', 'Community Based Rehabilitation Worker at Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', '8', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Delhi', '2022-09-21' );

INSERT INTO "organisation"
("description", "organisation_type", "gstNumber", "PANnumber", "companyRegistrationNumber", "location", "address", "industry", "valid")
VALUES
('GST Council Secretariat', '2', ' 07AAGFF2194N1Z1', '3WKEYSJ0R4', '1', 'Goa', '1 M.G. Road, Panaji, Goa', '', TRUE),
('V.V Giri National Labour Institute Noida', '2', ' 07AAKBH1965N1Z1', '3WKGBYJ0R4', '2', 'Delhi', 'RH Marg, New Delhi', 'Education', TRUE),
('Indian Pharmacopoeia Commission', '2', ' 07NHGST3984N1Z1', '3WKLGYO0R4', '3', 'Assam', 'Gera Imperium, Assam', '', TRUE),
('Office of the Development Commissioner for Handlooms, Ministry of Textiles', '3', ' 07AAGFF6582M5Z1', '3WKGFI0R4', '4', 'Punjab', 'Ministry of Textiles, Assembly Complex, Punjab', '', TRUE),
('Geological Survey of India Kolkata', '2', ' 07MCFHY1594N1Z1', '3WLAN0R4', '5', 'West Bengal', 'Kolkata', 'Science and Research', TRUE),
('Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', '2', ' 07ABHST1678N1Z1', '3WIPHJ0R4', '6', 'New Delhi', 'Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', 'Healthcare', TRUE);
