import mysql.connector
from mysql.connector import Error
from mysql.connector import pooling
import os
import logging
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseConnection:
    _instance = None
    _pool = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            cls._instance.initialize_pool()
        return cls._instance

    def initialize_pool(self):
        """Initialize the database connection pool with configuration from environment variables"""
        try:
            dbconfig = {
                "host": os.getenv('DB_HOST', 'localhost'),
                "user": os.getenv('DB_USER', 'root'),
                "password": os.getenv('DB_PASSWORD', 'NewPassword123!'),
                "port": int(os.getenv('DB_PORT', '3306')),
                "database": os.getenv('DB_NAME', 'english_learning_app'),
                "pool_name": "mypool",
                "pool_size": int(os.getenv('DB_POOL_SIZE', '5')),
                "connect_timeout": int(os.getenv('DB_CONNECT_TIMEOUT', '10')),
                "use_pure": True
            }
            logger.info("Initializing database connection pool...")
            self._pool = mysql.connector.pooling.MySQLConnectionPool(**dbconfig)
            logger.info("Database connection pool initialized successfully")
        except Error as e:
            logger.error(f"Error creating connection pool: {e}")
            raise

    def get_connection(self) -> Optional[mysql.connector.MySQLConnection]:
        """Always get a new connection from the pool"""
        try:
            return self._pool.get_connection()
        except Error as e:
            logger.error(f"Error getting connection from pool: {e}")
            raise

    def __del__(self):
        pass 