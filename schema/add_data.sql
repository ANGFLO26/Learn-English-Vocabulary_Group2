-- Insert new topics
INSERT INTO topic (name_topic, description) VALUES
('Colors', 'Common color names in English'),
('Weather', 'Vocabulary related to weather conditions and seasons');

-- Insert sample vocabulary for Colors
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Red', 'Màu đỏ', '/rɛd/', 6),
('Blue', 'Màu xanh dương', '/bluː/', 6),
('Green', 'Màu xanh lá', '/ɡriːn/', 6),
('Yellow', 'Màu vàng', '/ˈjɛləʊ/', 6),
('Black', 'Màu đen', '/blæk/', 6),
('White', 'Màu trắng', '/waɪt/', 6),
('Orange', 'Màu cam', '/ˈɒrɪndʒ/', 6),
('Purple', 'Màu tím', '/ˈpɜːrpl/', 6),
('Pink', 'Màu hồng', '/pɪŋk/', 6),
('Brown', 'Màu nâu', '/braʊn/', 6);

-- Insert sample vocabulary for Weather
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Sunny', 'Nắng', '/ˈsʌni/', 7),
('Rainy', 'Mưa', '/ˈreɪni/', 7),
('Cloudy', 'Nhiều mây', '/ˈklaʊdi/', 7),
('Windy', 'Gió', '/ˈwɪndi/', 7),
('Snowy', 'Tuyết', '/ˈsnəʊi/', 7),
('Hot', 'Nóng', '/hɒt/', 7),
('Cold', 'Lạnh', '/kəʊld/', 7),
('Spring', 'Mùa xuân', '/sprɪŋ/', 7),
('Summer', 'Mùa hè', '/ˈsʌmər/', 7),
('Winter', 'Mùa đông', '/ˈwɪntər/', 7);

-- Insert sample tests for Colors
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Red"?', 'Màu đỏ', 'Màu đỏ', 'Màu xanh', 'Màu vàng', 6),
('What is the meaning of "Blue"?', 'Màu xanh dương', 'Màu xanh dương', 'Màu tím', 'Màu hồng', 6),
('What is the meaning of "Yellow"?', 'Màu vàng', 'Màu cam', 'Màu vàng', 'Màu đen', 6),
('What is the meaning of "Black"?', 'Màu đen', 'Màu trắng', 'Màu đen', 'Màu nâu', 6),
('What is the meaning of "Purple"?', 'Màu tím', 'Màu tím', 'Màu hồng', 'Màu xanh lá', 6);

-- Insert sample tests for Weather
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Sunny"?', 'Nắng', 'Nắng', 'Mưa', 'Nhiều mây', 7),
('What is the meaning of "Rainy"?', 'Mưa', 'Tuyết', 'Mưa', 'Gió', 7),
('What is the meaning of "Hot"?', 'Nóng', 'Lạnh', 'Nóng', 'Nhiều mây', 7),
('What is the meaning of "Winter"?', 'Mùa đông', 'Mùa đông', 'Mùa hè', 'Mùa xuân', 7),
('What is the meaning of "Cloudy"?', 'Nhiều mây', 'Nhiều mây', 'Nắng', 'Tuyết', 7);



-- Insert new topics
INSERT INTO topic (name_topic, description) VALUES
('Animals', 'Vocabulary related to common animals'),
('Jobs', 'Words for different professions and jobs'),
('Travel', 'Terms related to traveling and tourism');

-- Insert sample vocabulary for Animals
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Dog', 'Chó', '/dɒɡ/', 8),
('Cat', 'Mèo', '/kæt/', 8),
('Bird', 'Chim', '/bɜːrd/', 8),
('Fish', 'Cá', '/fɪʃ/', 8),
('Horse', 'Ngựa', '/hɔːrs/', 8),
('Elephant', 'Voi', '/ˈɛlɪfənt/', 8),
('Tiger', 'Hổ', '/ˈtaɪɡər/', 8),
('Bear', 'Gấu', '/beər/', 8),
('Monkey', 'Khỉ', '/ˈmʌŋki/', 8),
('Lion', 'Sư tử', '/ˈlaɪən/', 8);

