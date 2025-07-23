from flask import Blueprint, request
from db.User import get_user_details

def init_user_routes():
    user_route = Blueprint("User Route", __name__)

    @user_route.route("/basic-details", methods=['GET'])
    def basic_details():
        userid = request.args.get('userId', type=int)
        if userid is None:
            return "User ID is required", 400

        user_details = get_user_details(userid)

        if isinstance(user_details, str):
            return user_details, 400

        name, email = user_details
        response = {
            "name": name,
            "nmail": email
        }
        return response, 200


    return user_route