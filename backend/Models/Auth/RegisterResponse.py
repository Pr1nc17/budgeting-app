class RegisterResponse:
    def __init__(self, message: str, statusCode: int, userId: int = None):
        self.message = message
        self.userId = userId
        self.statusCode = statusCode

    def response(self):
        if self.statusCode == 201:
            return {
                "message": self.message,
                "userId": self.userId
            }, self.statusCode

        return { "message": self.message }, self.statusCode