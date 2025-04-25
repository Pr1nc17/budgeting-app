from flask import Blueprint, request, make_response
import base64

def init_auth_routes():
    app_route = Blueprint("AuthRoute", __name__)

    @app_route.route("/login", methods=['GET'])
    def login():
        login_details = request.headers.get("auth")
        
        if not login_details:
            print("Missing auth header")
            return "Login Failed", 400

        try:
            b64_username, b64_password = login_details.split(":")
            username = base64.b64decode(b64_username).decode('utf-8')
            password = base64.b64decode(b64_password).decode('utf-8')
        except Exception as e:
            print("Invalid Login Auth Header:", e)
            return "Login Failed", 400

        if username == "user" and password == "password":
            response = make_response("login ok", 200)
            response.headers['token'] = base64.b64decode('SldUT3JPdGhlclRva2Vu').decode('utf-8')  # "JWTOrOtherToken"
            return response
        else:
            return "Login Failed", 400

    return app_route
