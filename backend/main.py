from dotenv import load_dotenv
from app import init_app
from os import getenv

def main():
    print("Starting Application")
    PORT = 4000
    print("Declaring Port [4000]")

    print("Loading ENV")
    load_dotenv()
    
    print("Creating App for execution")

    dev_env = getenv('ENVIRONMENT') == "DEBUG"
    is_debug = getenv('DEBUG') == "True"

    app = init_app(dev_env);
    app.run(port=PORT, debug=is_debug)
    print("App execution finished")

if __name__ == "__main__":
    main()