import pytest
from backend.api.api import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def register_user(client, username, email, password):
    return client.post('/register', json={
        "username": username,
        "email": email,
        "password": password
    })

def login_user(client, username, password):
    return client.post('/login', json={
        "username": username,
        "password": password
    })

def get_auth_header(token):
    return {"Authorization": f"Bearer {token}"}

def test_full_api_flow(client):
    # Đăng ký tài khoản mới
    username = "apitestuser"
    email = "apitestuser@example.com"
    password = "testpassword"
    resp = register_user(client, username, email, password)
    assert resp.status_code in (200, 201, 400)

    # Đăng nhập
    resp = login_user(client, username, password)
    assert resp.status_code == 200
    data = resp.get_json()
    assert "token" in data
    token = data["token"]

    # Lấy danh sách chủ đề
    resp = client.get('/topics', headers=get_auth_header(token))
    assert resp.status_code == 200
    topics = resp.get_json().get("topics")
    assert isinstance(topics, list)
    if not topics:
        # Nếu chưa có chủ đề nào thì bỏ qua các test tiếp theo
        return

    topic_id = topics[0]["id"]

    # Lấy thông tin 1 chủ đề
    resp = client.get(f'/topic/{topic_id}', headers=get_auth_header(token))
    assert resp.status_code == 200
    assert "topic" in resp.get_json()

    # Lấy từ vựng của chủ đề
    resp = client.get(f'/vocabulary/{topic_id}', headers=get_auth_header(token))
    assert resp.status_code == 200
    assert "vocabularies" in resp.get_json()

    # Lấy câu hỏi kiểm tra của chủ đề
    resp = client.get(f'/tests/{topic_id}', headers=get_auth_header(token))
    assert resp.status_code == 200
    assert "questions" in resp.get_json()

    # Gửi kết quả bài test
    resp = client.post('/test_result', json={
        "topic_id": topic_id,
        "score": 90
    }, headers=get_auth_header(token))
    assert resp.status_code in (200, 201)
    assert "score" in resp.get_json()

    # Kiểm tra pass/fail chủ đề
    resp = client.get(f'/check_pass/{topic_id}', headers=get_auth_header(token))
    assert resp.status_code == 200
    assert "is_passed" in resp.get_json()

    # Kiểm tra pass/fail nhiều chủ đề
    resp = client.get(f'/check_pass_multi?topic_ids={topic_id}', headers=get_auth_header(token))
    assert resp.status_code == 200
    assert "results" in resp.get_json()

    # Đăng xuất
    resp = client.post('/logout', headers=get_auth_header(token))
    assert resp.status_code == 200
    assert "message" in resp.get_json()

def test_register_missing_fields(client):
    # Thiếu trường email
    resp = client.post('/register', json={
        "username": "user2",
        "password": "pass"
    })
    assert resp.status_code == 400
    data = resp.get_json()
    assert "message" in data

def test_login_wrong_password(client):
    # Đăng nhập sai mật khẩu
    resp = login_user(client, "apitestuser", "wrongpassword")
    assert resp.status_code in (400, 401)
    data = resp.get_json()
    assert "message" in data 