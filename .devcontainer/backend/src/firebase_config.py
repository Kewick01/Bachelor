import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("bachelor-app-15a59-firebase-adminsdk-fbsvc-24e3854c8d.json")
firebase_admin.initialize_app(cred)