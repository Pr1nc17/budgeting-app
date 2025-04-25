from flask import Flask
from os import getenv

# Blueprint Imports
from .routes import AppRoutes
from .routes import AuthRoutes

def get_url_prefix(routeHandler: str):
    return f'/api/{routeHandler}'

def init_app():
    CURRENT_ENV = getenv("ENVIRONMENT")
    IS_DEV = CURRENT_ENV == "DEV"

    app = Flask(__name__, static_url_path='/', static_folder='static')

    if IS_DEV:
        from flask_cors import CORS
        CORS(app)

    app.register_blueprint(AppRoutes.init_app_routes())
    app.register_blueprint(AuthRoutes.init_auth_routes(), url_prefix=get_url_prefix('auth'))


    return app