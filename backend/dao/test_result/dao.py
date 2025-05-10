from .dao_interface import TestResultDAOInterface
from .object import TestResult

class TestResultDAO(TestResultDAOInterface):
    def __init__(self, connection):
        self.connection = connection

    def save_result(self, user_id: int, topic_id: int, score: float) -> TestResult:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            is_passed = 1 if score >= 80 else 0
            # Check if result already exists
            cursor.execute(
                "SELECT id FROM test_result WHERE user_id = %s AND topic_id = %s",
                (user_id, topic_id)
            )
            existing = cursor.fetchone()
            if existing:
                cursor.execute(
                    """
                    UPDATE test_result SET score = %s, is_passed = %s, submitted_at = CURRENT_TIMESTAMP
                    WHERE user_id = %s AND topic_id = %s
                    """,
                    (score, is_passed, user_id, topic_id)
                )
            else:
                cursor.execute(
                    """
                    INSERT INTO test_result (user_id, topic_id, score, is_passed, submitted_at)
                    VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
                    """,
                    (user_id, topic_id, score, is_passed)
                )
            conn.commit()
            cursor.execute(
                "SELECT * FROM test_result WHERE user_id = %s AND topic_id = %s",
                (user_id, topic_id)
            )
            result_data = cursor.fetchone()
            return TestResult.from_dict(result_data)
        finally:
            cursor.close()
            conn.close()

    def get_result_by_user_and_topic(self, user_id: int, topic_id: int) -> TestResult:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute(
                "SELECT * FROM test_result WHERE user_id = %s AND topic_id = %s",
                (user_id, topic_id)
            )
            result_data = cursor.fetchone()
            return TestResult.from_dict(result_data) if result_data else None
        finally:
            cursor.close()
            conn.close()

    def check_user_passed_topic(self, user_id: int, topic_id: int) -> bool:
        conn = self.connection.get_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute(
                "SELECT is_passed FROM test_result WHERE user_id = %s AND topic_id = %s",
                (user_id, topic_id)
            )
            result = cursor.fetchone()
            return bool(result and result['is_passed'])
        finally:
            cursor.close()
            conn.close() 