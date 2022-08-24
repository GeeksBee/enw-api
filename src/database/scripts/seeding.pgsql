# Seeding

INSERT INTO "job" 
("job_id", "issue_date", "title", "description", "organisation_id", "min_age", "max_age", "salary_range", "no_years_experience", "job_location", "last_date" )
VALUES 
('1', '23/08/2022', 'Director', 'Director of GST Council Secretariat', '1', '28', '35', '{"start": 2000 , "end": 8000}', '15', 'Goa', '20/10/2022' ),
('2', '23/08/2022', 'Deputy Secretary', 'Deputy Secretary of GST Council Secretariat', '1', '28', '35', '{"start": 2000 , "end": 8000}', '10', 'Goa', '20/10/2022' ),
('3', '23/08/2022', 'Under Secretary', 'Under Secretary of GST Council Secretariat', '1', '28', '35', '{"start": 2000 , "end": 8000}', '8', 'Goa', '20/10/2022' ),
('4', '23/08/2022', 'Assistant Grade II', 'Assistant Grade II at V.V Giri National Labour Institute Noida', '2', '20', '35', '{"start": 2000 , "end": 8000}', '8', 'Bihar', '10/10/2022' ),
('5', '23/08/2022', 'Upper Division Clerk', 'Upper Division Clerk at Indian Pharmacopoeia Commission', '3', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Assam', '5/10/2022' ),
('6', '18/08/2022', 'Assistant', 'Assistant at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '4', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '28/09/2022' ),
('7', '18/08/2022', 'Stenographer Gr.I', 'Stenographer Gr.I at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '4', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '28/09/2022' ),
('8', '18/08/2022', 'Junior Weaver', 'Junior Weaver at Office of the Development Commissioner for Handlooms, Ministry of Textiles', '4', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Punjab', '28/09/2022' ),
('9', '18/08/2022', 'Ordinary Grade Driver', 'Ordinary Grade Driver at Geological Survey of India Kolkata', '5', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'West Bengal', '27/09/2022' ),
('10', '18/08/2022', 'Community Based Rehabilitation Worker', 'Community Based Rehabilitation Worker at Post Graduate Institute of Medical & Research, Dr. Ram Manohar Lohia Hospital, New Delhi', '6', '20', '40', '{"start": 2000 , "end": 8000}', '8', 'Delhi', '27/09/2022' );


INSERT INTO "organisation"
("id", "description", "organisation_type", "gstNumber", "PANnumber", "companyRegistrationNumber", "location", "address", "industry", "valid")
VALUES
('1', 'GST Council Secretariat', '2', ' 07AAGFF2194N1Z1', '3WKEYSJ0R4', '1', 'Goa', '1 M.G. Road, Panaji, Goa', '', 'TRUE')
