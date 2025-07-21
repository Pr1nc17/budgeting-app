from datetime import date

class SignUpModel:
    def __init__(self, email: str, password: str, first_name: str, last_name: str, DoB: date):
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.DoB = DoB

    def to_dict(self):
        return {
            "email": self.email,
            "password": self.password,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "DoB": self.DoB.isoformat() if isinstance(self.DoB, date) else self.DoB
        }

    @classmethod
    def from_dict(cls, data: dict):
        from datetime import date

        dob = data.get("DoB")
        if isinstance(dob, str):
            dob = date.fromisoformat(dob)  # assumes ISO string

        return cls(
            email=data["email"],
            password=data["password"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            DoB=dob
        )
