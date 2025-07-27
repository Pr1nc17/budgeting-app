import mysql.connector 
from os import getenv
from mysql.connector.abstracts import MySQLConnectionAbstract
from mysql.connector.pooling import PooledMySQLConnection

def create_sql_connection() -> PooledMySQLConnection | MySQLConnectionAbstract:
    conn = mysql.connector.connect(
        host=getenv('host'), 
        port=int(getenv('port')), 
        user=getenv('user'), 
        password=getenv('password'),
        database=getenv('database')
    )
    return conn