-- Insert sample vocabulary for Jobs
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Teacher', 'Giáo viên', '/ˈtiːtʃər/', 9),
('Doctor', 'Bác sĩ', '/ˈdɒktər/', 9),
('Engineer', 'Kỹ sư', '/ˌɛndʒɪˈnɪər/', 9),
('Chef', 'Đầu bếp', '/ʃɛf/', 9),
('Driver', 'Tài xế', '/ˈdraɪvər/', 9),
('Nurse', 'Y tá', '/nɜːrs/', 9),
('Farmer', 'Nông dân', '/ˈfɑːrmər/', 9),
('Artist', 'Nghệ sĩ', '/ˈɑːrtɪst/', 9),
('Police', 'Cảnh sát', '/pəˈliːs/', 9),
('Student', 'Học sinh', '/ˈstuːdnt/', 9);

-- Insert sample vocabulary for Travel
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Airplane', 'Máy bay', '/ˈeərpleɪn/', 10),
('Train', 'Tàu hỏa', '/treɪn/', 10),
('Hotel', 'Khách sạn', '/həʊˈtɛl/', 10),
('Map', 'Bản đồ', '/mæp/', 10),
('Passport', 'Hộ chiếu', '/ˈpæspɔːrt/', 10),
('Ticket', 'Vé', '/ˈtɪkɪt/', 10),
('Luggage', 'Hành lý', '/ˈlʌɡɪdʒ/', 10),
('Beach', 'Bãi biển', '/biːtʃ/', 10),
('Museum', 'Bảo tàng', '/mjuːˈziːəm/', 10),
('Tourist', 'Khách du lịch', '/ˈtʊərɪst/', 10);

-- Insert sample tests for Animals
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Dog"?', 'Chó', 'Chó', 'Mèo', 'Chim', 8),
('What is the meaning of "Elephant"?', 'Voi', 'Hổ', 'Voi', 'Gấu', 8),
('What is the meaning of "Bird"?', 'Chim', 'Cá', 'Ngựa', 'Chim', 8),
('What is the meaning of "Tiger"?', 'Hổ', 'Hổ', 'Sư tử', 'Khỉ', 8),
('What is the meaning of "Fish"?', 'Cá', 'Chó', 'Cá', 'Ngựa', 8);

-- Insert sample tests for Jobs
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Teacher"?', 'Giáo viên', 'Giáo viên', 'Bác sĩ', 'Kỹ sư', 9),
('What is the meaning of "Doctor"?', 'Bác sĩ', 'Y tá', 'Bác sĩ', 'Nông dân', 9),
('What is the meaning of "Chef"?', 'Đầu bếp', 'Nghệ sĩ', 'Đầu bếp', 'Cảnh sát', 9),
('What is the meaning of "Farmer"?', 'Nông dân', 'Nông dân', 'Học sinh', 'Tài xế', 9),
('What is the meaning of "Student"?', 'Học sinh', 'Kỹ sư', 'Giáo viên', 'Học sinh', 9);

-- Insert sample tests for Travel
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Airplane"?', 'Máy bay', 'Máy bay', 'Tàu hỏa', 'Khách sạn', 10),
('What is the meaning of "Hotel"?', 'Khách sạn', 'Bản đồ', 'Khách sạn', 'Hộ chiếu', 10),
('What is the meaning of "Passport"?', 'Hộ chiếu', 'Hộ chiếu', 'Vé', 'Hành lý', 10),
('What is the meaning of "Beach"?', 'Bãi biển', 'Bảo tàng', 'Bãi biển', 'Khách du lịch', 10),
('What is the meaning of "Ticket"?', 'Vé', 'Hành lý', 'Vé', 'Bản đồ', 10);
-- Insert new topics
INSERT INTO topic (name_topic, description) VALUES
('Furniture', 'Vocabulary related to household furniture'),
('Sports', 'Words for different sports and activities'),
('Emotions', 'Terms describing feelings and emotions');

