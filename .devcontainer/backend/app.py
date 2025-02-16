from flask import Flask, request, jsonify
from firebase_config import auth
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
import datetime

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "12345678"
jwt = JWTManager(app)

@app.route('/')
def home():
    return "Hello"

@app.route("/registrer", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"Feil": "Email og passord er påkrevd"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    try: 
        user = auth.get_user_by_email(email)
        token = create_access_token(identity=user.uid, expires_delta=datetime.timedelta(hours=1))
        return jsonify({"token":token}), 200
    except Exception as e:
        return jsonify({"Feil": "Ikke riktig informasjon"}), 401

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected ():
    return jsonify({"Melding": "Du har tilgang"}), 200
                    
if __name__=='main':
    app.run(debug=True, host="0.0.0.0")
