from flask import Flask

# Blueprint Imports
from .routes import AppRoutes
from .routes import AuthRoutes
from .routes import UserRoutes

def get_url_prefix(routeHandler: str):
    return f'/api/{routeHandler}'

def init_app(dev_env: bool):

    app = Flask(__name__, static_url_path='/', static_folder='static')

    if dev_env:
        from flask_cors import CORS
        CORS(app)

    app.register_blueprint(AppRoutes.init_app_routes())
    app.register_blueprint(AuthRoutes.init_auth_routes(), url_prefix=get_url_prefix('auth'))
    app.register_blueprint(UserRoutes.init_user_routes(), url_prefix=get_url_prefix('user'))

    return app