-- Insert sample vocabulary for Furniture
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Table', 'Bàn', '/ˈteɪbl/', 11),
('Chair', 'Ghế', '/tʃeər/', 11),
('Bed', 'Giường', '/bed/', 11),
('Sofa', 'Ghế sofa', '/ˈsəʊfə/', 11),
('Cabinet', 'Tủ', '/ˈkæbɪnɪt/', 11),
('Shelf', 'Kệ', '/ʃelf/', 11),
('Lamp', 'Đèn', '/læmp/', 11),
('Mirror', 'Gương', '/ˈmɪrər/', 11),
('Desk', 'Bàn làm việc', '/desk/', 11),
('Wardrobe', 'Tủ quần áo', '/ˈwɔːrdrəʊb/', 11);

-- Insert sample vocabulary for Sports
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Soccer', 'Bóng đá', '/ˈsɒkər/', 12),
('Basketball', 'Bóng rổ', '/ˈbɑːskɪtbɔːl/', 12),
('Tennis', 'Quần vợt', '/ˈtenɪs/', 12),
('Swimming', 'Bơi lội', '/ˈswɪmɪŋ/', 12),
('Running', 'Chạy bộ', '/ˈrʌnɪŋ/', 12),
('Volleyball', 'Bóng chuyền', '/ˈvɒlibɔːl/', 12),
('Badminton', 'Cầu lông', '/ˈbædmɪntən/', 12),
('Boxing', 'Đấm bốc', '/ˈbɒksɪŋ/', 12),
('Cycling', 'Đạp xe', '/ˈsaɪklɪŋ/', 12),
('Yoga', 'Yoga', '/ˈjəʊɡə/', 12);

-- Insert sample vocabulary for Emotions
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Happy', 'Vui vẻ', '/ˈhæpi/', 13),
('Sad', 'Buồn', '/sæd/', 13),
('Angry', 'Tức giận', '/ˈæŋɡri/', 13),
('Excited', 'Hào hứng', '/ɪkˈsaɪtɪd/', 13),
('Tired', 'Mệt mỏi', '/ˈtaɪərd/', 13),
('Scared', 'Sợ hãi', '/skeərd/', 13),
('Bored', 'Chán', '/bɔːrd/', 13),
('Surprised', 'Ngạc nhiên', '/sərˈpraɪzd/', 13),
('Nervous', 'Lo lắng', '/ˈnɜːrvəs/', 13),
('Calm', 'Bình tĩnh', '/kɑːm/', 13);

-- Insert sample tests for Furniture
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Table"?', 'Bàn', 'Bàn', 'Ghế', 'Giường', 11),
('What is the meaning of "Sofa"?', 'Ghế sofa', 'Tủ', 'Ghế sofa', 'Kệ', 11),
('What is the meaning of "Bed"?', 'Giường', 'Đèn', 'Gương', 'Giường', 11),
('What is the meaning of "Lamp"?', 'Đèn', 'Đèn', 'Bàn làm việc', 'Tủ quần áo', 11),
('What is the meaning of "Desk"?', 'Bàn làm việc', 'Ghế', 'Bàn làm việc', 'Gương', 11);

-- Insert sample tests for Sports
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Soccer"?', 'Bóng đá', 'Bóng đá', 'Bóng rổ', 'Quần vợt', 12),
('What is the meaning of "Swimming"?', 'Bơi lội', 'Chạy bộ', 'Bơi lội', 'Bóng chuyền', 12),
('What is the meaning of "Tennis"?', 'Quần vợt', 'Cầu lông', 'Đấm bốc', 'Quần vợt', 12),
('What is the meaning of "Cycling"?', 'Đạp xe', 'Đạp xe', 'Yoga', 'Bóng chuyền', 12),
('What is the meaning of "Badminton"?', 'Cầu lông', 'Bóng rổ', 'Cầu lông', 'Chạy bộ', 12);

