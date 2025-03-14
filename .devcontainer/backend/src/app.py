import os
from flask import Flask
from flask_login import LoginManager
import firebase_admin
from firebase_admin import credentials, fireatore, auth
from azure.storage.blob import BlobServiceClient

from index import index
from login import login
from logout import logout
from register import register
from home import home

app = Flask(__name__, static_folder='../forntend/static')
app.config['SECRET_KEY'] = os.getnev("SECRET_KEY", "default_secret_key")

firebase_cred_path =os.getenv("FIREBASE_CREDENTIALS", "path til serviceAccountKey.json")
cred = credentials.Certificate(firebase_cred_path)
firebase_admin.initialize_app(cred)
db = fireatore.client()

#Hvis vi vil koble til Azure Storage for filhåndtering
AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
if AZURE_STORAGE_CONNECTION_STRING:
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
    print("Azure Storage er tilkoblet!")

login_manager = LoginManager()
login_manager.init_app(app)

app.register_blueprint(index)
app.register_blueprint(login)
app.register_blueprint(logout) #Litt usikker på om vi trenger en egen logout, men tar den med her
app.register_blueprint(register)
app.register_blueprint(home)

class User:
    def __init__(self, uis, username, email):
        self.id = uid
        self.username = username
        self.email = email

@login_manager.user_loader
def load_user(user_id):
    """Henter bruker fra Firestore basert på UID"""
    user_ref = db.collection('users').document(user_id).get()
    if user_ref.exists:
        user_data = user_ref.to_dict()
        return User(user_data['uid'], user_data['username'], user_data['email'])
    return None

if __name__== '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 3000)))
    