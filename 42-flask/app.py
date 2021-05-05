from flask import Flask, redirect, url_for, request, jsonify, session
from flask_session import Session
import os
from authlib.integrations.flask_client import OAuth
from markupsafe import escape

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.debug = True
app.config.from_object('config')
Session(app)

oauth = OAuth(app)
oauth.register(
    name='api42',
    client_id=os.environ.get("API42_CLIENT_ID"),
    client_secret=os.environ.get("API42_CLIENT_SECRET"),
    access_token_url='https://api.intra.42.fr/oauth/token',
    access_token_params=None,
    authorize_url='https://api.intra.42.fr/oauth/authorize',
    authorize_params=None,
    api_base_url='https://api.intra.42.fr/v2/'
)

@app.route('/')
def index():
    if 'username' in session:
        return jsonify(session['username'])
    return 'You are not logged in'


@app.route('/login')
def login():
    api42 = oauth.create_client('api42')
    redirect_uri = 'https://localhost:3001/auth/callback'
    return api42.authorize_redirect(redirect_uri)


@app.route('/logout')
def logout():
    session.pop('api42_token', None)
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/auth/callback')
def authorize():
    token = oauth.api42.authorize_access_token()
    resp = oauth.api42.get('me')
    user = resp.json()
    session['api42_token'] = token
    session['username'] = user
    return redirect('/')
    

if __name__ == '__main__':
    app.run(host='localhost', port=3001, ssl_context='adhoc')
