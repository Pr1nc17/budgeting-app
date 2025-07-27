import bcrypt
from Models.Auth.RegisterRequest import RegisterRequest

from app.datalayer import create_sql_connection
import bcrypt

def sign_user_in(email: str, password: str) -> str | None:
    conn = create_sql_connection()
    cursor_obj = conn.cursor(dictionary=True)

    try:
        cursor_obj.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor_obj.fetchone()

        if user is None:
            return "Invalid email or password"

        stored_hashed = user["Password"]

        if not bcrypt.checkpw(password.encode('utf-8'), stored_hashed.encode('utf-8')):
            return "Invalid email or password"

        return user["ID"]
    except Exception as e:
        return f"Error signing in user: {e}"
    finally:
        cursor_obj.close()
        conn.close()

def fetch_full_user_details_for_token(userId: int): 
    conn = create_sql_connection()
    cursor_object = conn.cursor(dictionary=True)

    try:
        cursor_object.execute("select * from users where ID = %s", (userId,))
        user = cursor_object.fetchone()
        if user is None:
            return "User not found"
     
        return user

    except Exception as e:
        return f"Error fetching user details: {e}"

    finally:
        cursor_object.close()
        conn.close()


def add_new_user(reg_request: RegisterRequest) -> str | None:
    conn = create_sql_connection()
    cursor_obj = conn.cursor()

    hashed_pass = bcrypt.hashpw(reg_request.password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor_obj.execute('SELECT * FROM users WHERE email = %s', (reg_request.email,))
        if cursor_obj.fetchone() is not None:
            return "User already exists with this email"

        cursor_obj.execute(
            "INSERT INTO users (FirstName, LastName, email, password, DoB) VALUES (%s, %s, %s, %s, %s)",
            (
                reg_request.first_name,
                reg_request.last_name,
                reg_request.email,
                hashed_pass.decode('utf-8'),
                reg_request.DoB.isoformat() if hasattr(reg_request.DoB, 'isoformat') else reg_request.DoB
            )
        )
        conn.commit()
    
        user_id = cursor_obj.lastrowid
        return user_id

    except Exception as e:
        return f"Error adding new user: {e}"

    finally:
        cursor_obj.close()
        conn.close()