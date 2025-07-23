from flask import Blueprint, request, make_response
from datetime import date
from Models.SignUpModel import SignUpModel
from db.Auth import sign_user_in, add_new_user
import base64

def init_auth_routes():
    auth_route = Blueprint("AuthRoute", __name__)

    @auth_route.route("/login", methods=['GET'])
    def login():
        login_details = request.headers.get("auth")
        
        if not login_details:
            print("Missing auth header")
            return { "Message": "Login Failed"}, 400

        try:
            b64_email, b64_password = login_details.split(":")
            email = base64.b64decode(b64_email).decode('utf-8')
            password = base64.b64decode(b64_password).decode('utf-8')

            signInCheck = sign_user_in(email, password)
            
            if isinstance(signInCheck, int):
                return {"Message": "Login Success", "userId": signInCheck}, 200
            else:
                return { "Message": "Login Failed"}, 400

        except Exception as e:
            print("Invalid Login Auth Header:", e)
            return { "Message": "Login Failed"}, 400

    @auth_route.route("/register", methods=['POST'])
    def register():
        data = request.get_json()

        if not data or not all(key in data for key in ("first_name", "last_name", "email", "password", "DoB")):
            return "Invalid input", 400

        if isinstance(data["DoB"], str):
            try:
                data["DoB"] = date.fromisoformat(data["DoB"])
            except ValueError:
                return "Invalid DoB format. Expected YYYY-MM-DD.", 400

        signUpModel = SignUpModel(**data)
        add_user_result = add_new_user(signUpModel)

        if isinstance(add_user_result, int):
            return { "Message": "User created successfully", "userId": add_user_result }, 201
        else:
            return add_user_result, 400

    return auth_route
