from db import create_sql_connection

def get_user_details(userId: int):
    conn = create_sql_connection()
    cursor_obj = conn.cursor(dictionary=True)

    
    try:
        cursor_obj.execute('Select FirstName, LastName, Email FROM Users where ID = %s', (userId, ))

        user = cursor_obj.fetchone()
        if user is None:
            return "User not found"

        conn.commit()
        return (f"{user['FirstName']} {user['LastName']}", user['Email'])
    except Exception as e:
        return f"Internal Server Error on: {e}"
    finally:
        cursor_obj.close()
        conn.close()