from flask import Blueprint, request
from app.businesslayer.Auth import check_token
import app.businesslayer.User as businessLayer



def init_user_routes():
    user_route = Blueprint("User Route", __name__)

    @user_route.route("/basic-details", methods=['GET'])
    def basic_details():
        token = request.headers.get("Authorization")
        userid = request.args.get('userId', type=int)

        return businessLayer.get_user_details(userid, token);


    return user_route