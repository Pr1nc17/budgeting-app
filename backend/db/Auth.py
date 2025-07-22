import bcrypt
from Models.SignUpModel import SignUpModel
from db import create_sql_connection

import bcrypt
from db import create_sql_connection

def add_new_user(signUpDTO: SignUpModel) -> str | None:
    conn = create_sql_connection()
    cursor_obj = conn.cursor()

    hashed_pass = bcrypt.hashpw(signUpDTO.password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor_obj.execute('SELECT * FROM users WHERE email = %s', (signUpDTO.email,))
        if cursor_obj.fetchone() is not None:
            return "User already exists with this email"

        cursor_obj.execute(
            "INSERT INTO users (FirstName, LastName, email, password, DoB) VALUES (%s, %s, %s, %s, %s)",
            (
                signUpDTO.first_name,
                signUpDTO.last_name,
                signUpDTO.email,
                hashed_pass.decode('utf-8'),
                signUpDTO.DoB.isoformat() if hasattr(signUpDTO.DoB, 'isoformat') else signUpDTO.DoB
            )
        )
        conn.commit()
        return None
    except Exception as e:
        return f"Error adding new user: {e}"
    finally:
        cursor_obj.close()
        conn.close()


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

        return None
    except Exception as e:
        return f"Error signing in user: {e}"
    finally:
        cursor_obj.close()
        conn.close()
