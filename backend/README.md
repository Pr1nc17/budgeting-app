# Backend
Backend is now Python using a virtual environment

## Setup
To set up the environment open the terminal in the backend and use command `python -m venv .`

This command will Generate the following Folders:
* Include
* Lib
* Scripts

it will also add a `pyvenv.cfg` file

Install dependencies using `pip install -r ./requirements.txt`

## Activate the VENV
To activate the virtual environment input the following commands

`cd Scripts` - `activate.bat`

This will activate the venv

## Deactivate the VENV
To activate the virtual environment input the following commands

`cd Scripts` - `deactivate.bat`

This will activate the venv

## Running
Running the app is currently done running `py main.py` in the terminal


## Additional Dependencies
Please add all required dependencies in the `requirements.txt`


## NB!!!
Please remember any additional files added need to have their \_\_pycache\_\_ ignored in the `.gitignore` before commiting