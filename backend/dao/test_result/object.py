from datetime import datetime

class TestResult:
    def __init__(self, id=None, user_id=None, topic_id=None, score=None, 
                 is_passed=None, submitted_at=None):
        self.id = id
        self.user_id = user_id
        self.topic_id = topic_id
        self.score = score
        self.is_passed = is_passed
        self.submitted_at = submitted_at or datetime.now()

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'topic_id': self.topic_id,
            'score': self.score,
            'is_passed': self.is_passed,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }

    @classmethod
    def from_dict(cls, data):
        submitted_at = data.get('submitted_at')
        if isinstance(submitted_at, str):
            submitted_at = datetime.fromisoformat(submitted_at)
        return cls(
            id=data.get('id'),
            user_id=data.get('user_id'),
            topic_id=data.get('topic_id'),
            score=data.get('score'),
            is_passed=data.get('is_passed'),
            submitted_at=submitted_at
        ) 