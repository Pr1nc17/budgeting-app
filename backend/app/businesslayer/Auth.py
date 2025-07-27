from os import getenv
from flask import Blueprint, request, make_response
from datetime import date, datetime, timedelta
from Models.Auth.LoginResult import LoginResult
from Models.Auth.RegisterRequest import RegisterRequest
from Models.Auth.RegisterResponse import RegisterResponse
import app.datalayer.Auth as dataLayer
import jwt
import base64

def login(login_details: str) -> LoginResult:
    if not login_details:
        print("Missing auth header")
        return LoginResult(400, "Login Failed")

    try:
        b64_email, b64_password = login_details.split(":")
        email = base64.b64decode(b64_email).decode('utf-8')
        password = base64.b64decode(b64_password).decode('utf-8')

        signInCheck = dataLayer.sign_user_in(email, password)
            
        if isinstance(signInCheck, int) is False:
            return { "Message": "Login Failed"}, 400
            
        user = dataLayer.fetch_full_user_details_for_token(signInCheck)
        payload = {
            "id": user["ID"],
            "first_name": user["FirstName"],
            "last_name": user["LastName"],
            "email": user["Email"],
            "dob": user["DoB"].isoformat() if hasattr(user["DoB"], 'isoformat') else user["DoB"],
            "exp": datetime.now() + timedelta(hours=2)  # expires in 2 hours
        }

        secret_key = getenv('JWT_SECRET_KEY')
        token = jwt.encode(payload, secret_key, algorithm="HS256")

        return LoginResult(200, "Login Success", signInCheck, token)

    except Exception as e:
        print("Invalid Login Auth Header:", e)
        return LoginResult(400, "Login Failed")


def register_user(reg_req: RegisterRequest) -> RegisterResponse:
    addResult = dataLayer.add_new_user(reg_req)
    if isinstance(addResult, int):
        return RegisterResponse("User Added Successfully", 201, addResult)

    return RegisterResponse("Internal Server Error", 500)


def check_token(token: str) -> int:
        secret_key = getenv('JWT_SECRET_KEY')
        try:
            # Expecting format: Bearer <token>
            token = token.split(" ")[1]
            _ = jwt.decode(token, secret_key, algorithms=["HS256"])
            return 200
    
        except IndexError:
            return 400

        except jwt.ExpiredSignatureError:
            return 401

        except jwt.InvalidTokenError:
            return 401
