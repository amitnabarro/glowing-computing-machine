# Drone News Feed

## An implementation example over FARM stack

### Overview

This monorepo contains backend and frontend projects for implementing a news aggregation app

#### Technology Stack

The Backend is implemented with Python 3.9 utilizing:

1. FastAPI for async web framework
2. MongoDB for persistent storage

The Frontend is implemented with Typescript utilizing:

1. React
2. Tailwindcss for components and styling
3. Context API for state management
4. Vite for bundling

#### Running the backend

1. CD into the `backend` folder

2. Using Python 3, create a virtual environment

```
$ python3 -m venv .venv
```

3. Source the virtual environment

```
source .venv/bin/activate
```

4. install requirements

```
pip install -r requirements.txt
```

5. Run the app - this will run the api server over port 8000 by default

```
python app/main.py
```

#### Running the frontend

1. CD into the `frontend` folder

2. install dependencies

```
yarn
```

3. launch development environment

```
yarn dev
```

#### Running the MongoDB server

1. CD into the `compose` folder
2. run docker compose script in detached mode

```
docker-compose up -d
```
