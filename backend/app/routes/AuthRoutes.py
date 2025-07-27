from os import getenv
from flask import Blueprint, request
from Models.Auth.RegisterRequest import RegisterRequest
import app.businesslayer.Auth as businessLayer

def init_auth_routes():
    auth_route = Blueprint("AuthRoute", __name__)

    @auth_route.route("/login", methods=['GET'])
    def login():
        login_details = request.headers.get("auth")
        result = businessLayer.login(login_details)

        return result.response()

    @auth_route.route("/register", methods=['POST'])
    def register():
        data = request.get_json()
        try:
            reg_req = RegisterRequest(**data)
            reg_response = businessLayer.register_user(reg_req)
            return reg_response.response()
        except Exception as e:
            return { "Message": "Register Failed" }, 400 

    @auth_route.route('/check-token', methods=['GET'])
    def check_token():
        auth_header = request.headers.get('Authorization')
        return businessLayer.check_token(auth_header)

    return auth_route
