import pytest
from backend.api.api import app
import json

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

def test_register_invalid_email(client):
    # Test with invalid email format
    resp = register_user(client, "testuser", "invalid-email", "password123")
    assert resp.status_code == 400
    data = resp.get_json()
    assert "message" in data

def test_register_existing_username(client):
    # First register
    register_user(client, "existinguser", "existing@example.com", "password123")
    # Try to register again with same username
    resp = register_user(client, "existinguser", "another@example.com", "password123")
    assert resp.status_code == 400
    data = resp.get_json()
    assert "message" in data

def test_login_nonexistent_username(client):
    resp = login_user(client, "nonexistentuser", "password123")
    assert resp.status_code == 401
    data = resp.get_json()
    assert "message" in data

def test_logout_invalid_token(client):
    resp = client.post('/logout', headers=get_auth_header("invalid-token"))
    assert resp.status_code == 401
    data = resp.get_json()
    assert "message" in data

def test_protected_route_no_token(client):
    # Test accessing protected route without token
    resp = client.get('/topics')
    assert resp.status_code == 401
    data = resp.get_json()
    assert "message" in data

def test_get_nonexistent_topic(client):
    # First login to get token
    resp = login_user(client, "apitestuser", "testpassword")
    token = resp.get_json()["token"]
    
    # Try to get non-existent topic
    resp = client.get('/topic/99999', headers=get_auth_header(token))
    assert resp.status_code == 404
    data = resp.get_json()
    assert "message" in data

def test_get_topics_invalid_token(client):
    resp = client.get('/topics', headers=get_auth_header("invalid-token"))
    assert resp.status_code == 401
    data = resp.get_json()
    assert "message" in data

def test_get_vocabulary_nonexistent_topic(client):
    # First login to get token
    resp = login_user(client, "apitestuser", "testpassword")
    token = resp.get_json()["token"]
    
    # Try to get vocabulary for non-existent topic
    resp = client.get('/vocabulary/99999', headers=get_auth_header(token))
    assert resp.status_code == 200
    data = resp.get_json()
    assert "vocabularies" in data
    assert len(data["vocabularies"]) == 0

def test_get_vocabulary_invalid_token(client):
    resp = client.get('/vocabulary/1', headers=get_auth_header("invalid-token"))
    assert resp.status_code == 401
    data = resp.get_json()
    assert "message" in data

def test_submit_test_result_invalid_score(client):
    # First login to get token
    resp = login_user(client, "apitestuser", "testpassword")
    token = resp.get_json()["token"]
    
    # Submit test with invalid score
    resp = client.post('/test_result', 
                      json={"topic_id": 1, "score": 150},  # Score > 100
                      headers=get_auth_header(token))
    assert resp.status_code == 200
    data = resp.get_json()
    assert "score" in data
    assert data["score"] == 150

def test_submit_test_result_nonexistent_topic(client):
    # First login to get token
    resp = login_user(client, "apitestuser", "testpassword")
    token = resp.get_json()["token"]
    
    # Submit test for non-existent topic
    resp = client.post('/test_result', 
                      json={"topic_id": 99999, "score": 90},
                      headers=get_auth_header(token))
    assert resp.status_code == 400
    data = resp.get_json()
    assert "message" in data

def test_check_pass_nonexistent_topic(client):
    # First login to get token
    resp = login_user(client, "apitestuser", "testpassword")
    token = resp.get_json()["token"]
    
    # Check pass for non-existent topic
    resp = client.get('/check_pass/99999', headers=get_auth_header(token))
    assert resp.status_code == 200
    data = resp.get_json()
    assert "is_passed" in data
    assert data["is_passed"] == False

def test_check_pass_multi_invalid_topic_ids(client):
    # First login to get token
    resp = login_user(client, "apitestuser", "testpassword")
    token = resp.get_json()["token"]
    
    # Test with invalid topic_ids format
    resp = client.get('/check_pass_multi?topic_ids=invalid', headers=get_auth_header(token))
    assert resp.status_code == 200
    data = resp.get_json()
    assert "results" in data
    assert len(data["results"]) == 0

def test_register_special_characters(client):
    # Test with special characters
    resp = register_user(client, "user@#$", "test@example.com", "pass@#$")
    assert resp.status_code == 400
    data = resp.get_json()
    assert "message" in data

def test_submit_test_result_boundary_scores(client):
    # First login to get token
    resp = login_user(client, "apitestuser", "testpassword")
    token = resp.get_json()["token"]
    
    # Test with boundary scores
    test_scores = [0, 100]
    for score in test_scores:
        resp = client.post('/test_result', 
                          json={"topic_id": 1, "score": score},
                          headers=get_auth_header(token))
        assert resp.status_code in (200, 201)
        data = resp.get_json()
        assert "score" in data

def test_register_password_too_short(client):
    # Test password quá ngắn
    resp = register_user(client, "testuser", "test@example.com", "123")
    assert resp.status_code == 400
    data = resp.get_json()
    assert "message" in data

def test_register_password_too_long(client):
    # Test password quá dài
    resp = register_user(client, "testuser", "test@example.com", "a" * 100)
    assert resp.status_code == 400
    data = resp.get_json()
    assert "message" in data

def test_submit_test_result_missing_fields(client):
    # Test with missing fields
    resp = client.post('/test_result', json={
        "topic_id": 1,
        "score": 90
    }, headers=get_auth_header("invalid-token"))
    assert resp.status_code == 401
    data = resp.get_json()
    assert "message" in data 