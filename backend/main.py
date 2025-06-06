from dotenv import load_dotenv
from sys import argv
from app import init_app

def main():
    print("Starting Application")
    PORT = 4000
    print("Declaring Port [4000]")

    print("Loading ENV")
    load_dotenv()
    
    print("Creating App for execution")
    app = init_app();
    
    ARGV_LENGTH = len(argv)

    print(f"CLI Arguments: {argv} - Argument Count: {ARGV_LENGTH}")

    if ARGV_LENGTH == 2:
        if argv[1].casefold() == "-debug":
            print("Running App in debug mode")
            app.run(port=PORT, debug=True)
            return
        
        elif argv[1].casefold() == "-nodebug":
            print("Running App in production mode")
            app.run(port=PORT, debug=False)
            return
        
        else:
            print(f"Argument {argv[1]} is not a valid argument")
        
    elif ARGV_LENGTH == 1:
        print("Running App in production mode")
        app.run(port=PORT, debug=False)

    else:
        invalid_args_str = "The following args are invalid: ";
        for arg in argv:
            invalid_args_str += f'{arg} '
        print(invalid_args_str, '\n', invalid_args_str)

    print("App execution finished")

if __name__ == "__main__":
    main()