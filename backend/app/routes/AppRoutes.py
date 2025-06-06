from flask import Blueprint, send_file, current_app
from os import path

def init_app_routes():
    app_route = Blueprint("AppRoute", __name__)
    @app_route.route("/", methods=['GET'])
    def load_app():
        file_path = path.join(current_app.root_path,"../" ,"static", "test.html")
        return send_file(file_path)
    
    return app_route
