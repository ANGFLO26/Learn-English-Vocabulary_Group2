# Learn English Vocabulary - Ứng dụng học từ vựng tiếng Anh

## Giới thiệu 

Đây là đồ án môn học Thiết kế phần mềm, một ứng dụng web giúp người dùng học và kiểm tra từ vựng tiếng Anh theo các chủ đề khác nhau.

## Thành viên nhóm

- Phan Minh Thuy (2202079)
- Phan Văn Tài (2202081)
- Hà Minh Chiến (2202095)

## Mô tả dự án

Ứng dụng "Learn English Vocabulary" là một nền tảng học tập trực tuyến cho phép người dùng:
- Đăng ký và đăng nhập tài khoản cá nhân
- Học từ vựng tiếng Anh theo từng chủ đề
- Làm bài kiểm tra để đánh giá kiến thức
- Theo dõi tiến độ học tập

## Kiến trúc hệ thống

Dự án được phát triển theo mô hình Client-Server với hai phần chính:

### Frontend
- Framework: ReactJS with TypeScript
- UI Library: shadcn-ui
- Styling: Tailwind CSS
- Build Tool: Vite

### Backend
- Framework: Python Flask
- Database: MySQL
- Authentication: JWT Tokens
- Password Hashing: bcrypt

## Cấu trúc dự án

```
/
├── backend/
│   ├── api/            # API endpoints
│   │   └── api.py      
│   ├── dao/            # Data Access Objects
│   │   ├── connection.py    
│   │   ├── daomanager.py    
│   │   ├── user/            
│   │   ├── topic/           
│   │   ├── vocabulary/      
│   │   ├── test/            
│   │   └── test_result/     
│   └── requirements.txt     
│
└── frontend/
    ├── public/         # Static files
    │   └── imagetopics/  # Topic images
    └── src/
        ├── api/        # API integration
        ├── components/ # UI components
        ├── context/    # React context
        ├── hooks/      # Custom hooks
        ├── pages/      # Application pages
        └── main.tsx    # Entry point
```

## Tính năng chính

### Quản lý người dùng
- Đăng ký tài khoản mới
- Đăng nhập/Đăng xuất
- Bảo mật thông tin cá nhân

### Học từ vựng
- Xem danh sách chủ đề
- Học từ vựng theo chủ đề
- Tìm kiếm từ vựng

### Kiểm tra kiến thức
- Làm bài kiểm tra theo chủ đề
- Tự động chấm điểm
- Xem kết quả ngay lập tức

### Theo dõi tiến độ
- Xem chủ đề đã hoàn thành
- Theo dõi điểm số kiểm tra

## Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
- Python 3.8+
- Node.js 16+
- MySQL

### Backend

1. Clone repository:
```bash
git clone https://github.com/ANGFLO26/Learn-English-Vocabulary_Group2.git
cd Learn-English-Vocabulary_Group2
```

2. Cài đặt môi trường ảo Python:
```bash
python -m venv venv
source venv/bin/activate  # Trên Windows: venv\Scripts\activate
```

3. Cài đặt các thư viện cần thiết:
```bash
pip install -r requirements.txt
```

4. Thiết lập biến môi trường:
Tạo file `.env` trong thư mục gốc với nội dung:
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRY_DAYS=1
```

5. Chạy backend:
```bash
python -m backend.api.api
```

### Frontend

1. Di chuyển vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt các thư viện:
```bash
npm install
```

3. Chạy ứng dụng frontend:
```bash
npm run dev
```

4. Mở trình duyệt và truy cập: `http://localhost:8080/`

## Giao diện người dùng

- **Trang đăng nhập/đăng ký**: Cho phép người dùng đăng nhập vào hệ thống hoặc tạo tài khoản mới
- **Trang chủ đề**: Hiển thị danh sách các chủ đề từ vựng có hình ảnh minh họa
- **Trang học từ vựng**: Hiển thị danh sách từ vựng của chủ đề đã chọn
- **Trang kiểm tra**: Cho phép làm bài kiểm tra để đánh giá kiến thức

## API Endpoints

### Authentication
- `POST /register` - Đăng ký người dùng mới
- `POST /login` - Đăng nhập
- `POST /logout` - Đăng xuất

### Chủ đề và từ vựng
- `GET /topics` - Lấy danh sách chủ đề
- `GET /vocabulary/<topic_id>` - Lấy từ vựng theo chủ đề
- `GET /tests/<topic_id>` - Lấy bài kiểm tra theo chủ đề

### Kết quả kiểm tra
- `POST /test_result` - Gửi kết quả bài kiểm tra
- `GET /check_pass/<topic_id>` - Kiểm tra kết quả chủ đề

## Đóng góp

Nếu bạn muốn đóng góp vào dự án, hãy làm theo các bước sau:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'Add some amazing feature'`)
4. Push lên branch của bạn (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT - xem file LICENSE để biết thêm chi tiết.