-- Insert sample tests for Emotions
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Happy"?', 'Vui vẻ', 'Vui vẻ', 'Buồn', 'Tức giận', 13),
('What is the meaning of "Sad"?', 'Buồn', 'Hào hứng', 'Buồn', 'Mệt mỏi', 13),
('What is the meaning of "Excited"?', 'Hào hứng', 'Sợ hãi', 'Hào hứng', 'Chán', 13),
('What is the meaning of "Tired"?', 'Mệt mỏi', 'Ngạc nhiên', 'Lo lắng', 'Mệt mỏi', 13),
('What is the meaning of "Calm"?', 'Bình tĩnh', 'Bình tĩnh', 'Tức giận', 'Sợ hãi', 13);


-- Insert new topics
INSERT INTO topic (name_topic, description) VALUES
('School Supplies', 'Vocabulary related to items used in school'),
('Body Parts', 'Words for parts of the human body');

-- Insert sample vocabulary for School Supplies
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Pen', 'Bút bi', '/pen/', 14),
('Pencil', 'Bút chì', '/ˈpensl/', 14),
('Book', 'Sách', '/bʊk/', 14),
('Notebook', 'Vở', '/ˈnəʊtbʊk/', 14),
('Ruler', 'Thước kẻ', '/ˈruːlər/', 14),
('Eraser', 'Cục tẩy', '/ɪˈreɪsər/', 14),
('Backpack', 'Ba lô', '/ˈbækpæk/', 14),
('Scissors', 'Kéo', '/ˈsɪzərz/', 14),
('Glue', 'Keo dán', '/ɡluː/', 14),
('Marker', 'Bút lông', '/ˈmɑːrkər/', 14);

-- Insert sample vocabulary for Body Parts
INSERT INTO vocabulary (word, meaning, phonetic, topic_id) VALUES
('Head', 'Đầu', '/hed/', 15),
('Hand', 'Tay', '/hænd/', 15),
('Leg', 'Chân', '/leɡ/', 15),
('Eye', 'Mắt', '/aɪ/', 15),
('Ear', 'Tai', '/ɪər/', 15),
('Nose', 'Mũi', '/nəʊz/', 15),
('Mouth', 'Miệng', '/maʊθ/', 15),
('Arm', 'Cánh tay', '/ɑːrm/', 15),
('Foot', 'Bàn chân', '/fʊt/', 15),
('Hair', 'Tóc', '/heər/', 15);

-- Insert sample tests for School Supplies
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Pen"?', 'Bút bi', 'Bút bi', 'Bút chì', 'Sách', 14),
('What is the meaning of "Notebook"?', 'Vở', 'Ba lô', 'Vở', 'Thước kẻ', 14),
('What is the meaning of "Eraser"?', 'Cục tẩy', 'Cục tẩy', 'Kéo', 'Keo dán', 14),
('What is the meaning of "Backpack"?', 'Ba lô', 'Sách', 'Bút lông', 'Ba lô', 14),
('What is the meaning of "Ruler"?', 'Thước kẻ', 'Thước kẻ', 'Vở', 'Bút chì', 14);

-- Insert sample tests for Body Parts
INSERT INTO test (question, correct_answer, option1, option2, option3, topic_id) VALUES
('What is the meaning of "Head"?', 'Đầu', 'Đầu', 'Tay', 'Chân', 15),
('What is the meaning of "Eye"?', 'Mắt', 'Tai', 'Mắt', 'Mũi', 15),
('What is the meaning of "Hand"?', 'Tay', 'Cánh tay', 'Bàn chân', 'Tay', 15),
('What is the meaning of "Mouth"?', 'Miệng', 'Miệng', 'Tóc', 'Mũi', 15),
('What is the meaning of "Foot"?', 'Bàn chân', 'Chân', 'Bàn chân', 'Cánh tay', 15);



