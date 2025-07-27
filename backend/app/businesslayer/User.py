from app.businesslayer.Auth import check_token
import app.datalayer.User as dataLayer

def get_user_details(userId: int, token: str):
    if not token:
        return "Authorization token is required", 401


    if check_token(token) != 200:
        return {"message": "Unauthorized"}, 401

    if userId is None:
        return "User ID is required", 400

    user_details = dataLayer.get_user_details(userId)

    if isinstance(user_details, str):
        return user_details, 400

    name, email = user_details
    response = {
        "name": name,
        "nmail": email
    }
    return response, 200