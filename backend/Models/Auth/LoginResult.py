class LoginResult:
    def __init__(self, statusCode: int, message: str, userId: int = -1, token: str = ""):
        self.userId = userId
        self.statusCode = statusCode
        self.message = message
        self.token = token

    def response(self):

        if (self.statusCode == 200):
            return {
                "userId": self.userId,
                "message": self.message,
                "token": self.token
            }, self.statusCode

        return {
            "message": self.message
        }, self.statusCode
