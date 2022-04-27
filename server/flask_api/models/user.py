import re

from flask_api.config.mysqlconnection import connectToMySQL

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

class User:
    db_name = "social_media_site"
    
    def __init__( self, data ) -> None:
        self.id = data["id"]
        self.email = data["email"]
        self.username = data["username"]
        self.password = data["password"]
        self.display_name = data["display_name"]
        self.profile_img_url = data["profile_img_url"]
        
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        
        # Relationships
        self.posts = []
        self.comments = []
        self.likes = []
    
    # ---------- Model Validations
    def validate( user, REGISTER=False ):
        is_valid = True
        errors = dict()
        
        if not EMAIL_REGEX.match(user["email"]):
            errors["email"] = "Email format is invalid."
            is_valid = False
        if REGISTER: 
            if len(user["username"]) < 3:
                errors["username"] = "Username must be at least 3 characters."
                is_valid = False
        if len(user["password"]) < 3:
            errors["password"] = "Password must be at least 3 characters."
            is_valid = False
        if REGISTER: 
            if user["password"] != user["confirm_password"]:
                errors["confirm_password"] = "Passwords must match."
                is_valid = False
        if REGISTER: 
            if len(user["display_name"]) < 3:
                errors["username"] = "Display Name must be at least 3 characters."
                is_valid = False
        return ( is_valid, errors )
    
    # ---------- Database Entry Modifying Queries
    @classmethod
    def create( cls, data ):
        query = """INSERT INTO users (email, username, password, display_name, profile_img_url, created_at, updated_at) 
                VALUES(%(email)s, %(username)s, %(password)s, %(display_name)s, %(profile_img_url)s, NOW(), NOW());"""
        return connectToMySQL(cls.db_name).query_db( query, data )
    @classmethod
    def update( cls, data ):
        query = """UPDATE users SET email=%(email)s, username=%(username)s, password=%(password)s,
                    display_name=%(display_name)s, profile_img_url=%(profile_img_url)s, updated_at=NOW() 
                    WHERE id=%(id)s;"""
        user_id = connectToMySQL(cls.db_name).query_db( query, data )
        return user_id
    @classmethod
    def delete( cls, data ):
        query = "DELETE FROM users WHERE id = %(id)s"
        connectToMySQL(cls.db_name).query_db( query, data )
        return {"confirmation": "User successfully deleted"}
    
    # ---------- Get Method Queries
    @classmethod
    def get_all( cls, JSON=False ):
        query = "SELECT * FROM users;"
        results = connectToMySQL(cls.db_name).query_db( query )
        
        if JSON:
            return results;
        else:
            users = list()
            for result in results:
                users.append( cls(result) )
            return users
    @classmethod
    def get_by_id( cls, data, JSON=False ):
        query = "SELECT * FROM users WHERE id = %(id)s"
        result = connectToMySQL(cls.db_name).query_db( query, data )
        
        if JSON:
            return result[0]
        else:
            return cls( result[0] )
    @classmethod
    def get_by_email( cls, data, JSON=False ):
        query = "SELECT * FROM users WHERE email=%(email)s"
        result = connectToMySQL(cls.db_name).query_db( query, data )
        
        if len(result) < 1:
            return False
        
        if JSON:
            return result[0]
        else:
            return cls( result[0] )
    